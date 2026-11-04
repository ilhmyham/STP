<?php

namespace Database\Seeders;

use App\Models\BerkasPendaftar;
use App\Models\BidangPeminatan;
use App\Models\JenjangPendidikan;
use App\Models\Pendaftar;
use App\Models\User;
use Database\Seeders\Support\SeedDocument;
use Illuminate\Database\Seeder;

class PendaftarSeeder extends Seeder
{
    /**
     * 10 pendaftar dengan status campuran. Akun pelamar mengikuti UserSeeder.
     *
     * @var array<int, array{email: string, nama: string, status: string}>
     */
    private const PROFILES = [
        ['email' => 'user1@test.com', 'nama' => 'Budi Santoso', 'status' => 'diterima'],
        ['email' => 'user2@test.com', 'nama' => 'Siti Aminah', 'status' => 'uncheck'],
        ['email' => 'user3@test.com', 'nama' => 'Rizky Pratama', 'status' => 'ditolak'],
        ['email' => 'pelamar4@test.com', 'nama' => 'Dewi Lestari', 'status' => 'diterima'],
        ['email' => 'pelamar5@test.com', 'nama' => 'Andi Saputra', 'status' => 'diterima'],
        ['email' => 'pelamar6@test.com', 'nama' => 'Rina Marlina', 'status' => 'diterima'],
        ['email' => 'pelamar7@test.com', 'nama' => 'Fajar Nugroho', 'status' => 'diterima'],
        ['email' => 'pelamar8@test.com', 'nama' => 'Intan Permata', 'status' => 'uncheck'],
        ['email' => 'pelamar9@test.com', 'nama' => 'Yusuf Hidayat', 'status' => 'uncheck'],
        ['email' => 'pelamar10@test.com', 'nama' => 'Maya Anggraini', 'status' => 'ditolak'],
    ];

    public function run(): void
    {
        $jenjang = JenjangPendidikan::pluck('id', 'pendidikan');
        $bidang = BidangPeminatan::pluck('id', 'nama_bidang');
        $jenjangKeys = array_values(MasterDataSeeder::JENJANG);
        $bidangKeys = array_values(MasterDataSeeder::BIDANG);

        foreach (self::PROFILES as $index => $profile) {
            /** @var User $user */
            $user = User::where('email', $profile['email'])->firstOrFail();

            $attributes = Pendaftar::factory()->raw([
                'user_id' => $user->id,
                'nama' => $profile['nama'],
                'email' => 'pendaftar'.($index + 1).'@test.com',
                'jenjang_pendidikan' => $jenjang[$jenjangKeys[$index % count($jenjangKeys)]],
                'bidang_peminatan' => $bidang[$bidangKeys[$index % count($bidangKeys)]],
                'status' => $profile['status'],
                'periodic_mulai' => now()
                    ->subMonths(2)
                    ->addDays($index * 7)
                    ->toDateString(),
            ]);

            $pendaftar = Pendaftar::updateOrCreate(
                ['user_id' => $user->id],
                $attributes
            );

            $folder = 'seed/berkas-pendaftar/'.$pendaftar->id_pendaftar.'/';

            $berkas = [
                'cv' => $folder.'cv.pdf',
                'surat_rekomendasi' => $folder.'surat-rekomendasi.pdf',
                'proposal' => $folder.'proposal.pdf',
                'dok_pendukung' => $folder.'dokumen-pendukung.pdf',
            ];

            BerkasPendaftar::updateOrCreate(
                ['id_pendaftar' => $pendaftar->id_pendaftar],
                $berkas
            );

            // Buat file fisik agar tautan "Lihat Dokumen" dapat dibuka.
            SeedDocument::pdf($berkas['cv'], 'CV '.$profile['nama']);
            SeedDocument::pdf($berkas['surat_rekomendasi'], 'Surat Rekomendasi '.$profile['nama']);
            SeedDocument::pdf($berkas['proposal'], 'Proposal '.$profile['nama']);
            SeedDocument::pdf($berkas['dok_pendukung'], 'Dokumen Pendukung '.$profile['nama']);
        }
    }
}

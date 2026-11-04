<?php

namespace Database\Seeders;

use App\Models\BerkasPeserta;
use App\Models\Pendaftar;
use App\Models\Peserta;
use App\Models\SertifikatMagang;
use App\Models\SuratBalasanMagang;
use App\Models\SuratPenilaian;
use Database\Seeders\Support\SeedDocument;
use Illuminate\Database\Seeder;

class PesertaSeeder extends Seeder
{
    private const MENTORS = [
        'Robert Wijaya',
        'Siti Rahmawati',
        'Andi Pratama',
        'Dewi Lestari',
        'Ahmad Fauzi',
    ];

    /**
     * Membuat peserta hanya dari pendaftar berstatus `diterima`.
     */
    public function run(): void
    {
        $accepted = Pendaftar::where('status', 'diterima')
            ->orderBy('id_pendaftar')
            ->get();

        foreach ($accepted as $index => $pendaftar) {
            $mulai = $pendaftar->periodic_mulai->copy();
            $selesai = $mulai->copy()->addMonths(6);
            $mentor = self::MENTORS[$index % count(self::MENTORS)];

            $attributes = Peserta::factory()->raw([
                'pendaftar_id' => $pendaftar->id_pendaftar,
                'tanggal' => $mulai->toDateString(),
                'tanggal_selesai' => $selesai->toDateString(),
                'mentor' => $mentor,
                'mentor_kedua' => self::MENTORS[($index + 1) % count(self::MENTORS)],
                'email' => 'mentor'.($index + 1).'@test.com',
                'email_kedua' => 'mentor'.($index + 1).'.kedua@test.com',
                'noHp' => '+62 812-0000-00'.($index + 1),
                'noHp_kedua' => '+62 812-0000-01'.($index + 1),
                'bidang_peminatan_id' => $pendaftar->bidang_peminatan,
                'status' => $index < 3 ? 'onGoing' : 'finished',
            ]);

            $peserta = Peserta::updateOrCreate(
                ['pendaftar_id' => $pendaftar->id_pendaftar],
                $attributes
            );

            $suffix = 'seed/peserta/'.$peserta->id.'/';

            $berkas = [
                'surat_balasan' => $suffix.'surat-balasan.pdf',
                'surat_penilaian' => $suffix.'surat-penilaian.pdf',
                'sertifikat_magang' => $suffix.'sertifikat-magang.pdf',
            ];

            BerkasPeserta::updateOrCreate(
                ['id_peserta' => $peserta->id],
                $berkas
            );

            SuratBalasanMagang::updateOrCreate(
                ['id_peserta' => $peserta->id],
                ['surat_balasan' => $berkas['surat_balasan']]
            );

            SuratPenilaian::updateOrCreate(
                ['id_peserta' => $peserta->id],
                ['surat_penilaian' => $berkas['surat_penilaian']]
            );

            SertifikatMagang::updateOrCreate(
                ['id_peserta' => $peserta->id],
                ['sertifikat_magang' => $berkas['sertifikat_magang']]
            );

            // Buat file fisik agar tautan "Lihat Dokumen" dapat dibuka.
            SeedDocument::pdf($berkas['surat_balasan'], 'Surat Balasan Magang');
            SeedDocument::pdf($berkas['surat_penilaian'], 'Surat Penilaian Magang');
            SeedDocument::pdf($berkas['sertifikat_magang'], 'Sertifikat Magang');
        }
    }
}

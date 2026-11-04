<?php

namespace Database\Seeders;

use App\Models\BidangPeminatan;
use App\Models\JenjangPendidikan;
use Illuminate\Database\Seeder;

class MasterDataSeeder extends Seeder
{
    public const JENJANG = ['D3', 'D4', 'S1', 'S2'];

    public const BIDANG = [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'UI/UX Design',
        'Digital Marketing',
        'Cyber Security',
    ];

    /**
     * Data master yang dibutuhkan sebelum pendaftar & peserta dibuat.
     */
    public function run(): void
    {
        foreach (self::JENJANG as $pendidikan) {
            JenjangPendidikan::updateOrCreate([
                'pendidikan' => $pendidikan,
            ]);
        }

        foreach (self::BIDANG as $namaBidang) {
            BidangPeminatan::updateOrCreate([
                'nama_bidang' => $namaBidang,
            ]);
        }
    }
}

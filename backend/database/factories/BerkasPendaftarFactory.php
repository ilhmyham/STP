<?php

namespace Database\Factories;

use App\Models\BerkasPendaftar;
use App\Models\Pendaftar;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BerkasPendaftar>
 */
class BerkasPendaftarFactory extends Factory
{
    protected $model = BerkasPendaftar::class;

    public function definition(): array
    {
        return [
            'id_pendaftar' => Pendaftar::factory(),
            'cv' => 'seed/berkas-pendaftar/cv.pdf',
            'surat_rekomendasi' => 'seed/berkas-pendaftar/surat-rekomendasi.pdf',
            'proposal' => 'seed/berkas-pendaftar/proposal.pdf',
            'dok_pendukung' => 'seed/berkas-pendaftar/dokumen-pendukung.pdf',
        ];
    }
}

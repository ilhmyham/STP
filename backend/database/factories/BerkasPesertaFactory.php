<?php

namespace Database\Factories;

use App\Models\BerkasPeserta;
use App\Models\Peserta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BerkasPeserta>
 */
class BerkasPesertaFactory extends Factory
{
    protected $model = BerkasPeserta::class;

    public function definition(): array
    {
        return [
            'id_peserta' => Peserta::factory(),
            'surat_balasan' => 'seed/berkas-peserta/surat-balasan.pdf',
            'surat_penilaian' => 'seed/berkas-peserta/surat-penilaian.pdf',
            'sertifikat_magang' => 'seed/berkas-peserta/sertifikat-magang.pdf',
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Peserta;
use App\Models\SuratPenilaian;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SuratPenilaian>
 */
class SuratPenilaianFactory extends Factory
{
    protected $model = SuratPenilaian::class;

    public function definition(): array
    {
        return [
            'id_peserta' => Peserta::factory(),
            'surat_penilaian' => 'seed/surat-penilaian/surat-penilaian.pdf',
        ];
    }
}

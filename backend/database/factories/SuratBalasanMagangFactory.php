<?php

namespace Database\Factories;

use App\Models\Peserta;
use App\Models\SuratBalasanMagang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SuratBalasanMagang>
 */
class SuratBalasanMagangFactory extends Factory
{
    protected $model = SuratBalasanMagang::class;

    public function definition(): array
    {
        return [
            'id_peserta' => Peserta::factory(),
            'surat_balasan' => 'seed/surat-balasan/surat-balasan.pdf',
        ];
    }
}

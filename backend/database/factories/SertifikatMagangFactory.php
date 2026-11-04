<?php

namespace Database\Factories;

use App\Models\Peserta;
use App\Models\SertifikatMagang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SertifikatMagang>
 */
class SertifikatMagangFactory extends Factory
{
    protected $model = SertifikatMagang::class;

    public function definition(): array
    {
        return [
            'id_peserta' => Peserta::factory(),
            'sertifikat_magang' => 'seed/sertifikat-magang/sertifikat-magang.pdf',
        ];
    }
}

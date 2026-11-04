<?php

namespace Database\Factories;

use App\Models\JenjangPendidikan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JenjangPendidikan>
 */
class JenjangPendidikanFactory extends Factory
{
    protected $model = JenjangPendidikan::class;

    public function definition(): array
    {
        return [
            'pendidikan' => fake('id_ID')->randomElement(['D3', 'D4', 'S1', 'S2']),
        ];
    }
}

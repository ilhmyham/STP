<?php

namespace Database\Factories;

use App\Models\BidangPeminatan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BidangPeminatan>
 */
class BidangPeminatanFactory extends Factory
{
    protected $model = BidangPeminatan::class;

    public function definition(): array
    {
        return [
            'nama_bidang' => fake('id_ID')->randomElement([
                'Web Development',
                'Mobile Development',
                'Data Science',
                'UI/UX Design',
                'Digital Marketing',
                'Cyber Security',
            ]),
        ];
    }
}

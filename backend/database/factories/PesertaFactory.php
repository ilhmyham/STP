<?php

namespace Database\Factories;

use App\Models\BidangPeminatan;
use App\Models\Pendaftar;
use App\Models\Peserta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Peserta>
 */
class PesertaFactory extends Factory
{
    protected $model = Peserta::class;

    public function definition(): array
    {
        $faker = fake('id_ID');
        $mulai = $faker->dateTimeBetween('-3 months', 'now');
        $selesai = (clone $mulai)->modify('+6 months');

        return [
            'pendaftar_id' => Pendaftar::factory(),
            'tanggal' => $mulai->format('Y-m-d'),
            'tanggal_selesai' => $selesai->format('Y-m-d'),
            'mentor' => $faker->name(),
            'mentor_kedua' => $faker->name(),
            'email' => $faker->unique()->safeEmail(),
            'email_kedua' => $faker->safeEmail(),
            'noHp' => $faker->phoneNumber(),
            'noHp_kedua' => $faker->phoneNumber(),
            'bidang_peminatan_id' => BidangPeminatan::factory(),
            'status' => $faker->randomElement(['onGoing', 'finished']),
        ];
    }
}

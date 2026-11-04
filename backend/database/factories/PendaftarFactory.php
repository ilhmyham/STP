<?php

namespace Database\Factories;

use App\Models\BidangPeminatan;
use App\Models\JenjangPendidikan;
use App\Models\Pendaftar;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Pendaftar>
 */
class PendaftarFactory extends Factory
{
    protected $model = Pendaftar::class;

    public function definition(): array
    {
        $faker = fake('id_ID');

        return [
            'user_id' => User::factory(),
            'nama' => $faker->name(),
            'tempat_lahir' => $faker->city(),
            'tanggal_lahir' => $faker->dateTimeBetween('-25 years', '-18 years')->format('Y-m-d'),
            'jenis_kelamin' => $faker->randomElement(['pria', 'wanita']),
            'email' => $faker->unique()->safeEmail(),
            'noHP' => $faker->phoneNumber(),
            'alamat_asal' => $faker->address(),
            'alamat_domisili' => $faker->address(),
            'asal_instansi' => $faker->randomElement([
                'Universitas Indonesia',
                'Institut Teknologi Bandung',
                'Universitas Gadjah Mada',
                'Universitas Brawijaya',
                'Universitas Diponegoro',
                'Universitas Airlangga',
                'Universitas Sumatera Utara',
                'Universitas Hasanuddin',
            ]),
            'jenjang_pendidikan' => JenjangPendidikan::factory(),
            'fakultas' => $faker->randomElement([
                'Fakultas Teknik',
                'Fakultas Ilmu Komputer',
                'Fakultas Sains dan Teknologi',
                'Fakultas Ekonomi dan Bisnis',
            ]),
            'program_studi' => $faker->randomElement([
                'Teknik Informatika',
                'Sistem Informasi',
                'Ilmu Komputer',
                'Teknik Komputer',
                'Manajemen Informatika',
            ]),
            'nim' => $faker->numerify('20########'),
            'semester' => (string) $faker->numberBetween(2, 8),
            'durasi' => $faker->randomElement(['3 Bulan', '6 Bulan', '1 Tahun']),
            'periodic_mulai' => $faker->dateTimeBetween('now', '+2 months')->format('Y-m-d'),
            'bidang_peminatan' => BidangPeminatan::factory(),
            'status' => 'uncheck',
        ];
    }

    public function diterima(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'diterima',
        ]);
    }

    public function ditolak(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'ditolak',
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Seeder ini hanya untuk development lokal. Di environment lain
     * (testing/staging/production) tidak ada data yang dibuat.
     */
    public function run(): void
    {
        if (! app()->environment('local')) {
            return;
        }

        $this->call([
            MasterDataSeeder::class,
            UserSeeder::class,
            PendaftarSeeder::class,
            PesertaSeeder::class,
        ]);
    }
}

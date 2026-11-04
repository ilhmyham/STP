<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public const PASSWORD = 'password123';

    public const ADMIN_EMAIL = 'admin@test.com';

    public const USER_EMAILS = [
        'user1@test.com',
        'user2@test.com',
        'user3@test.com',
    ];

    /**
     * Akun pelamar tambahan. Dibutuhkan karena pendaftars.user_id unik:
     * setiap pendaftar harus terhubung ke user yang berbeda.
     */
    public const APPLICANT_EMAILS = [
        'pelamar4@test.com',
        'pelamar5@test.com',
        'pelamar6@test.com',
        'pelamar7@test.com',
        'pelamar8@test.com',
        'pelamar9@test.com',
        'pelamar10@test.com',
    ];

    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => self::ADMIN_EMAIL],
            [
                'name' => 'Admin Technopark',
                'password' => self::PASSWORD,
                'email_verified_at' => now(),
            ]
        );

        // `role` tidak ada di $fillable, jadi diisi eksplisit.
        $admin->forceFill(['role' => 'admin'])->save();

        foreach (self::USER_EMAILS as $index => $email) {
            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => 'User Test '.($index + 1),
                    'password' => self::PASSWORD,
                    'email_verified_at' => now(),
                ]
            );

            $user->forceFill(['role' => 'user'])->save();
        }

        foreach (self::APPLICANT_EMAILS as $index => $email) {
            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => 'Pelamar '.($index + 4),
                    'password' => self::PASSWORD,
                    'email_verified_at' => now(),
                ]
            );

            $user->forceFill(['role' => 'user'])->save();
        }
    }
}

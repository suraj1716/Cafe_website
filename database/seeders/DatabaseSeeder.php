<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run all main seeders
        $this->call([
            AdminUserSeeder::class,
            GallerySeeder::class,
            MenuSeeder::class,
        ]);

        // Create a test user if it doesn't exist
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'), // adjust if needed
            ]
        );
    }
}

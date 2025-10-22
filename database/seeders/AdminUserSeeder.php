<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'shrestha.suraj.2013@gmail.com'], // avoid duplicates
            [
                'name' => 'Admin',
                'password' => Hash::make('qwerty123'), // only set if new
            ]
        );
    }
}

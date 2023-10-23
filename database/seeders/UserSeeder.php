<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'role' => 2,
            'password' => Hash::make('password'),
        ]);
        DB::table('users')->insert([
            'name' => 'ItDev',
            'email' => 'ItDev@admin.com',
            'role' => 0,
            'password' => Hash::make('password'),
        ]);
        DB::table('users')->insert([
            'name' => 'Owner',
            'email' => 'owner@admin.com',
            'role' => 1,
            'password' => Hash::make('password'),
        ]);

        DB::table('users')->insert([
            'name' => 'manager',
            'email' => 'manager@admin.com',
            'role' => 3,
            'password' => Hash::make('password'),
        ]);
    }
}

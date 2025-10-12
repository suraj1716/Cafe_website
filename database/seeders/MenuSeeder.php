<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\MenuItem;

class MenuSeeder extends Seeder
{
    public function run()
    {
        // ------------------------
        // Create Beverages Category
        // ------------------------
        $beveragesCategory = Category::create([
            'name' => 'Beverages',
            'description' => 'Refreshing drinks to enjoy your cafe time',
            'image' => null,
        ]);

        $beverages = [
            [
                'name' => 'Americano',
                'description' => 'Espresso diluted with hot water for a smooth taste',
                'sizes' => ['Small' => 3, 'Medium' => 4, 'Large' => 5],
            ],
            [
                'name' => 'Latte',
                'description' => 'Espresso with steamed milk and a thin layer of foam',
                'sizes' => ['Small' => 4, 'Medium' => 5, 'Large' => 6],
            ],
            [
                'name' => 'Cappuccino',
                'description' => 'Equal parts espresso, steamed milk, and foam',
                'sizes' => ['Small' => 4, 'Medium' => 5, 'Large' => 6],
            ],
            [
                'name' => 'Flat White',
                'description' => 'Espresso with velvety microfoam, smooth and creamy',
                'sizes' => ['Small' => 4, 'Medium' => 5, 'Large' => 6],
            ],
            [
                'name' => 'Iced Latte',
                'description' => 'Espresso with cold milk and ice cubes',
                'sizes' => ['Small' => 4, 'Medium' => 5, 'Large' => 6],
            ],
        ];

        foreach ($beverages as $bev) {
            foreach ($bev['sizes'] as $size => $price) {
                MenuItem::create([
                    'category_id' => $beveragesCategory->id,
                    'name' => $bev['name'],
                    'description' => $bev['description'],
                    'size' => $size,
                    'price' => $price,
                    'image' => null,
                ]);
            }
        }

        // ------------------------
        // Create Burgers Category
        // ------------------------
        $burgersCategory = Category::create([
            'name' => 'Burgers',
            'description' => 'Delicious freshly made burgers',
            'image' => null,
        ]);

        $burgers = [
            [
                'name' => 'Classic Beef Burger',
                'description' => 'Juicy beef patty with lettuce, tomato, and cheese',
                'sizes' => ['Regular' => 8, 'Large' => 10],
            ],
            [
                'name' => 'Chicken Burger',
                'description' => 'Grilled chicken with fresh veggies and sauce',
                'sizes' => ['Regular' => 7, 'Large' => 9],
            ],
            [
                'name' => 'Veggie Burger',
                'description' => 'Plant-based patty with fresh lettuce and tomato',
                'sizes' => ['Regular' => 6, 'Large' => 8],
            ],
            [
                'name' => 'Cheeseburger',
                'description' => 'Classic beef burger with melted cheese',
                'sizes' => ['Regular' => 8, 'Large' => 10],
            ],
        ];

        foreach ($burgers as $burger) {
            foreach ($burger['sizes'] as $size => $price) {
                MenuItem::create([
                    'category_id' => $burgersCategory->id,
                    'name' => $burger['name'],
                    'description' => $burger['description'],
                    'size' => $size,
                    'price' => $price,
                    'image' => null,
                ]);
            }
        }
    }
}

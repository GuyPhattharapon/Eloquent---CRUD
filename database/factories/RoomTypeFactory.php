<?php

namespace Database\Factories;

use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomType>
 */
class RoomTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word() . '_' . $this->faker->randomNumber(3),

            //'name' => $this->faker->unique()->word, // ใช้ unique เพื่อป้องกันค่า name ซ้ำ
            'description' => $this->faker->sentence,
            'price_per_night' => $this->faker->randomFloat(2, 100, 2000),
        ];
    }
}
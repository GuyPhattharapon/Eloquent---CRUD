<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\Guest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'guest_id' => Guest::factory(),
            'room_id' => Room::factory(),
            'check_in_date' => now()->addDays(rand(1, 30)),
            'check_out_date' => now()->addDays(rand(31, 60)),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled']),
        ];
    }
}

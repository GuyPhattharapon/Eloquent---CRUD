<?php

namespace Database\Factories;

use App\Models\Register;
use App\Models\Student;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Register>
 */
class RegisterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => Student::factory(), // ใช้ StudentFactory ในการสร้างข้อมูลนักศึกษา
            'course_id' => Course::factory(), // ใช้ CourseFactory ในการสร้างข้อมูลรายวิชา
        ];
    }
}
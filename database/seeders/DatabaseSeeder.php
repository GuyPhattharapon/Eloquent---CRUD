<?php

namespace Database\Seeders;

use App\Models\Room;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Guest;
use App\Models\Order;
use App\Models\Course;
use App\Models\Booking;
use App\Models\Product;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Customer;
use App\Models\Register;
use App\Models\RoomType;
use App\Models\OrderDetail;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        // ปิดการตรวจสอบ foreign key constraint
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // ลบข้อมูลเก่าของ users ก่อน
        DB::table('courses')->truncate();
    
        // ลบข้อมูลเก่าของ room_types และ rooms ก่อน
        Room::truncate();
        RoomType::truncate();
    
        // Seed RoomType และ Room
        RoomType::factory(3)->create();
        Room::factory(20)->create();
    
        // Seed ระบบจัดการสินค้า
        Product::factory(10)->create();
        Customer::factory(5)->create()->each(function ($customer) {
            $order = Order::factory()->create(['customer_id' => $customer->id]);
            OrderDetail::factory(2)->create(['order_id' => $order->id]);
        });
    
        // Seed ระบบจองห้องพัก
        Guest::factory(10)->create();
        Booking::factory(15)->create();
    
        // Seed ระบบทะเบียนนักศึกษา
        Student::factory(10)->create(); // สร้างนักศึกษา 10 คน
        Course::factory(5)->create(); // สร้างรายวิชา 5 รายการ
        Teacher::factory(3)->create(); // สร้างอาจารย์ 3 คน
        Register::factory(15)->create(); // สร้างการลงทะเบียน 15 รายการ
    
        // เปิดการตรวจสอบ foreign key constraint
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}

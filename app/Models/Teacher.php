<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    // กำหนดฟิลด์ที่สามารถกรอกข้อมูลได้
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
    ];

    // ความสัมพันธ์กับ Course
    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}

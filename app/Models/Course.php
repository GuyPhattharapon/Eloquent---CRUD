<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    // กำหนดฟิลด์ที่สามารถกรอกข้อมูลได้
    protected $fillable = [
        'course_name',
        'course_code',
    ];

    // ความสัมพันธ์กับ Register
    public function registers()
    {
        return $this->hasMany(Register::class);
    }

    // ความสัมพันธ์กับ Student ผ่าน Register
    public function students()
    {
        return $this->belongsToMany(Student::class, 'registers');
    }
}

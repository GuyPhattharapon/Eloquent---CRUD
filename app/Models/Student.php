<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // กำหนดฟิลด์ที่สามารถกรอกข้อมูลได้
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
    ];

    // ความสัมพันธ์กับ Register
    public function registers()
    {
        return $this->hasMany(Register::class);
    }

    // ความสัมพันธ์กับ Course ผ่าน Register
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'registers');
    }
}

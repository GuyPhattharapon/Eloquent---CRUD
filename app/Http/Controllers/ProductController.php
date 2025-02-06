<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // แสดงรายการสินค้าทั้งหมด
    public function index() 
    {
        $products = Product::with(['orderDetails.order.customer'])->get(); // ดึงข้อมูลสินค้าพร้อมกับข้อมูลสั่งซื้อและลูกค้าที่สั่งซื้อ
        return Inertia::render('Products/index', [
            'products' => $products
        ]);
    }

    // แสดงฟอร์มเพิ่มสินค้าใหม่
    public function create() //เรนเดอร์หน้าเพิ่มสินค้าใหม่ (Products/Create) ผ่าน Inertia
    {
        return Inertia::render('Products/Create');
    }

    // บันทึกข้อมูลสินค้าใหม่
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric|min:0', //price → จำเป็นต้องกรอก, เป็น ตัวเลข, ต้องไม่ติดลบ
            'stock' => 'required|integer|min:0', //stock → จำเป็นต้องกรอก, เป็น จำนวนเต็ม, ต้องไม่ติดลบ
        ]);

        //สร้างสินค้าใหม่ โดยใช้ only() ดึงเฉพาะค่าที่ต้องการจาก request
        Product::create($request->only('name', 'description', 'price', 'stock'));

        return redirect()->route('products.index')->with('success', 'เพิ่มสินค้าสำเร็จ!'); //แสดงว่า บันทึกสินค้าสำเร็จ
    }

    // แสดงฟอร์มแก้ไขสินค้า
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product
        ]);
    }

    // อัปเดตข้อมูลสินค้า
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product->update($request->only('name', 'description', 'price', 'stock'));

        return redirect()->route('products.index')->with('success', 'อัปเดตสินค้าสำเร็จ!');
    }

    // ลบสินค้า
    public function destroy(Product $product)
    {
        // ตรวจสอบว่าสินค้ามีรายการสั่งซื้อหรือไม่
        if ($product->orderDetails()->exists()) {
            return redirect()->route('products.index')->with('error', 'ไม่สามารถลบสินค้าได้ เนื่องจากมีการสั่งซื้อ');
        }

        $product->delete();
        return redirect()->route('products.index')->with('success', 'ลบสินค้าสำเร็จ!');
    }
}

import { usePage, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from 'react';

export default function Index() { //ฟังก์ชัน Index เป็น component หลักที่ใช้แสดงหน้ารายการสินค้า
    const { products = [] } = usePage().props;

    const [currentPage, setCurrentPage] = useState(1); // currentPage → เก็บค่าหน้าปัจจุบันของการแบ่งหน้า (pagination)
    const [searchTerm, setSearchTerm] = useState(''); // เก็บค่าของช่องค้นหาที่กรอก
    const itemsPerPage = 10; // จำนวนสินค้าที่แสดงในแต่ละหน้าแค่ 10 รายการ

    // ฟังก์ชันสำหรับการค้นหา
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // เมื่อพิมพ์ในช่องค้นหา อัปเดตค่าsearchTerm
        setCurrentPage(1); // เมื่อมีการค้นหาจะเริ่มจากหน้าแรก
    };

    // ฟังก์ชันสำหรับกรองสินค้า
    const filteredProducts = products.filter((product) => //ใช้ filter() เพื่อตรวจสอบว่า name หรือ description มีค่าตรงกับ ที่เราค้นหาหรือไม่
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || // ใช้ toLowerCase() เพื่อเปลี่ยนตัวอักษรให้เป็นตัวพิมพ์เล็ก
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // คำนวณว่าแต่ละหน้าจะแสดงข้อมูลอะไรกันบ้าง
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); // ใช้ slice() เพื่อตัดเฉพาะสินค้าที่จะถูกแสดงในหน้านั้น

    const handleDelete = (id) => { // ฟังก์ชันสำหรับลบสินค้า
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) { //แสดง confirm() ให้ผู้ใช้ยืนยันก่อนลบ
            router.delete(`/products/${id}`); //ใช้ router.delete() เพื่อลบสินค้า โดยส่ง request ไปที่ /products/{id}
        }
    };

    // ฟังก์ชันสำหรับเปลี่ยนหน้า
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber); // เมื่อคลิกที่หมายเลขหน้า จะเปลี่ยนหน้าไปที่หน้านั้น
    };

    // คำนวณจำนวนหน้าที่มีทั้งหมด
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    //คำนวณจำนวนหน้าทั่งหมด โดย Math.ceil() ปัดเศษขึ้นเพื่อให้ได้จำนวนหน้าที่ถูกต้อง

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl">
                <h2 className="mb-6 text-center text-3xl font-bold text-blue-600">
                    รายการสินค้า
                </h2>

                {/* ช่องค้นหาและปุ่มเพิ่มสินค้าอยู่ในแถวเดียวกัน */}
                <div className="mb-4 flex justify-center items-center gap-4">
                    {/* ช่องค้นหา */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="ค้นหาสินค้า..."
                        className="border p-2 rounded w-full max-w-lg"
                    />

                    {/* ปุ่มเพิ่มสินค้า */}
                    <Link
                        href="/products/create"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded whitespace-nowrap"
                    >
                        + เพิ่มสินค้า
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 shadow-md">
                        <thead>
                            <tr className="bg-blue-600 text-white text-lg">
                                <th className="border border-gray-400 px-6 py-3">ชื่อสินค้า</th>
                                <th className="border border-gray-400 px-6 py-3">รายละเอียด</th>
                                <th className="border border-gray-400 px-6 py-3">ราคา</th>
                                <th className="border border-gray-400 px-6 py-3">สต็อก</th>
                                <th className="border border-gray-400 px-6 py-3">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => ( // ใช้ map() เพื่อวนลูปแสดงข้อมูลสินค้า
                                <tr key={product.id} className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200">
                                    <td className="border border-gray-300 px-6 py-3 text-center">{product.name}</td>
                                    <td className="border border-gray-300 px-6 py-3 text-center">{product.description}</td>
                                    <td className="border border-gray-300 px-6 py-3 text-center text-green-600 font-semibold">
                                        {product.price} บาท
                                    </td>
                                    <td className="border border-gray-300 px-6 py-3 text-center">{product.stock}</td>
                                    <td className="border border-gray-300 px-6 py-3 text-center">
                                        <Link
                                            href={`/products/${product.id}/edit`} // แก้ไข syntax error
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2"
                                        >
                                            แก้ไข
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    <nav className="flex items-center space-x-1">
                        {currentPage > 1 && (
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
                            >
                                {'ก่อนหน้า'}
                            </button>
                        )}
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-3 py-1.5 text-sm rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-500'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
                            >
                                {'ถัดไป'}
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

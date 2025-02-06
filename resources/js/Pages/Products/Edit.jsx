import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


//Edit({ product }) → เป็น Function Component ที่รับ product เป็น prop (ข้อมูลสินค้าที่ต้องการแก้ไข)
export default function Edit({ product }) { // useForm สำหรับจัดการฟอร์ม
    const { data, setData, put, processing, errors } = useForm({ 
        name: product.name,
        description: product.description,
        price: product.price,
        storage: product.storage,
        stock: product.stock
    });

    const handleSubmit = (e) => {
        e.preventDefault(); //ป้องกันการโหลดหน้าใหม่เมื่อกดปุ่ม Submit และ put ไปยัง /products/{id} 
        put(`/products/${product.id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl max-w-xl">
                <h2 className="text-3xl font-bold text-center text-yellow-600 mb-6">แก้ไขสินค้า</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium text-gray-700">ชื่อสินค้า</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">รายละเอียด</label>
                        <textarea
                            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">ราคา</label>
                        <input
                            type="number"
                            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">สต็อก</label>
                        <input
                            type="number"
                            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 focus:outline-none"
                            disabled={processing}
                        >
                            {processing ? 'กำลังบันทึก...' : 'อัปเดตสินค้า'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );

}

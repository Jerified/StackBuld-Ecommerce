"use client"

import { deleteProductById, getProductById } from '@/lib/indexedDB';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Loader from '@/components/ui/loading';

const ProductDetails = ({ id }: { id: string }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function loadProduct() {
            const productData = await getProductById(id);
            if (productData) {
                setProduct(productData);
            } else {
                console.log('Product not found');
            }
        }

        loadProduct();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = confirm(`Are you sure you want to delete "${product?.name}"?`);
        if (confirmed && product) {
            await deleteProductById(product.id);
            toast.success('Product deleted successfully.');
            router.push('/');
        }
    };

    if (!product) {
        return <div className='flex min-h-screen justify-center items-center'>
            <Loader />
        </div>;
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row gap-4 justify-center items-center relative my-4 border p-3 lg:px-6 rounded-md">
            <div className="w-full rounded-xl">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        quality={100}
                        width={500}
                        height={500}
                        alt="Product"
                        className="lg:w-[50vw] h-[70vh] rounded-xl object-contain overflow-hidden"
                    />
                ) : (
                    <div className="w-full h-[80vh] rounded-xl animate-pulse bg-gray-200"></div>
                )}
            </div>
            <div className="lg:w-[60%] h-[30%]">
                <div className=" rounded-lg w-fit h-fit">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-semibold text-white">{product.name}</h2>
                            <h2 className="text-lg font-semibold text-white mt-3 border px-2 rounded-lg w-fit">{product.category}</h2>
                        </div>
                        <div className="flex items-center border p-2 rounded-md">
                            <Link href={`/product/edit/${product.id}`} className=" text-white hover:text-gray-300">
                                <FiEdit className="h-6 w-6" aria-label={`Edit ${product.name}`} />
                            </Link>
                            <button onClick={handleDelete} className="ml-4 text-red-500 hover:text-red-300">
                                <FiTrash2 className="h-6 w-6" aria-label={`Delete ${product.name}`} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-between mt-6">
                        <h3 className="text-white font-bold text-4xl">${product.price}</h3>
                    </div>

                    <div>
                        <ul className="grid grid-cols-3 mt-8">
                            <li className="text-white text-base w-full py-3.5 px-2 text-center border-b-2 border-white cursor-pointer">
                                Description
                            </li>
                            <li className="text-gray-300 text-base w-full py-3.5 px-2 text-center border-b-2 border-gray-400 cursor-pointer">
                                Details
                            </li>
                            <li className="text-gray-300 text-base w-full py-3.5 px-2 text-center border-b-2 border-gray-400 cursor-pointer">
                                Reviews
                            </li>
                        </ul>
                        <p className="text-gray-300 mt-4 text-base">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;

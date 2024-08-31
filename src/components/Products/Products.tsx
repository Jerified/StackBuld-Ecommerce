// import { Product } from '@/db'

import type { Product as TProduct } from "@/types/product"
import Image from "next/image"
import Link from "next/link"

const Product = ({ product }: { product: TProduct }) => {
  return (
    <Link href={`/product/${product.id}`} className='relative z-20 row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-3 dark:bg-black dark:border-white/[0.2] border justify-between flex flex-col space-y-4 cursor-pointer h-fit'>
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          className='h-[35vh] w-full object-cover object-center'
          width={200}
          height={200}
          quality={100}
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-md font-semibold text-gray-700'>{product.name}</h3>
        </div>

        <p className='text-sm font-semiold text-gray-900'>${product.price}</p>
      </div>
    </Link>
  )
}

export default Product

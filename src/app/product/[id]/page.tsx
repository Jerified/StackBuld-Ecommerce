// import ProductDetails from "./productDetails"

import { getProductById } from "@/lib/indexedDB"
import ProductDetails from "./ProductDetails"

type IdProp = {
    params: {
        id: string
    }
}

const page = async ({params}: IdProp) => { 
    console.log(params.id);

    const productData = await getProductById(params.id);
    if (productData) {
        console.log(productData);
    } else {
        console.log('Product not found');
    }
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ProductDetails id={params.id} />
    </main>
  )
}

export default page
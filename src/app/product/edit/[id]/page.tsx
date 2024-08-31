"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getProductById, updateProduct } from "@/lib/indexedDB";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { toast } from "sonner"; 

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be at least 0").multipleOf(0.01, "Price must be a valid decimal"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  image: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length <= 1,
      "Please select one image."
    )
    .refine(
      (files) => !files.length || files[0].type.startsWith("image/"),
      "The selected file must be an image."
    )
    .optional(),
});

type ProductForm = z.infer<typeof productSchema>;

const EditProduct = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
      image: undefined,
    },
  });

  useEffect(() => {
    async function loadProduct() {
      const productData = await getProductById(id);
      if (productData) {
        setProduct(productData);
        setValue("name", productData.name);
        setValue("price", productData.price);
        setValue("category", productData.category);
        setValue("description", productData.description || "");
      } else {
        console.log("Product not found");
      }
    }

    loadProduct();
  }, [id, setValue]);

  const onSubmit = async (data: ProductForm) => {
    if (!product) return;

    let imageUrl = product.imageUrl;

    if (data.image && data.image.length > 0) {
      const file = data.image[0];
      imageUrl = URL.createObjectURL(file);
    }

    const updatedProduct: Product = {
      ...product,
      ...data,
      imageUrl,
    };

    await updateProduct(id, updatedProduct);
    toast.success("Product updated successfully!");
    router.push(`/product/${id}`);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[25rem] lg:w-[40rem] p-6 border rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <input
            id="category"
            type="text"
            {...register("category")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">
            Image
          </label>
          <div className="flex items-center gap-4">
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image")}
              className="mt-1 block w-full border rounded-md p-2"
            />
            {product.imageUrl && (
              <div className="">
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  width={50}
                  height={50}
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {/* {errors?.image?.message} */}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

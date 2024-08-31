"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { addProduct } from '@/lib/indexedDB';
import { toast } from "sonner"; 
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
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
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProduct() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const file = data.image[0];
      const imageUrl = URL.createObjectURL(file);

      await addProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl,
        id: new Date().getTime().toString(),
        createdAt: new Date(),
      });
      console.log(imageUrl)

      toast.success("Product added successfully!");
      router.push(`/`);
    } catch (error) {
      toast.error("An error occurred while adding the product.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[25rem] lg:w-[40rem] p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`mt-1 p-2 w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              {...register("description")}
              className={`mt-1 p-2 w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={`mt-1 p-2 w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              id="category"
              type="text"
              {...register("category")}
              className={`mt-1 p-2 w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* Image Selection */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image")}
              className={`mt-1 p-2 w-full border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.image?.message && <p className="text-red-500 text-sm">{String(errors.image.message)}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

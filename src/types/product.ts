import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Invalid image URL'),
  createdAt: z.date().optional(),
});

export type Products = z.infer<typeof productSchema>;


export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    createdAt: Date;
  }

  
  
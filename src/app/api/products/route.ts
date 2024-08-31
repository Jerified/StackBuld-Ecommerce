import { addProduct, getProducts } from '@/lib/indexedDB';
import { Product } from '@/types/product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(`Received ${req.method} request`);
  if (req.method === 'GET') {
    const products = await getProducts();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const newProduct: Product = req.body;
    const id = await addProduct(newProduct);
    res.status(201).json({ id });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { deleteProduct, getProductById, updateProduct } from '@/lib/indexedDB';
import { Product } from '@/types/product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (req.method === 'GET') {
    const product = await getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } else if (req.method === 'PUT') {
    const updatedProduct: Product = req.body;
    await updateProduct(id, updatedProduct);
    res.status(200).json({ message: 'Product updated' });
  } else if (req.method === 'DELETE') {
    await deleteProduct(id);
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { openDB, DBSchema } from 'idb';
import { Product } from '../types/product';

interface ProductDB extends DBSchema {
  products: {
    key: string;
    value: Product;
  };
}

const dbPromise = typeof window !== 'undefined'
  ? openDB<ProductDB>('Product-db', 1, {
      upgrade(db) {
        db.createObjectStore('products', {
          keyPath: 'id',
          autoIncrement: true,
        });
      },
    })
  : Promise.resolve(null);

  export const getProducts = async () => {
    const db = await dbPromise;
    if (!db) return []; // Return an empty array if IndexedDB is not available
    return db.getAll('products');
  };

  export const addProduct = async (product: Product) => {
    const db = await dbPromise;
    if (!db) return;
    return db.add('products', product);
  };
  
  export const updateProduct = async (id: string, product: Product) => {
    const db = await dbPromise;
    if (!db) return;
    return db.put('products', { ...product, id });
  };
  
  export const deleteProductById = async (id: string) => {
    const db = await dbPromise;
    if (!db) return;
    return db.delete('products', id);
  };
  
  export const getProductById = async (id: string) => {
    const db = await dbPromise;
    if (!db) return null;
    return db.get('products', id);
  };

export const initializeProducts = async () => {
    const db = await dbPromise;
    if (!db) return;
  
    const productCount = await db.count('products');

  if (productCount === 0) {
    const initialProducts: Product[] = [
        {
            id: "1",
            name: "Wireless Headphones",
            description: "High-quality wireless headphones with noise-canceling features.",
            price: 199.99,
            category: "Electronics",
            imageUrl: "https://images.unsplash.com/photo-1637780852590-8ab27248ec41?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            createdAt: new Date("2023-06-15"),
          },
          {
            id: "2",
            name: "Smartphone",
            description: "Latest model smartphone with a powerful processor and high-resolution display.",
            price: 999.99,
            category: "Electronics",
            imageUrl: "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            createdAt: new Date("2023-06-20"),
          },
          {
            id: "3",
            name: "Running Shoes",
            description: "Comfortable running shoes designed for optimal performance.",
            price: 120.00,
            category: "Footwear",
            imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cnVubnklMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
            createdAt: new Date("2023-06-18"),
          },
          {
            id: "4",
            name: "Leather Wallet",
            description: "Premium leather wallet with multiple compartments.",
            price: 45.50,
            category: "Accessories",
            imageUrl: "https://images.unsplash.com/photo-1512414947060-048d53abb081?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxlYXRoZXIlMjB3YWxsZXR8ZW58MHx8MHx8fDA%3D",
            createdAt: new Date("2023-06-10"),
          },
          {
            id: "5",
            name: "Gaming Laptop",
            description: "High-performance gaming laptop with a powerful GPU.",
            price: 1500.00,
            category: "Electronics",
            imageUrl: "https://images.unsplash.com/photo-1507470855518-469f3b3dad25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhbWluZyUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
            createdAt: new Date("2023-06-25"),
          },
          {
            id: "6",
            name: "Coffee Maker",
            description: "Automatic coffee maker with a built-in grinder.",
            price: 99.99,
            category: "Appliances",
            imageUrl: "https://plus.unsplash.com/premium_photo-1667621220543-12b87cae51d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZWUlMjBtYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
            createdAt: new Date("2023-06-22"),
          },
          {
            id: "7",
            name: "Bluetooth Speaker",
            description: "Portable Bluetooth speaker with excellent sound quality.",
            price: 79.99,
            category: "Electronics",
            imageUrl: "https://images.unsplash.com/photo-1668649175276-fa4f96beb185?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNwZWFrZXIlMjBibHVldG9vdGh8ZW58MHx8MHx8fDA%3D",
            createdAt: new Date("2023-06-17"),
          },
          {
            id: "8",
            name: "Electric Toothbrush",
            description: "Rechargeable electric toothbrush with multiple brushing modes.",
            price: 49.99,
            category: "Personal Care",
            imageUrl: "https://images.unsplash.com/photo-1641130331708-dd0cc94ae8e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVsZWN0cmljJTIwdG9vdGhicnVzaHxlbnwwfHwwfHx8MA%3D%3D",
            createdAt: new Date("2023-06-12"),
          },
          {
            id: "9",
            name: "Yoga Mat",
            description: "Non-slip yoga mat with extra cushioning.",
            price: 29.99,
            category: "Fitness",
            imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHlvZ2ElMjBtYXR8ZW58MHx8MHx8fDA%3D",
            createdAt: new Date("2023-06-15"),
          },
          {
            id: "10",
            name: "LED Monitor",
            description: "27-inch LED monitor with 4K resolution.",
            price: 299.99,
            category: "Electronics",
            imageUrl: "https://images.unsplash.com/photo-1691480195680-144318cfa695?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVkJTIwbW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D",
            createdAt: new Date("2023-06-28"),
          },
          {
            id: "11",
            name: "Leather Jacket",
            description: "Stylish leather jacket with a sleek design.",
            price: 199.99,
            category: "Clothing",
            imageUrl: "https://media.istockphoto.com/id/505623612/photo/leather-jacket.jpg?s=1024x1024&w=is&k=20&c=xr4w6M-hXP8P5SUTaIh3MZqFfqkm7_rWVlIX97UjVyk=",
            createdAt: new Date("2023-06-11"),
          },
          {
            id: "12",
            name: "Smartwatch",
            description: "Smartwatch with fitness tracking and customizable watch faces.",
            price: 249.99,
            category: "Electronics",
            imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hdGNoJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
            createdAt: new Date("2023-06-16"),
          },
          {
            id: "13",
            name: "Blender",
            description: "High-speed blender with multiple speed settings.",
            price: 89.99,
            category: "Appliances",
            imageUrl: "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
            createdAt: new Date("2023-06-14"),
          },
          {
            id: "14",
            name: "Desk Lamp",
            description: "Adjustable desk lamp with a USB charging port.",
            price: 39.99,
            category: "Home Office",
            imageUrl: "https://plus.unsplash.com/premium_photo-1681412205381-c0e9681bcbb8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D",
            createdAt: new Date("2023-06-13"),
          },
          {
            id: "15",
            name: "Backpack",
            description: "Durable backpack with multiple compartments and a laptop sleeve.",
            price: 69.99,
            category: "Accessories",
            imageUrl: "https://plus.unsplash.com/premium_photo-1664110691115-790e20a41744?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
            createdAt: new Date("2023-06-29"),
          },
    ];

    for (const product of initialProducts) {
      await addProduct(product);
    }
  }
};

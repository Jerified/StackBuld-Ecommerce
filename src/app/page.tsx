"use client"

import { getProducts, initializeProducts } from '@/lib/indexedDB';
import type { Product as TProduct } from '@/types/product';
import { useCallback, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Product from '@/components/Products/Products';
import ProductSkeleton from '@/components/Products/ProductSkeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductState } from '@/lib/validators/product-validator';
import { Slider } from '@/components/ui/slider';
import debounce from 'lodash.debounce'
import Link from 'next/link';
import { MdCreateNewFolder } from "react-icons/md"

const SORT_OPTIONS = [
    { name: 'None', value: 'none' },
    { name: 'Price: Low to High', value: 'price-asc' },
    { name: 'Price: High to Low', value: 'price-desc' },
] as const

const PRICE_FILTERS = {
    id: 'price',
    name: 'Price',
    options: [
        { value: [0, 1000], label: 'Any price' },
        { value: [0, 200], label: 'Under 200$' },
        { value: [0, 400], label: 'Under 400$' },
    ],
} as const

const SUBCATEGORIES = [
    { name: 'Electronics', selected: true, href: '#' },
    { name: 'Footwear', selected: false, href: '#' },
    { name: 'Accessories', selected: false, href: '#' },
    { name: 'Appliances', selected: false, href: '#' },
    { name: 'Personal Care', selected: false, href: '#' },
    { name: 'Fitness', selected: false, href: '#' },
    { name: 'Clothing', selected: false, href: '#' },
    { name: 'Home Office', selected: false, href: '#' },
];


const DEFAULT_CUSTOM_PRICE = [0, 1000] as [number, number]

const Home = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filter, setFilter] = useState<ProductState>({
        price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
        sort: 'none',
    });



    useEffect(() => {
        async function loadProducts() {
            await initializeProducts(); // Initialize products if none exist
            const productsData = await getProducts(); // Fetch products directly from IndexedDB
            setProducts(productsData);
            setFilteredProducts(productsData); // Initialize filtered products
        }

        loadProducts();
    }, []);

    const handleCategoryClick = (categoryName: string) => {
        const isCategorySelected = selectedCategory === categoryName;
        setSelectedCategory(isCategorySelected ? null : categoryName);
        setFilteredProducts(isCategorySelected ? products : products.filter(product => product.category === categoryName));
    };
    // filtering logic
    const filterProducts = (products: TProduct[], filter: ProductState) => {
        return products.filter(product =>
            product.price >= filter.price.range[0] &&
            product.price <= filter.price.range[1]
        );
    };

    // sorting logic
    const sortProducts = (products: TProduct[], sortOption: string) => {
        return [...products].sort((a, b) => {
            if (sortOption === 'price-asc') {
                return a.price - b.price;
            } else if (sortOption === 'price-desc') {
                return b.price - a.price;
            }
            return 0; // No sorting
        });
    };

    // Debounced version of the filtering and sorting
    const debouncedFilterAndSort = useCallback(
        debounce((products: TProduct[], filter: ProductState) => {
            let filtered = filterProducts(products, filter);
            let sorted = sortProducts(filtered, filter.sort);
            setFilteredProducts(sorted);
        }, 300),
        []
    );

    useEffect(() => {
        debouncedFilterAndSort(products, filter);
    }, [products, filter, debouncedFilterAndSort]);

    console.log(filter)
    const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
    const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

    return (
        <main className='px-4 sm:px-6 lg:px-8'>
            <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                    StackBuld
                </h1>

                <div className='flex items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                            Sort
                            <ChevronDown className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end'>
                            {SORT_OPTIONS.map((option) => (
                                <button
                                    key={option.name}
                                    className={cn('text-left w-full block px-4 py-2 text-sm', {
                                        'text-gray-900 bg-gray-100': option.value === filter.sort,
                                        'text-gray-500': option.value !== filter.sort,
                                    })}
                                    onClick={() => {
                                        setFilter((prev) => ({
                                            ...prev,
                                            sort: option.value,
                                        }));
                                    }}>
                                    {option.name}
                                </button>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <button className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'>
                        <Filter className='h-5 w-5' />
                    </button>
                    <Link href={"/product/add"} className='-m-2 ml-4 p-2 hover:text-gray-500 sm:ml-6'>
                        <MdCreateNewFolder className='h-5 w-5' />
                    </Link>
                </div>
            </div>
            <section className="pb-24 pt-6 max-w-full relative">
                <div className='lg:flex gap-4'>
                    <div className="hidden lg:block w-[20%]">
                        {/* Categories */}
                        <div className="">
                            <p className="font-bold text-md pb-6">Categories</p>
                            <ul className='space-y-4 border-b border-gray-200 pb-4 text-sm font-medium text-gray-900 pl-4'>
                                {SUBCATEGORIES.map((category) => (
                                    <li key={category.name}>
                                        <button
                                            onClick={() => handleCategoryClick(category.name)}
                                            className={`${selectedCategory === category.name ? 'text-blue-600' : ''
                                                }`}>
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {/* Price Filters */}
                            <Accordion type='multiple' className='animate-none'>
                                <AccordionItem value='price'>
                                    <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                                        <span className='font-medium text-gray-900'>Price</span>
                                    </AccordionTrigger>

                                    <AccordionContent className='pt-6 animate-none'>
                                        <ul className='space-y-4'>
                                            {PRICE_FILTERS.options.map((option, optionIdx) => (
                                                <li key={option.label} className='flex items-center'>
                                                    <input
                                                        type='radio'
                                                        id={`price-${optionIdx}`}
                                                        onChange={() => {
                                                            setFilter((prev) => ({
                                                                ...prev,
                                                                price: {
                                                                    isCustom: false,
                                                                    range: [...option.value],
                                                                },
                                                            }));
                                                        }}
                                                        checked={
                                                            !filter.price.isCustom &&
                                                            filter.price.range[0] === option.value[0] &&
                                                            filter.price.range[1] === option.value[1]
                                                        }
                                                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                                    />
                                                    <label
                                                        htmlFor={`price-${optionIdx}`}
                                                        className='ml-3 text-sm text-gray-600'>
                                                        {option.label}
                                                    </label>
                                                </li>
                                            ))}
                                            <li className='flex justify-center flex-col gap-2'>
                                                <div>
                                                    <input
                                                        type='radio'
                                                        id={`price-${PRICE_FILTERS.options.length}`}
                                                        onChange={() => {
                                                            setFilter((prev) => ({
                                                                ...prev,
                                                                price: {
                                                                    isCustom: true,
                                                                    range: [0, 1000],
                                                                },
                                                            }));
                                                        }}
                                                        checked={filter.price.isCustom}
                                                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                                    />
                                                    <label
                                                        htmlFor={`price-${PRICE_FILTERS.options.length}`}
                                                        className='ml-3 text-sm text-gray-600'>
                                                        Custom
                                                    </label>
                                                </div>

                                                <div className='flex justify-between'>
                                                    <p className='font-medium'>Price</p>
                                                    <div>
                                                        {filter.price.isCustom
                                                            ? minPrice.toFixed(0)
                                                            : filter.price.range[0].toFixed(0)}{' '}
                                                        $ -{' '}
                                                        {filter.price.isCustom
                                                            ? maxPrice.toFixed(0)
                                                            : filter.price.range[1].toFixed(0)}{' '}
                                                        $
                                                    </div>
                                                </div>

                                                <Slider
                                                    className={cn({
                                                        'opacity-50': !filter.price.isCustom,
                                                    })}
                                                    disabled={!filter.price.isCustom}
                                                    onValueChange={(range) => {
                                                        const [newMin, newMax] = range;

                                                        setFilter((prev) => ({
                                                            ...prev,
                                                            price: {
                                                                isCustom: true,
                                                                range: [newMin, newMax],
                                                            },
                                                        }));
                                                    }}
                                                    value={
                                                        filter.price.isCustom
                                                            ? filter.price.range
                                                            : DEFAULT_CUSTOM_PRICE
                                                    }
                                                    min={DEFAULT_CUSTOM_PRICE[0]}
                                                    defaultValue={DEFAULT_CUSTOM_PRICE}
                                                    max={DEFAULT_CUSTOM_PRICE[1]}
                                                    step={100}
                                                />
                                            </li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </div>
                    </div>
                    <div className="lg:w-[80%]">
                        <ul className='lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 min-h-[500px]'>
                            {filteredProducts.length ? (
                                filteredProducts.map((product) => (
                                    <Product key={product.id} product={product} />
                                ))
                            ) : (
                                new Array(12)
                                    .fill(null)
                                    .map((_, i) => <ProductSkeleton key={i} />)
                            )}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;

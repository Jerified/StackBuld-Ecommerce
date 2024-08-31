# E-commerce Product Listing Platform

## Overview
This project is an E-commerce Product Listing Platform built using the latest version of Next.js, TypeScript, and Tailwind CSS. It allows users to view a list of products, filter them by category or price, and manage the product listings by adding, editing, or deleting products. The project is SEO-compliant, performant, and follows clean coding practices to ensure maintainability and scalability.

## Features
- **Product Listing**: Displays a list of products with details such as name, price, and category.
- **Product Details**: View individual product details by clicking on a product.
- **Filtering**: Filter products by category and price range.
- **Product Management**: Users can add, edit, and delete products, with changes immediately reflected on the product listing page.
- **Responsive Design**: The application is fully responsive, providing an optimal viewing experience across various devices.
- **SEO Compliance**: The application includes proper use of meta tags, title tags, Open Graph tags, and dynamic generation of SEO content for each product page.
- **Performance Optimization**: Leveraged Next.js features like Image Optimization, lazy loading, and code splitting for performance enhancements.

## Tech Stack
- **Next.js**: For building the server-rendered React application.
- **TypeScript**: For type safety and improved developer experience.
- **Tailwind CSS**: For utility-first CSS styling.
- **IndexedDB**: For local data storage.
- **React Icons**: For consistent and accessible icons throughout the app.

## Installation and Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Jerified/StackBuld-Ecommerce.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Design Decisions
- **Local Storage**: I chose IndexedDB for storing products to keep the app lightweight and fast without relying on external databases.
- **Category & Price Filters**: Implemented a debounced filtering system to improve performance by reducing unnecessary renders.
- **SEO**: Used Next.js’s `next/head` to manage meta tags dynamically, ensuring that each product page is SEO-optimized.

## Performance Optimizations
- **Image Optimization**: Leveraged Next.js's built-in Image component for automatic image optimization.
- **Lazy Loading**: Used lazy loading for images and components to improve initial load time and performance.
- **Code Splitting**: Utilized Next.js's automatic code-splitting to reduce the initial JavaScript bundle size.

## SEO Implementation
- **Meta Tags**: Each product page has dynamically generated meta tags for better search engine indexing.
- **Open Graph**: Added Open Graph tags to enhance link previews when sharing product pages on social media.
- **Sitemap**: Implemented dynamic sitemap generation to ensure all pages are discoverable by search engines.

## Live Demo
You can access the live demo of the application [StackBuld-Ecommerce](https://stack-buld-ecom.vercel.app/).

## Conclusion
This project demonstrates the implementation of a modern E-commerce platform using Next.js, TypeScript, and Tailwind CSS, with a focus on SEO compliance, performance, and clean code practices. It provides a solid foundation for building scalable and maintainable web applications.

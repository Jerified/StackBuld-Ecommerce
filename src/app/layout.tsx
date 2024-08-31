import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stackbuld E-commerce",
  description: "A modern platform for listing, viewing, and managing products.",
  openGraph: {
    title: "Stackbuld E-commerce",
    description: "Explore and manage a wide range of products.",
    url: "https://stack-buld-ecom.vercel.app/",
    type: "website",
    images: [
      {
        url: "/product.png",
        width: 1200,
        height: 630,
        alt: "E-commerce Product Listing Platform",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full dark:bg-black bg-[#8599B6] dark:bg-dot-white/[0.2] bg-dot-black/[0.7] flex items-center justify-center inset-0`}
      >
        <div className="mx-auto max-w-7xl">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}

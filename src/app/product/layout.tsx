"use client"

import { Inter } from "next/font/google";
import "../../app/globals.css";
import { IoArrowBack } from "react-icons/io5"
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const router = useRouter()
  return (
      <section>
        <button className="my-4 -mb-24 border px-3 py-1 rounded-md" onClick={() => router.back()}>
            <IoArrowBack className="text-xl" />
        </button>
            {children}
      </section>
  );
}

'use client'
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Hero from "@/app/components/project/Hero";

const page = () => {

    const cards = [
        { title: 'Blog', href: '/blog' },
        { title: 'Code Academy', href: '/code-blocks' },
        { title: 'Products', href: '#products' },
    ];

    const [products, setProducts] = useState<any[]>([]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
            const productsData = await res.json();
            setProducts(productsData);
        };
        fetchProducts();
    }, []);
    return (
        <div>
            <Hero bgImg="https://picsum.photos/1920/1000" title="Welcome to SpectrumStack App" subTitle="Home Page" content=" This is a React application with Tailwind CSS" />


            <div className="py-10 lg:py-20">
                <div className="container-fluid">
                    <div className="grid grid-col-2 md:grid-cols-3 gap-5">
                        {cards.map((card, index) => (
                            <div className="w-full" key={index}>
                                <Link className="card w-full p-8 bg-white/10 border border-[#ccc] rounded-xl" href={card.href} >
                                    <h2 className="card-title text-white mb-0">{card.title}</h2>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pb-10 lg:pb-20">
                <div className="container-fluid">

                    <h2>Product Page</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 flex-wrap">
                        {products.map((product) => (
                            <div className="w-full" key={product.id}>
                                <Link className="group flex flex-col h-full bg-white/[0.035] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/25 overflow-hidden" href={`/products/${product.id}`} >
                                    <div className="relative w-full h-50 mb-4 rounded-xl overflow-hidden bg-white/5">
                                        <Image className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" src={product.image} alt="Product" fill unoptimized />
                                    </div>
                                    <div className="flex flex-col grow">
                                        <div className="flex justify-between mb-5">
                                            <div className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">{product.id}</div>
                                            <div className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 capitalize">{product.category}</div>
                                            <div className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">{product.price} $</div>
                                        </div>
                                        <div className="mt-auto">
                                            <h5 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">{product.title}</h5>
                                            <p className="text-xs sm:text-sm text-white/65 line-clamp-2 mt-2 mb-4 leading-relaxed">{product.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
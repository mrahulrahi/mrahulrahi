'use client'
import { useEffect, useState } from "react";
import Link from 'next/link';
import Hero from "@/app/components/project/Hero";

const page = () => {

    const cards = [
        { title: 'Blog', href: '/blog' },
        { title: 'Code Stack', href: '/code-stack' },
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
                    <div className="grid grid-col-2 md:grid-cols-4 gap-5">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 flex-wrap">
                        {products.map((product) => (
                            <div className="w-full" key={product.id}>
                                <Link className="card flex flex-col h-full bg-white/10 border border-[#ccc] rounded-xl overflow-hidden" href={`/products/${product.id}`} >
                                    <div className="w-full h-[300px] aspect-square bg-white p-6">
                                        <img className="w-full h-full object-contain" src={product.image} alt="Product" />
                                    </div>
                                    <div className="flex flex-col p-5 grow">
                                        <div className="flex justify-between mb-5">
                                            <div className="badge text-bg-dark">{product.id}</div>
                                            <div className="badge text-bg-dark capitalize">{product.category}</div>
                                            <div className="badge text-bg-dark">{product.price} $</div>
                                        </div>
                                        <div className="mt-auto">
                                            <h5 className="card-title text-white line-clamp-2">{product.title}</h5>
                                            <p className="card-text line-clamp-3">{product.description}</p>
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
import React from 'react';
import Link from 'next/link';
import Hero from '@/app/components/project/Hero';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  let product: Product | null = null;
  let errorMsg = '';

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      throw new Error('Product not found');
    }
    product = await res.json();
  } catch (err) {
    errorMsg = 'Could not load product details. Please try again later.';
  }

  if (errorMsg || !product) {
    return (
      <>
        <Hero 
          title="Error Loading Product" 
          subTitle="Product Detail Page" 
          gradientColor={{ backgroundImage: 'linear-gradient(to right, #ef4444, #f87171)' }}
        />
        <div className="py-20 text-center max-w-xl mx-auto px-4">
          <p className="text-red-400 mb-6 font-mono">{errorMsg || 'Product not found.'}</p>
          <Link href="/code-stack" className="btn btn-primary">Back to Spectrum Stack</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero 
        title={product.title} 
        subTitle={`Category: ${product.category}`} 
        gradientColor={{ backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)' }}
      />
      
      <div className="py-12 lg:py-20 max-w-6xl mx-auto px-4">
        <Link href="/code-stack" className="btn btn-outline btn-sm mb-8 text-white">
          ← Back to Catalog
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Image Frame */}
          <div className="md:col-span-5 bg-white p-8 rounded-2xl border border-slate-800 shadow-inner flex justify-center items-center h-[400px]">
            <img 
              className="max-h-full max-w-full object-contain" 
              src={product.image} 
              alt={product.title} 
            />
          </div>

          {/* Right Column: Details Pane */}
          <div className="md:col-span-7 space-y-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="badge badge-accent uppercase tracking-wider text-[10px] font-bold py-1 px-3">
                {product.category}
              </span>
              {product.rating && (
                <span className="text-amber-400 text-sm font-semibold font-mono">
                  ★ {product.rating.rate} ({product.rating.count} reviews)
                </span>
              )}
            </div>

            <h1 className="text-3xl font-display font-bold text-white leading-tight">
              {product.title}
            </h1>

            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 font-mono">
              ${product.price.toFixed(2)}
            </div>

            <div className="border-t border-slate-800 pt-6">
              <h3 className="text-slate-400 font-mono text-xs uppercase tracking-wider mb-2">Description</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800 flex gap-4">
              <button className="btn btn-primary btn-lg flex-1">
                Add to Cart
              </button>
              <button className="btn btn-secondary btn-lg flex-1">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Hero from "@/app/components/project/Hero";

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // Fetch blogs using React Query
  const fetchBlogs = async (page) => {
    const res = await fetch(
      `https://dev.to/api/articles?per_page=${limit}&page=${page}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch articles (${res.status})`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  };

  const { data: blogs = [], isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['blogs', currentPage],
    queryFn: () => fetchBlogs(currentPage),
    placeholderData: keepPreviousData,
  });

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  // Dev.to doesn't provide a public x-total-count header, so estimate total pages dynamically.
  // If the current page returns fewer than the limit, we've reached the last page.
  const hasMore = blogs.length === limit;
  const pageCount = Math.max(1, !hasMore ? currentPage : Math.max(10, currentPage + 4));

  return (
    <>
      <Hero bgImg="https://picsum.photos/1920/1000?random=3" title="From the blog" subTitle="Blog" />

      <div className="py-10 lg:py-20">
        <div className="container-fluid max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(limit)].map((_, i) => (
                <div key={i} className="card p-5 lg:p-8 bg-white/5 border border-white/10 rounded-xl animate-pulse">
                  <div className="w-full h-52 bg-white/10 rounded-2xl mb-5" />
                  <div className="h-6 bg-white/10 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-white/10 rounded w-full mb-2" />
                  <div className="h-4 bg-white/10 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="py-20 text-center text-red-400">
              <p className="text-xl font-semibold mb-2">Failed to load articles</p>
              <p className="text-sm opacity-80">{error?.message || "Please try again later."}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="py-20 text-center text-white/60">
              <p className="text-xl font-semibold">No articles found.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${isFetching ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
              {blogs.map((blog, index) => {
                const imageUrl = blog.cover_image || blog.social_image || `https://placehold.co/800x450/18181b/ffffff.png?text=${encodeURIComponent(blog.title || 'Blog')}`;
                const articleNumber = (currentPage - 1) * limit + (index + 1);

                return (
                  <div className="w-full" key={blog.id}>
                    <Link
                      className="card flex flex-col h-full p-5 lg:p-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 rounded-xl transition-all duration-300 hover:-translate-y-1 group shadow-lg shadow-black/20"
                      href={`/blog/${blog.id}`}
                    >
                      <div className="image-section relative w-full h-52 mb-5 rounded-2xl overflow-hidden bg-white/5">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={imageUrl}
                          alt={blog.title || "Blog cover"}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/800x450/18181b/ffffff.png?text=Blog`;
                          }}
                        />
                      </div>
                      <div className="badge badge-primary mb-2 text-xs font-mono font-semibold">
                        #{articleNumber}
                      </div>
                      <h3 className="card-title text-white capitalize line-clamp-2 text-lg lg:text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="card-text text-white/70 line-clamp-3 text-sm mt-2 mb-4 leading-relaxed">
                        {blog.description}
                      </p>
                      <div className="card-actions justify-start mt-auto pt-2">
                        <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read More →
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* React Paginate Navigation */}
          {!isLoading && !isError && blogs.length > 0 && (
            <div className="flex flex-col items-center justify-center gap-3 mt-10 lg:mt-16">
              <ReactPaginate
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                forcePage={currentPage - 1}
                previousLabel={
                  <span className="flex items-center gap-1 font-semibold text-xs tracking-wider">
                    ‹ Prev
                  </span>
                }
                nextLabel={
                  <span className="flex items-center gap-1 font-semibold text-xs tracking-wider">
                    Next ›
                  </span>
                }
                breakLabel={"..."}
                containerClassName={"join flex items-center justify-center flex-wrap gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl"}
                pageClassName={"join-item btn btn-sm btn-ghost p-0 min-w-9 h-9 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all overflow-hidden"}
                pageLinkClassName={"w-full h-full flex items-center justify-center px-3 py-1.5 select-none font-medium"}
                previousClassName={"join-item btn btn-sm btn-ghost p-0 min-w-16 h-9 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all overflow-hidden"}
                previousLinkClassName={"w-full h-full flex items-center justify-center px-3 py-1.5 select-none"}
                nextClassName={"join-item btn btn-sm btn-ghost p-0 min-w-16 h-9 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all overflow-hidden"}
                nextLinkClassName={"w-full h-full flex items-center justify-center px-3 py-1.5 select-none"}
                breakClassName={"join-item btn btn-sm btn-ghost p-0 min-w-9 h-9 rounded-xl text-white/50 pointer-events-none"}
                breakLinkClassName={"w-full h-full flex items-center justify-center px-2"}
                activeClassName={"btn-active !bg-emerald-400 !text-black !border-emerald-400 font-bold shadow-md shadow-emerald-400/30 scale-105"}
                activeLinkClassName={"!text-black font-bold"}
                disabledClassName={"opacity-30 pointer-events-none cursor-not-allowed"}
                disabledLinkClassName={"cursor-not-allowed"}
                renderOnZeroPageCount={null}
              />
              <span className="text-xs text-white/50 font-mono tracking-wider">
                Page {currentPage} of {pageCount} {isFetching && '• Loading...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
'use client';

import { useState, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Hero from "@/app/components/project/Hero";
import { useGradient } from "@/app/context/GradientContext";
import { 
  Search, 
  X, 
  Calendar, 
  Clock, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  TrendingUp,
  Filter
} from "lucide-react";

// Curated popular Dev.to tech tags for quick filtering
const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "react", label: "React" },
  { id: "javascript", label: "JavaScript" },
  { id: "nextjs", label: "Next.js" },
  { id: "webdev", label: "Web Dev" },
  { id: "css", label: "CSS & UI" },
  { id: "ai", label: "AI & ML" },
  { id: "python", label: "Python" },
  { id: "devops", label: "DevOps" },
];

const BlogPage = () => {
  const { gradientStyle } = useGradient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // 'latest' | 'popular'

  // Fetch 10 per page so on Page 1 we can feature 1 post and show 9 in the grid
  const limit = 10;

  const fetchBlogs = async (page, category) => {
    let url = `https://dev.to/api/articles?per_page=${limit}&page=${page}`;
    if (category && category !== "all") {
      url += `&tag=${encodeURIComponent(category)}`;
    }

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch articles (${res.status})`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  };

  const { data: rawBlogs = [], isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['blogs', currentPage, selectedCategory],
    queryFn: () => fetchBlogs(currentPage, selectedCategory),
    placeholderData: keepPreviousData,
  });

  // Client-side search and sort on the loaded page
  const processedBlogs = useMemo(() => {
    let list = [...rawBlogs];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((b) => 
        b.title?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q) ||
        b.user?.name?.toLowerCase().includes(q) ||
        (Array.isArray(b.tag_list) && b.tag_list.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort by reactions if 'popular'
    if (sortBy === "popular") {
      list.sort((a, b) => (b.positive_reactions_count || 0) - (a.positive_reactions_count || 0));
    }

    return list;
  }, [rawBlogs, searchQuery, sortBy]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    if (typeof window !== 'undefined') {
      const target = document.getElementById("articles-grid");
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }
    }
  };

  const hasMore = rawBlogs.length === limit;
  const pageCount = Math.max(1, !hasMore ? currentPage : Math.max(10, currentPage + 4));

  // Determine if we should show a featured spotlight post (first page, all category, no search)
  const showFeatured = currentPage === 1 && selectedCategory === "all" && !searchQuery.trim() && processedBlogs.length > 0;
  const featuredBlog = showFeatured ? processedBlogs[0] : null;
  const gridBlogs = showFeatured ? processedBlogs.slice(1) : processedBlogs;

  return (
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 pb-20">
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 opacity-20 blur-3xl pointer-events-none z-0"
        style={gradientStyle}
      />

      <div className="relative z-10">
        {/* Dynamic Hero Banner */}
        <Hero 
          title="Engineering & Web Insights" 
          subTitle="Dev Articles & Tutorials" 
          content="Curated technical articles, fullstack deep dives, architecture patterns, and thoughts on building modern web experiences."
          gradientColor={gradientStyle}
        />

        <div className="container-fluid max-w-7xl mx-auto px-4 sm:px-6 pt-10" id="articles-grid">
          {/* Controls Bar: Search, Category Filters, and Sort */}
          <div className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 mb-10 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, or author..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 text-sm text-white placeholder-white/40 outline-none transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Sort Switcher */}
              <div className="flex items-center gap-2 self-end md:self-auto">
                <span className="text-xs text-white/50 font-medium flex items-center gap-1">
                  <Filter size={13} />
                  Sort:
                </span>
                <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/10">
                  <button
                    onClick={() => setSortBy("latest")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      sortBy === "latest"
                        ? "bg-emerald-500 text-black font-semibold shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Latest
                  </button>
                  <button
                    onClick={() => setSortBy("popular")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                      sortBy === "popular"
                        ? "bg-emerald-500 text-black font-semibold shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <TrendingUp size={12} />
                    Popular
                  </button>
                </div>
              </div>
            </div>

            {/* Category / Topic Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                      isActive
                        ? "bg-emerald-400 text-black border-emerald-400 font-semibold shadow-lg shadow-emerald-400/20 scale-102"
                        : "bg-white/5 hover:bg-white/10 text-white/75 hover:text-white border-white/10 hover:border-white/20"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="space-y-8">
              {/* Featured Skeleton */}
              <div className="w-full h-80 rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
              {/* Grid Skeletons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card p-6 bg-white/5 border border-white/10 rounded-2xl animate-pulse space-y-4">
                    <div className="w-full h-48 bg-white/10 rounded-xl" />
                    <div className="h-4 bg-white/10 rounded w-1/4" />
                    <div className="h-6 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          ) : isError ? (
            <div className="py-20 text-center bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-xl font-semibold text-rose-400 mb-2">Failed to load articles</p>
              <p className="text-sm text-white/60 mb-6">{error?.message || "Please check your network or try again."}</p>
              <button 
                onClick={() => handleCategorySelect("all")} 
                className="btn btn-sm bg-emerald-400 text-black hover:bg-emerald-300 font-semibold border-none"
              >
                Reset Filters
              </button>
            </div>
          ) : processedBlogs.length === 0 ? (
            <div className="py-20 text-center bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
              <BookOpen size={40} className="mx-auto text-white/30" />
              <p className="text-xl font-semibold text-white">No articles matched your criteria</p>
              <p className="text-sm text-white/60 max-w-md mx-auto">
                Try searching with different keywords or switch back to the "All Topics" category.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="px-4 py-2 rounded-xl bg-emerald-400 text-black font-semibold text-xs hover:bg-emerald-300 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}>
              {/* Featured Spotlight Banner (When applicable) */}
              {featuredBlog && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-emerald-400" />
                    <span className="text-xs uppercase tracking-widest font-bold text-emerald-400 font-mono">
                      Featured Spotlight
                    </span>
                  </div>

                  <Link
                    href={`/blog/${featuredBlog.id}`}
                    className="group relative block rounded-3xl overflow-hidden bg-white/[0.035] hover:bg-white/[0.07] border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 shadow-2xl shadow-black/40"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10">
                      {/* Image Column */}
                      <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-black/40">
                        <img
                          src={featuredBlog.cover_image || featuredBlog.social_image || `https://placehold.co/1200x630/18181b/ffffff.png?text=Featured`}
                          alt={featuredBlog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                      </div>

                      {/* Content Column */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Tags */}
                          {Array.isArray(featuredBlog.tag_list) && featuredBlog.tag_list.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap mb-3">
                              {featuredBlog.tag_list.slice(0, 3).map((tag) => (
                                <span key={tag} className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-tight line-clamp-3">
                            {featuredBlog.title}
                          </h2>

                          <p className="mt-3 text-white/70 text-sm sm:text-base line-clamp-3 leading-relaxed">
                            {featuredBlog.description}
                          </p>
                        </div>

                        {/* Author & Meta Row */}
                        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-3">
                            {featuredBlog.user?.profile_image ? (
                              <img
                                src={featuredBlog.user.profile_image}
                                alt={featuredBlog.user.name}
                                className="w-10 h-10 rounded-full object-cover border border-white/20"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                <span className="text-xs text-emerald-400 font-bold">
                                  {featuredBlog.user?.name?.slice(0, 2) || "AU"}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-white leading-tight">{featuredBlog.user?.name}</p>
                              <div className="flex items-center gap-2 text-xs text-white/50 mt-0.5">
                                <span>{featuredBlog.readable_publish_date}</span>
                                {featuredBlog.reading_time_minutes && (
                                  <>
                                    <span>•</span>
                                    <span>{featuredBlog.reading_time_minutes} min read</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 text-black text-xs font-bold group-hover:bg-emerald-300 transition-colors">
                            <span>Read Story</span>
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid Section Heading if Featured is shown */}
              {featuredBlog && (
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    Latest Articles
                  </h3>
                  <span className="text-xs text-white/50 font-mono">
                    Page {currentPage} • {gridBlogs.length} Stories
                  </span>
                </div>
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridBlogs.map((blog, idx) => {
                  const imageUrl = blog.cover_image || blog.social_image || `https://placehold.co/800x450/18181b/ffffff.png?text=${encodeURIComponent(blog.title?.slice(0, 20) || 'Article')}`;
                  const tags = Array.isArray(blog.tag_list) 
                    ? blog.tag_list 
                    : typeof blog.tags === "string" 
                      ? blog.tags.split(",").map(t => t.trim()) 
                      : [];

                  return (
                    <article className="w-full" key={blog.id}>
                      <Link
                        href={`/blog/${blog.id}`}
                        className="group flex flex-col h-full bg-white/[0.035] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/25 overflow-hidden"
                      >
                        {/* Cover Image Container */}
                        <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-white/5">
                          <img
                            src={imageUrl}
                            alt={blog.title || "Article cover"}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = `https://placehold.co/800x450/18181b/ffffff.png?text=Article`;
                            }}
                          />
                          {/* Reading time overlay pill */}
                          {blog.reading_time_minutes && (
                            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-mono text-white/80 flex items-center gap-1 border border-white/10">
                              <Clock size={11} className="text-emerald-400" />
                              <span>{blog.reading_time_minutes}m</span>
                            </div>
                          )}
                        </div>

                        {/* Tags list */}
                        {tags.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                            {tags.slice(0, 2).map((t) => (
                              <span key={t} className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-white/65 line-clamp-2 mt-2 mb-4 leading-relaxed">
                          {blog.description}
                        </p>

                        {/* Bottom Meta & Author Footer */}
                        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                          <div className="flex items-center gap-2">
                            {blog.user?.profile_image ? (
                              <img
                                src={blog.user.profile_image}
                                alt={blog.user.name}
                                className="w-6 h-6 rounded-full object-cover border border-white/20"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                                {blog.user?.name?.slice(0, 1) || "A"}
                              </div>
                            )}
                            <span className="font-medium text-white/80 line-clamp-1 max-w-25 sm:max-w-30">
                              {blog.user?.name || "Author"}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {blog.positive_reactions_count > 0 && (
                              <div className="flex items-center gap-1 text-rose-400/90 font-mono">
                                <Heart size={12} className="fill-rose-400/30 text-rose-400" />
                                <span>{blog.positive_reactions_count}</span>
                              </div>
                            )}
                            <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                              Read →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* React Paginate Navigation */}
          {!isLoading && !isError && rawBlogs.length > 0 && (
            <div className="flex flex-col items-center justify-center gap-3 mt-12 lg:mt-16">
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
                Page {currentPage} of {pageCount} {isFetching && '• Refreshing...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
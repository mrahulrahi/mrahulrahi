'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/app/components/project/Hero";
import { useGradient } from "@/app/context/GradientContext";
import { ArrowLeft, Calendar, Clock, User, Tag, Heart, Share2, Check, ExternalLink } from "lucide-react";
import "./BlogArticle.css";

const SingleBlogPostPage = () => {
  const { gradientStyle } = useGradient();
  const { blogId } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fetchPost = async (id) => {
    // 1. Try Dev.to API first (matches articles listed on /blog)
    try {
      const res = await fetch(`https://dev.to/api/articles/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data && (data.title || data.id)) {
          return {
            id: data.id,
            title: data.title,
            body: data.body_markdown || data.description || '',
            body_html: data.body_html,
            cover_image: data.cover_image || data.social_image,
            date: data.readable_publish_date,
            url: data.url,
            reactions: data.positive_reactions_count || 0,
            tags: Array.isArray(data.tags) 
              ? data.tags 
              : typeof data.tags === 'string' 
                ? data.tags.split(',').map((t) => t.trim()) 
                : [],
            user: data.user ? {
              name: data.user.name,
              username: data.user.username,
              profile_image: data.user.profile_image,
              website_url: data.user.website_url,
            } : undefined,
            reading_time: data.reading_time_minutes,
          };
        }
      }
    } catch {
      // Continue to fallback
    }

    // 2. Fallback to JSONPlaceholder for dummy IDs (1-100)
    const resFallback = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (resFallback.ok) {
      const data = await resFallback.json();
      return {
        id: data.id,
        title: data.title,
        body: data.body,
      };
    }

    throw new Error('Article not found');
  };

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => fetchPost(blogId),
    enabled: !!blogId,
  });

  return (
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 pb-24 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-105 opacity-25 blur-3xl pointer-events-none z-0"
        style={gradientStyle}
      />

      <div className="container-fluid max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-all duration-200"
              title="Copy article link"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={15} />
                  <span>Share</span>
                </>
              )}
            </button>

            {post?.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-xs sm:text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-all duration-200"
                title="View original article on Dev.to"
              >
                <span>Dev.to</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="h-64 rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 animate-pulse space-y-4">
              <div className="h-6 bg-white/10 rounded w-1/3" />
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
              <div className="h-4 bg-white/10 rounded w-4/6" />
            </div>
          </div>
        ) : isError || !post ? (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-2">Article Not Found</h2>
            <p className="text-sm text-white/60 mb-6">{error?.message || "The requested article could not be loaded."}</p>
            <Link href="/blog" className="btn btn-primary btn-sm">
              Return to Blog
            </Link>
          </div>
        ) : (
          <>
            {/* Dynamic Hero Banner with Dynamic Gradient Background */}
            <Hero
              title={post.title}
              subTitle={post.reading_time ? `Dev.to Engineering • ${post.reading_time} min read` : `Tech Article`}
              gradientColor={gradientStyle}
            />

            {/* Article Content Container */}
            <div className="mt-8 relative z-10">
              <article className="card w-full p-6 sm:p-10 lg:p-12 bg-white/[0.035] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                {/* Meta info bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-xs sm:text-sm text-white/70">
                  <div className="flex items-center gap-4 flex-wrap">
                    {post.user && (
                      <div className="flex items-center gap-2 text-white font-medium">
                        {post.user.profile_image ? (
                          <img 
                            src={post.user.profile_image} 
                            alt={post.user.name} 
                            className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                            <User size={15} className="text-emerald-400" />
                          </div>
                        )}
                        <span>{post.user.name}</span>
                      </div>
                    )}

                    {post.date && (
                      <div className="flex items-center gap-1.5 text-white/60">
                        <Calendar size={14} className="text-emerald-400" />
                        <span>{post.date}</span>
                      </div>
                    )}

                    {post.reading_time && (
                      <div className="flex items-center gap-1.5 text-white/60">
                        <Clock size={14} className="text-emerald-400" />
                        <span>{post.reading_time} min read</span>
                      </div>
                    )}

                    {post.reactions > 0 && (
                      <div className="flex items-center gap-1.5 text-rose-400/90 font-mono">
                        <Heart size={14} className="fill-rose-400/30 text-rose-400" />
                        <span>{post.reactions}</span>
                      </div>
                    )}
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Tag size={13} className="text-emerald-400" />
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md bg-white/10 text-xs text-emerald-300 font-mono font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cover Image Feature if available */}
                {post.cover_image && (
                  <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black/40 max-h-115">
                    <img 
                      src={post.cover_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Article Body Content with Full Typography Styles */}
                {post.body_html ? (
                  <div 
                    className="blog-article-content"
                    dangerouslySetInnerHTML={{ __html: post.body_html }}
                  />
                ) : (
                  <div className="blog-article-content">
                    <p className="whitespace-pre-line text-lg leading-relaxed">
                      {post.body}
                    </p>
                  </div>
                )}

                {/* Article Bottom Footer Card */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/2 -mx-6 sm:-mx-10 lg:-mx-12 -mb-6 sm:-mb-10 lg:-mb-12 p-6 sm:p-8 rounded-b-2xl">
                  <div className="flex items-center gap-3">
                    {post.user?.profile_image && (
                      <img 
                        src={post.user.profile_image} 
                        alt={post.user?.name || "Author"} 
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50 font-bold">Published By</p>
                      <p className="text-sm font-semibold text-white">{post.user?.name || "Author"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/blog"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                    >
                      ← More Articles
                    </Link>

                    {post.url && (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <span>Discuss on Dev.to</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleBlogPostPage;

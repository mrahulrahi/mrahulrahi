'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/app/components/project/Hero";
import { useGradient } from "@/app/context/GradientContext";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";

const SingleBlogPostPage = () => {
  const { gradientStyle } = useGradient();
  const { blogId } = useParams();

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
            tags: Array.isArray(data.tags) ? data.tags : typeof data.tags === 'string' ? data.tags.split(',').map((t) => t.trim()) : [],
            user: data.user ? {
              name: data.user.name,
              profile_image: data.user.profile_image
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
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 pb-20 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-105 opacity-25 blur-3xl pointer-events-none  "
        style={gradientStyle}
      />

      <div className="container-fluid max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        {/* Navigation Bar */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back to All Articles</span>
          </Link>
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
              subTitle={`Article #${post.id}`}
              gradientColor={gradientStyle}
            />

            {/* Article Content Container */}
            <div className="mt-8 relative z-10">
              <article className="card w-full p-6 sm:p-10 lg:p-14 bg-white/4 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                {/* Meta info bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-xs sm:text-sm text-white/70">
                  <div className="flex items-center gap-4 flex-wrap">
                    {post.user && (
                      <div className="flex items-center gap-2 text-white font-medium">
                        {post.user.profile_image ? (
                          <img 
                            src={post.user.profile_image} 
                            alt={post.user.name} 
                            className="w-7 h-7 rounded-full object-cover border border-white/20"
                          />
                        ) : (
                          <User size={16} className="text-emerald-400" />
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
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Tag size={13} className="text-emerald-400" />
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-white/10 text-xs text-emerald-300 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Article Body */}
                {post.body_html ? (
                  <div 
                    className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/80 prose-p:leading-relaxed prose-a:text-emerald-400 hover:prose-a:underline prose-code:text-emerald-300 prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.body_html }}
                  />
                ) : (
                  <div className="text-white/80 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                    {post.body}
                  </div>
                )}
              </article>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleBlogPostPage;

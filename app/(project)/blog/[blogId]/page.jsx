'use client';

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/app/components/project/Hero";
import { useGradient } from "@/app/context/GradientContext";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Heart, 
  Share2, 
  Check, 
  ExternalLink,
  ArrowUp,
  Bookmark,
  List,
  Sparkles,
  Twitter,
  Linkedin,
  MessageSquare
} from "lucide-react";
import "./BlogArticle.css";

const SingleBlogPostPage = () => {
  const { gradientStyle } = useGradient();
  const { blogId } = useParams();
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [headings, setHeadings] = useState([]);
  const [tocOpen, setTocOpen] = useState(false);
  const articleContentRef = useRef(null);

  // Track scroll progress and scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = (title) => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Check out "${title}"`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
    }
  };

  const handleShareLinkedin = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
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
            comments_count: data.comments_count || 0,
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
              github_username: data.user.github_username,
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
        tags: ["tech", "guide"],
      };
    }

    throw new Error('Article not found');
  };

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => fetchPost(blogId),
    enabled: !!blogId,
  });

  // Fetch recommended / related articles based on first tag
  const primaryTag = post?.tags?.[0] || 'webdev';
  const { data: relatedPosts = [] } = useQuery({
    queryKey: ['related-blogs', primaryTag, post?.id],
    queryFn: async () => {
      try {
        const res = await fetch(`https://dev.to/api/articles?tag=${encodeURIComponent(primaryTag)}&per_page=4`);
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list)) {
            return list.filter(item => String(item.id) !== String(post?.id)).slice(0, 3);
          }
        }
      } catch {
        // Ignore fallback
      }
      return [];
    },
    enabled: !!post?.id,
  });

  // Sync like count when post loads
  useEffect(() => {
    if (post?.reactions !== undefined) {
      setLikeCount(post.reactions);
    }
  }, [post?.reactions]);

  const toggleLike = () => {
    if (!userLiked) {
      setUserLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setUserLiked(false);
      setLikeCount(prev => Math.max(0, prev - 1));
    }
  };

  // Inspect DOM when content changes to:
  // 1. Extract headings for Table of Contents
  // 2. Add "Copy Code" buttons to all <pre> blocks
  useEffect(() => {
    if (!articleContentRef.current) return;

    const container = articleContentRef.current;

    // 1. Extract H2 and H3 headings
    const headingElements = container.querySelectorAll("h2, h3");
    const extracted = [];
    headingElements.forEach((el, index) => {
      const text = el.textContent || "";
      if (text.trim()) {
        const id = el.id || `heading-${index}`;
        el.id = id;
        extracted.push({
          id,
          text,
          level: el.tagName.toLowerCase() === "h2" ? 2 : 3,
        });
      }
    });
    setHeadings(extracted);

    // 2. Attach copy button to every pre element
    const preBlocks = container.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      if (pre.querySelector(".blog-code-copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "blog-code-copy-btn";
      btn.innerHTML = `<span>Copy</span>`;
      btn.title = "Copy code snippet";

      btn.addEventListener("click", () => {
        const code = pre.querySelector("code")?.innerText || pre.innerText || "";
        navigator.clipboard.writeText(code).then(() => {
          btn.innerHTML = `<span>Copied!</span>`;
          btn.classList.add("copied");
          setTimeout(() => {
            btn.innerHTML = `<span>Copy</span>`;
            btn.classList.remove("copied");
          }, 2000);
        });
      });

      pre.style.position = "relative";
      pre.appendChild(btn);
    });
  }, [post?.body_html, post?.body]);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 pb-24 overflow-hidden">
      {/* Sticky Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 z-50 transition-all duration-100"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-105 opacity-25 blur-3xl pointer-events-none z-0"
        style={gradientStyle}
      />

      <div className="container-fluid max-w-4xl mx-auto px-4 sm:px-6 pt-6 relative z-10">
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back to All Articles</span>
          </Link>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-all duration-200"
              title="Copy article link"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
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
          <div className="py-24 text-center bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-rose-400 mb-2">Article Not Found</h2>
            <p className="text-sm text-white/60 mb-6">{error?.message || "The requested article could not be loaded."}</p>
            <Link href="/blog" className="btn btn-sm bg-emerald-400 text-black hover:bg-emerald-300 font-semibold border-none">
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
              <article className="card w-full p-6 sm:p-10 lg:p-12 bg-white/[0.035] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                {/* Meta info bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-xs sm:text-sm text-white/70">
                  <div className="flex items-center gap-4 flex-wrap">
                    {post.user && (
                      <div className="flex items-center gap-2.5 text-white font-medium">
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

                    {/* Interactive Like Counter */}
                    <button
                      onClick={toggleLike}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-200 border ${
                        userLiked 
                          ? "bg-rose-500/20 border-rose-500/40 text-rose-400 font-semibold"
                          : "bg-white/5 border-white/10 text-white/70 hover:text-rose-400 hover:border-rose-400/30"
                      }`}
                      title={userLiked ? "Unlike" : "Like this article"}
                    >
                      <Heart 
                        size={13} 
                        className={userLiked ? "fill-rose-500 text-rose-500 animate-pulse" : "text-rose-400"} 
                      />
                      <span>{likeCount}</span>
                    </button>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Tag size={13} className="text-emerald-400" />
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cover Image Feature if available */}
                {post.cover_image && (
                  <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black/40 max-h-120">
                    <img 
                      src={post.cover_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Collapsible Table of Contents if article has headings */}
                {headings.length >= 2 && (
                  <div className="mb-10 rounded-2xl bg-white/2.5 border border-white/10 p-5 backdrop-blur-md">
                    <button
                      onClick={() => setTocOpen(!tocOpen)}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-white hover:text-emerald-400 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <List size={16} className="text-emerald-400" />
                        <span>Table of Contents ({headings.length} sections)</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">
                        {tocOpen ? "Hide ▲" : "Show ▼"}
                      </span>
                    </button>

                    {tocOpen && (
                      <nav className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                        {headings.map((h, i) => (
                          <a
                            key={i}
                            href={`#${h.id}`}
                            className={`block text-xs leading-relaxed transition-colors hover:text-emerald-300 ${
                              h.level === 3 ? "pl-4 text-white/60" : "text-white/80 font-medium"
                            }`}
                          >
                            • {h.text}
                          </a>
                        ))}
                      </nav>
                    )}
                  </div>
                )}

                {/* Article Body Content with Full Typography & Code Block Enhancements */}
                <div ref={articleContentRef}>
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
                </div>

                {/* Social Share Bar */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-white/60">
                    <Sparkles size={14} className="text-emerald-400" />
                    <span>Share this insight:</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleShareTwitter(post.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] border border-white/10 text-xs font-medium text-white/80 transition-colors"
                      title="Share on X / Twitter"
                    >
                      <Twitter size={14} />
                      <span>Twitter / X</span>
                    </button>

                    <button
                      onClick={handleShareLinkedin}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] border border-white/10 text-xs font-medium text-white/80 transition-colors"
                      title="Share on LinkedIn"
                    >
                      <Linkedin size={14} />
                      <span>LinkedIn</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 text-xs font-medium text-white/80 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 size={14} />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Article Bottom Footer Card (Author spotlight) */}
                <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 bg-white/2 -mx-6 sm:-mx-10 lg:-mx-12 -mb-6 sm:-mb-10 lg:-mb-12 p-6 sm:p-8 rounded-b-3xl">
                  <div className="flex items-center gap-4">
                    {post.user?.profile_image ? (
                      <img 
                        src={post.user.profile_image} 
                        alt={post.user?.name || "Author"} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/40 shadow-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                        {post.user?.name?.slice(0, 1) || "A"}
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold font-mono">Published By</p>
                      <p className="text-base font-bold text-white leading-tight">{post.user?.name || "Author"}</p>
                      {post.user?.username && (
                        <p className="text-xs text-white/50">@{post.user.username} on Dev.to</p>
                      )}
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
                        <MessageSquare size={13} />
                        <span>Discuss on Dev.to</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </div>

            {/* Related / Recommended Articles Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">Keep Reading</span>
                    <h3 className="text-xl font-bold text-white mt-1">Related Technical Reads</h3>
                  </div>
                  <Link href="/blog" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold">
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.id}`}
                      className="group bg-white/3 hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        {related.cover_image && (
                          <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-white/5">
                            <img
                              src={related.cover_image}
                              alt={related.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                          {related.title}
                        </h4>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                        <span>{related.readable_publish_date}</span>
                        {related.reading_time_minutes && (
                          <span>{related.reading_time_minutes}m read</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Scroll to Top & Quick Action Pill */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-emerald-500 text-black font-bold shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 transition-all duration-300 hover:scale-110"
            title="Scroll to Top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleBlogPostPage;

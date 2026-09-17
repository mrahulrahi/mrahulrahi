import React from 'react';
import './BlogCardSkeleton.css';

export default function BlogCardSkeleton() {
  return (
    <div className="blog-skeleton-card" aria-hidden="true">
      {/* Image Skeleton */}
      <div className="blog-skeleton-img skeleton-shimmer" />

      {/* Title & Description Skeletons */}
      <div className="blog-skeleton-body">
        <div className="blog-skeleton-title-1 skeleton-shimmer" />
        <div className="blog-skeleton-title-2 skeleton-shimmer" />
        <div className="blog-skeleton-desc-1 skeleton-shimmer" />
        <div className="blog-skeleton-desc-2 skeleton-shimmer" />
      </div>

      {/* Meta info & Author Skeleton */}
      <div className="blog-skeleton-footer">
        <div className="blog-skeleton-meta">
          <div className="blog-skeleton-pill skeleton-shimmer" />
          <div className="blog-skeleton-pill skeleton-shimmer" />
        </div>
        <div className="blog-skeleton-author">
          <div className="blog-skeleton-avatar skeleton-shimmer" />
          <div className="blog-skeleton-author-name skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

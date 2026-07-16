'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, User, Clock, Tag, ChevronRight, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/common/Breadcrumb';
import CommonBanner from '@/components/courses/CommonBanner';
import { heroImage, thumbImage } from '@/_utils/cloudinaryImage';
import parse from 'html-react-parser';

function RelatedCard({ blog }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="flex gap-3 p-3 rounded-lg border border-[#e2e8f0] hover:shadow-md transition group bg-white"
    >
      {blog.featuredImage?.url && (
        <img
          src={thumbImage(blog.featuredImage.url)}
          alt={blog.title}
          className="w-16 h-16 rounded object-cover shrink-0"
        />
      )}
      <div className="min-w-0">
        <p className="text-[12px] text-[#eb5905] font-medium mb-1">{blog.category}</p>
        <h4 className="text-[13px] font-semibold text-[#222222] group-hover:text-[#eb5905] transition line-clamp-2 leading-snug">
          {blog.title}
        </h4>
        {blog.publishedAt && (
          <p className="text-[11px] text-[#77838f] mt-1">{format(new Date(blog.publishedAt), 'dd MMM yyyy')}</p>
        )}
      </div>
    </Link>
  );
}

export default function BlogDetailPage({ blog, related = [] }) {
  const publishedDate = blog.publishedAt ? format(new Date(blog.publishedAt), 'dd MMMM yyyy') : '';

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform) => {
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
    const title = encodeURIComponent(blog.title);
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(links[platform], '_blank', 'width=600,height=400');
  };

  // JSON-LD Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.shortDescription || blog.metaDescription,
    image: blog.featuredImage?.url || blog.ogImage,
    author: { '@type': 'Person', name: blog.author },
    publisher: {
      '@type': 'Organization',
      name: 'IPS Business School',
      logo: { '@type': 'ImageObject', url: 'https://www.ipsedu.in/images/main-ips-logo.png' },
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`,
    },
  };

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <CommonBanner
        pageTitle={blog.title}
        normalFont
        bgImageUrl="images/about/about-us.webp"
        position="object-center"
        page="BLOG_DETAIL"
      />
      <Breadcrumb pageName={blog.title} detailPage={[{ slug: 'blogs', title: 'Blogs' }]} />
      <article className="py-10 px-4 min-h-screen">
        <div className="max-w-[1202px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0]"
              >
                {/* Hero image */}
                {blog.featuredImage?.url && (
                  <div className="relative w-full h-full lg:max-h-[434px] overflow-hidden">
                    <img
                      src={heroImage(blog.featuredImage.url)}
                      alt={blog.featuredImage.alt || blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                )}

                <div className="p-[16px] md:p-8 lg:p-10">
                  {/* Category */}
                  <div className="mb-4">
                    <span className="inline-block bg-[#eb5905]/10 text-[#eb5905] text-[12px] font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-[20px] md:text-[30px] lg:text-[34px] font-bold text-[#222222] leading-snug mb-5 font-rubik">
                    {blog.title}
                  </h2>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#77838f] pb-6 mb-6 border-b border-[#f4f6f9]">
                    {publishedDate && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {publishedDate}
                      </span>
                    )}
                    {blog.author && (
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {blog.author}
                      </span>
                    )}
                    {blog.readingTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readingTime} min read
                      </span>
                    )}
                  </div>

                  {/* Short description */}
                  {blog.shortDescription && (
                    <p className="text-[15px] text-[#4a5568] leading-relaxed mb-6 font-medium border-l-4 border-[#eb5905] pl-4 bg-[#f8f9fa] py-3 rounded-r-lg">
                      {blog.shortDescription}
                    </p>
                  )}

                  {/* Content */}
                  <div className="blog-content prose prose-sm max-w-none">{parse(blog.content || '')}</div>

                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[#f4f6f9]">
                      <div className="flex flex-wrap items-center gap-2">
                        <Tag className="w-4 h-4 text-[#77838f]" />
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-[#f4f6f9] text-[#77838f] text-[12px] rounded-full border border-[#e2e8f0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Focus Keyword */}
                  {blog.focusKeyword && (
                    <div className="mt-4 flex items-center gap-2 flex-wrap">
                      <span className="text-[12px] font-semibold text-[#77838f]">Focus Keyword:</span>
                      <span className="px-3 py-1 bg-[#eb5905]/10 text-[#eb5905] text-[12px] font-medium rounded-full border border-[#eb5905]/20">
                        {blog.focusKeyword}
                      </span>
                    </div>
                  )}

                  {/* Share */}
                  <div className="mt-8 pt-6 border-t border-[#f4f6f9]">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#222222]">
                        <Share2 className="w-4 h-4" />
                        Share:
                      </span>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-8 h-8 bg-[#1877F2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition"
                        aria-label="Share on Facebook"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-8 h-8 bg-[#1DA1F2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition"
                        aria-label="Share on Twitter"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-8 h-8 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition"
                        aria-label="Share on LinkedIn"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Back link */}
              <div className="mt-6">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-[13px] text-[#77838f] hover:text-[#eb5905] transition"
                >
                  ← Back to all blogs
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Related */}
              {related.length > 0 && (
                <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
                  <h3 className="text-[15px] font-bold text-[#222222] mb-4 flex items-center gap-2">Related Blogs</h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <RelatedCard key={r._id} blog={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#2a3e61] to-[#1a2d4a] rounded-xl p-6 text-white">
                <h3 className="text-[16px] font-bold mb-2">Ready to Start?</h3>
                <p className="text-[13px] text-white/70 mb-4">Join IPS Business School and build your career.</p>
                <a
                  href="https://admissions.ipsedu.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#eb5905] hover:bg-[#d44f04] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition"
                >
                  Apply Now →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Content styles */}
      <style jsx global>{`
        .blog-content h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem;
          color: #222;
        }
        .blog-content h2 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem;
          color: #222;
        }
        .blog-content h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem;
          color: #222;
        }
        .blog-content p {
          margin: 0.75rem 0;
          line-height: 1.75;
          color: #4a5568;
          font-size: 15px;
        }
        .blog-content ul,
        .blog-content ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin: 0.35rem 0;
          line-height: 1.6;
          color: #4a5568;
          font-size: 15px;
        }
        .blog-content ul li {
          list-style-type: disc;
        }
        .blog-content ol li {
          list-style-type: decimal;
        }
        .blog-content strong {
          font-weight: 600;
          color: #222;
        }
        .blog-content em {
          font-style: italic;
        }
        .blog-content a {
          color: #eb5905;
          text-decoration: underline;
        }
        .blog-content blockquote {
          border-left: 4px solid #eb5905;
          padding-left: 1rem;
          color: #4a5568;
          font-style: italic;
          margin: 1rem 0;
          background: #f8f9fa;
          padding: 0.75rem 1rem;
          border-radius: 0 6px 6px 0;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        .blog-content th,
        .blog-content td {
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          text-align: left;
          font-size: 14px;
        }
        .blog-content th {
          background: #f4f6f9;
          font-weight: 600;
          color: #222;
        }
        .blog-content hr {
          border: none;
          border-top: 2px solid #e2e8f0;
          margin: 1.5rem 0;
        }
        .blog-content pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 13px;
          margin: 1rem 0;
        }
        .blog-content code {
          background: #f4f6f9;
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
          font-size: 13px;
          color: #eb5905;
        }
        .blog-content pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
      `}</style>
    </>
  );
}

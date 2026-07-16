'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Newspaper, CheckCircle2, Clock, PlusCircle, ArrowRight, TrendingUp, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

function StatCard({ icon: Icon, label, value, sub, color, href, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="block bg-white rounded-xl border border-[#e2e8f0] p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: color + '18' }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <ArrowRight className="w-4 h-4 text-[#77838f] opacity-0 group-hover:opacity-100 transition" />
        </div>
        <p className="text-[28px] font-bold text-[#222222] leading-tight mb-1">{value ?? '—'}</p>
        <p className="text-[13px] font-medium text-[#222222]">{label}</p>
        {sub && <p className="text-[12px] text-[#77838f] mt-0.5">{sub}</p>}
      </Link>
    </motion.div>
  );
}

function ActivityItem({ item, type }) {
  const isPublished = item.status === 'published';
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#f4f6f9] last:border-0">
      <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${isPublished ? 'bg-green-500' : 'bg-[#ff9e3d]'}`} />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-[#222222] truncate">{item.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
              isPublished ? 'bg-green-50 text-green-600' : 'bg-[#ff9e3d]/10 text-[#ff9e3d]'
            }`}
          >
            {isPublished ? 'Published' : 'Draft'}
          </span>
          <span className="text-[11px] text-[#77838f]">{type === 'blog' ? '📝 Blog' : '📰 News'}</span>
          <span className="text-[11px] text-[#77838f]">
            {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
          </span>
        </div>
      </div>
      <Link
        href={`/dashboard/${type === 'blog' ? 'blogs' : 'news'}/${item._id}/edit`}
        className="shrink-0 text-[11px] text-[#eb5905] hover:underline"
      >
        Edit
      </Link>
    </div>
  );
}

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [blogsRes, newsRes] = await Promise.all([
        fetch('/api/blog?limit=5&sort=-updatedAt'),
        fetch('/api/news?limit=5&sort=-updatedAt'),
      ]);

      const blogsData = await blogsRes.json();
      const newsData = await newsRes.json();

      const blogs = blogsData.success ? blogsData.data : { docs: [], totalDocs: 0, publishedCount: 0, draftCount: 0 };
      const news = newsData.success ? newsData.data : { docs: [], totalDocs: 0, publishedCount: 0, draftCount: 0 };

      setStats({
        totalBlogs: blogs.totalDocs ?? 0,
        publishedBlogs: blogs.publishedCount ?? 0,
        draftBlogs: blogs.draftCount ?? 0,
        totalNews: news.totalDocs ?? 0,
        publishedNews: news.publishedCount ?? 0,
        draftNews: news.draftCount ?? 0,
      });

      // Recent activity: merge and sort
      const recentBlogs = (blogs.docs || []).map((b) => ({ ...b, _type: 'blog' }));
      const recentNews = (news.docs || []).map((n) => ({ ...n, _type: 'news' }));
      const merged = [...recentBlogs, ...recentNews].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setActivity(merged.slice(0, 8));
    } catch (err) {
      console.error('Failed to fetch stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      icon: FileText,
      label: 'Total Blogs',
      value: stats?.totalBlogs,
      sub: 'All blog posts',
      color: '#eb5905',
      href: '/dashboard/blogs',
      delay: 0,
    },
    {
      icon: CheckCircle2,
      label: 'Published Blogs',
      value: stats?.publishedBlogs,
      sub: 'Live on website',
      color: '#10b981',
      href: '/dashboard/blogs?status=published',
      delay: 0.06,
    },
    {
      icon: Clock,
      label: 'Draft Blogs',
      value: stats?.draftBlogs,
      sub: 'Pending publish',
      color: '#f59e0b',
      href: '/dashboard/blogs?status=draft',
      delay: 0.12,
    },
    {
      icon: Newspaper,
      label: 'Campus News',
      value: stats?.totalNews,
      sub: 'All news articles',
      color: '#2a3e61',
      href: '/dashboard/news',
      delay: 0.18,
    },
    {
      icon: CheckCircle2,
      label: 'Published News',
      value: stats?.publishedNews,
      sub: 'Live on website',
      color: '#10b981',
      href: '/dashboard/news?status=published',
      delay: 0.24,
    },
    {
      icon: Clock,
      label: 'Draft News',
      value: stats?.draftNews,
      sub: 'Pending publish',
      color: '#f59e0b',
      href: '/dashboard/news?status=draft',
      delay: 0.3,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#222222] font-rubik">Dashboard</h1>
          <p className="text-[13px] text-[#77838f] mt-0.5">Welcome back. Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-[12px] text-[#77838f] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Bottom row: Quick actions + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.36 }}
          className="bg-white rounded-xl border border-[#e2e8f0] p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#eb5905]" />
            <h2 className="text-[14px] font-bold text-[#222222]">Quick Actions</h2>
          </div>
          <div className="space-y-2.5">
            <Link
              href="/dashboard/blogs/create"
              className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-[#eb5905]/40 hover:bg-[#eb5905]/5 hover:border-[#eb5905] transition group"
            >
              <PlusCircle className="w-4 h-4 text-[#eb5905]" />
              <span className="text-[13px] font-medium text-[#222222] group-hover:text-[#eb5905] transition">
                New Blog Post
              </span>
            </Link>
            <Link
              href="/dashboard/news/create"
              className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-[#2a3e61]/40 hover:bg-[#2a3e61]/5 hover:border-[#2a3e61] transition group"
            >
              <PlusCircle className="w-4 h-4 text-[#2a3e61]" />
              <span className="text-[13px] font-medium text-[#222222] group-hover:text-[#2a3e61] transition">
                New Campus News
              </span>
            </Link>
            <Link
              href="/dashboard/blogs"
              className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-200 hover:bg-[#f4f6f9] transition"
            >
              <FileText className="w-4 h-4 text-[#77838f]" />
              <span className="text-[13px] font-medium text-[#77838f]">Manage Blogs</span>
            </Link>
            <Link
              href="/dashboard/news"
              className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-200 hover:bg-[#f4f6f9] transition"
            >
              <Newspaper className="w-4 h-4 text-[#77838f]" />
              <span className="text-[13px] font-medium text-[#77838f]">Manage News</span>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.42 }}
          className="lg:col-span-2 bg-white rounded-xl border border-[#e2e8f0] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-bold text-[#222222]">Recent Activity</h2>
            <div className="flex gap-2">
              <Link href="/dashboard/blogs" className="text-[12px] text-[#eb5905] hover:underline">
                Blogs
              </Link>
              <span className="text-[#e2e8f0]">|</span>
              <Link href="/dashboard/news" className="text-[12px] text-[#eb5905] hover:underline">
                News
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse flex gap-3 py-2">
                  <div className="w-2 h-2 bg-gray-200 rounded-full mt-1.5 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : activity.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[13px] text-[#77838f]">No content yet.</p>
              <Link
                href="/dashboard/blogs/create"
                className="text-[13px] text-[#eb5905] hover:underline mt-1 inline-block"
              >
                Create your first blog post →
              </Link>
            </div>
          ) : (
            <div>
              {activity.map((item) => (
                <ActivityItem key={item._id} item={item} type={item._type} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

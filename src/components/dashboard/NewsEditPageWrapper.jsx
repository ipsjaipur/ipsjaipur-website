'use client';

import { useState, useEffect, use } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import PostForm from './PostForm';

export default function NewsEditPageWrapper({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/news/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message || 'Not found');
        setData(json.data);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-[#eb5905] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-[14px] text-[#222222] font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return <PostForm type="news" initialData={data} id={id} />;
}

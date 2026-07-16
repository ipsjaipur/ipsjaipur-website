import { getMetaDataStatic } from '@/_services/seoService';
import BlogsListPage from '@/components/blogs/BlogsListPage';

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: 'Blogs | IPS Business School - Business, Management & Career Insights',
    description:
      'Read the latest blogs from IPS Business School on business, management, career, MBA, BBA, BCA and more.',
    meta_keywords: 'IPS Business School blogs, MBA blogs, BBA blogs, management articles',
    slug: 'blogs',
  });
}

export default function BlogsPage() {
  return <BlogsListPage />;
}

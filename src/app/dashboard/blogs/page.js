export const metadata = {
  title: 'Blogs | IPS Admin',
  robots: { index: false, follow: false },
};

import BlogListPage from '@/components/dashboard/BlogListPage';

export default function DashboardBlogsPage() {
  return <BlogListPage />;
}

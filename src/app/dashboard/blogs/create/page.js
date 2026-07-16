export const metadata = {
  title: 'Create Blog | IPS Admin',
  robots: { index: false, follow: false },
};

import BlogCreatePage from '@/components/dashboard/BlogCreatePage';

export default function DashboardBlogCreatePage() {
  return <BlogCreatePage />;
}

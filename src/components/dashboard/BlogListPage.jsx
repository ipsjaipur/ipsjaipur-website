import { Suspense } from 'react';
import PostList from './PostList';
export default function BlogListPage() {
  return (
    <Suspense>
      <PostList type="blog" />
    </Suspense>
  );
}

import { Suspense } from 'react';
import PostList from './PostList';
export default function NewsListPage() {
  return (
    <Suspense>
      <PostList type="news" />
    </Suspense>
  );
}

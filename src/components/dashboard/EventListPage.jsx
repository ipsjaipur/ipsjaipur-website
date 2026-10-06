import { Suspense } from 'react';
import PostList from './PostList';

export default function EventListPage() {
  return (
    <Suspense>
      <PostList type="event" />
    </Suspense>
  );
}

import BlogDetailPage from '@/components/blogs/BlogDetailPage';
import { notFound } from 'next/navigation';
import { getMetaDataDynamic } from '@/_services/seoService';
import { getBlogWithRelated } from '@/_services/dataService';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const result = await getBlogWithRelated(slug);
    return getMetaDataDynamic({
      content: result?.blog ?? null,
      pathPrefix: 'blogs',
      fallbackTitle: 'Blog Post | IPS Business School',
    });
  } catch {
    return { title: 'Blog Post | IPS Business School' };
  }
}

export default async function BlogSlugPage({ params }) {
  const { slug } = await params;

  try {
    const result = await getBlogWithRelated(slug);
    if (!result) notFound();

    return <BlogDetailPage blog={result.blog} related={result.related} />;
  } catch {
    notFound();
  }
}

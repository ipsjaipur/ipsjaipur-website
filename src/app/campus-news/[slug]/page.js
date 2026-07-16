import NewsDetailPage from '@/components/campus-news/NewsDetailPage';
import { notFound } from 'next/navigation';
import { getMetaDataDynamic } from '@/_services/seoService';
import { getNewsWithRelated } from '@/_services/dataService';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const result = await getNewsWithRelated(slug);
    return getMetaDataDynamic({
      content: result?.news ?? null,
      pathPrefix: 'campus-news',
      fallbackTitle: 'Campus News | IPS Business School',
    });
  } catch {
    return { title: 'Campus News | IPS Business School' };
  }
}

export default async function NewsSlugPage({ params }) {
  const { slug } = await params;

  try {
    const result = await getNewsWithRelated(slug);
    if (!result) notFound();

    return <NewsDetailPage news={result.news} related={result.related} />;
  } catch {
    notFound();
  }
}

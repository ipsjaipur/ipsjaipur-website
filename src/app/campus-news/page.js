import { getMetaDataStatic } from '@/_services/seoService';
import CampusNewsListPage from '@/components/campus-news/CampusNewsListPage';

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: 'Campus News | IPS Business School - Latest Updates',
    description:
      'Stay updated with the latest campus news, placements, events and achievements from IPS Business School, Jaipur.',
    meta_keywords: 'IPS campus news, IPS placements news, IPS events, IPS Business School updates',
    slug: 'campus-news',
  });
}

export default function CampusNewsPage() {
  return <CampusNewsListPage />;
}

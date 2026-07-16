import { getMetaDataStatic } from '@/_services/seoService';
import MainAntiRagging from '@/components/courses/anti-ragging/MainAntiRagging';

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: 'Anti Ragging Policy - IPS Business School Jaipur',
    description:
      'Anti Ragging - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    keywords: 'Anti Ragging - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    slug: 'anti-ragging',
  });
}

export default function AntiRaggingPage() {
  return (
    <>
      <MainAntiRagging />
    </>
  );
}

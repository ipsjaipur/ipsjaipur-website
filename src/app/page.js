export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import MainHome from "@/components/home/MainHome";
import { getNewsByCategory, getLatestBlogs, getHomePageContent } from "@/_services/dataService";

export async function generateMetadata() {
  return await getMetaDetails('/');
}

export default async function Home() {
  const [placementsNews, ipsNews, blogs, homeContent] = await Promise.all([
    getNewsByCategory('Placement News', 6),
    getNewsByCategory('IPS News', 2),
    getLatestBlogs(4),
    getHomePageContent(),
  ]);

  return (
    <MainHome
      placementsNews={JSON.parse(JSON.stringify(placementsNews))}
      ipsNews={JSON.parse(JSON.stringify(ipsNews))}
      blogs={JSON.parse(JSON.stringify(blogs))}
      homeContent={JSON.parse(JSON.stringify(homeContent))}
    />
  );
}

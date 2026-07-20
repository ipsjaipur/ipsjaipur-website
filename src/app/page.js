import { getMetaDetails } from "@/_services/seoService";
import MainHome from "@/components/home/MainHome";
import { getNewsByCategory, getLatestBlogs } from "@/_services/dataService";

export async function generateMetadata() {
  return await getMetaDetails('/');
}

export default async function Home() {
  const [placementsNews, ipsNews, blogs] = await Promise.all([
    getNewsByCategory('Placement News', 6),
    getNewsByCategory('IPS News', 2),
    getLatestBlogs(4),
  ]);

  return (
    <MainHome
      placementsNews={JSON.parse(JSON.stringify(placementsNews))}
      ipsNews={JSON.parse(JSON.stringify(ipsNews))}
      blogs={JSON.parse(JSON.stringify(blogs))}
    />
  );
}

import { getMetaDataStatic } from "@/_services/seoService";
import MainHome from "@/components/home/MainHome";
import { getNewsByCategory, getLatestBlogs } from "@/_services/dataService";

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: "Best Career Opportunities with Top Business Schools in Jaipur",
    description: "Looking for the top business schools in Jaipur? Discover industry-oriented management education, expert faculty, practical learning, and career-focused programs designed to help students build a successful future in business and management.",
    meta_keywords: "top business schools in jaipur",
    slug: "/", // Empty slug for home page
  });
}

export default async function Home() {
  // Fetch data from database
  const [placementsNews, ipsNews, blogs] = await Promise.all([
    getNewsByCategory('Placement News', 6),
    getNewsByCategory('IPS News', 2),
    getLatestBlogs(4),
  ]);

  return (
    <>
      <MainHome
        placementsNews={JSON.parse(JSON.stringify(placementsNews))}
        ipsNews={JSON.parse(JSON.stringify(ipsNews))}
        blogs={JSON.parse(JSON.stringify(blogs))}
      />
    </>
  );
}

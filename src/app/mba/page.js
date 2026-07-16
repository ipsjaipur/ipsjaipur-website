import { getMetaDataStatic } from "@/_services/seoService";
import MainMBACourse from "@/components/courses/mba/MainMBACourse";

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: "MBA College in Jaipur with Practical Learning & Expert Faculty",
    description: "Looking for the best MBA college in Jaipur? Explore industry-oriented management programs, expert faculty, practical learning, and strong career opportunities designed to help students succeed in today’s competitive business world.",
    meta_keywords: "MBA college in Jaipur",
    slug: "mba", // Empty slug for home page
  });
}

export default function MbaPage() {
  return (
    <>
      <MainMBACourse />
    </>
  );
}

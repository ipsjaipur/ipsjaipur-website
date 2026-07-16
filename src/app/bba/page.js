import { getMetaDataStatic } from "@/_services/seoService";
import MainBBACourse from "@/components/courses/bba/MainBBACourse";

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: "Start Your Management Career with Leading BBA Colleges in Jaipur",
    description: "Looking for the best BBA colleges in Jaipur? Discover industry-oriented business education, experienced faculty, practical training, and career-focused programs designed to help students build strong management and leadership skills.",
    meta_keywords: "bba colleges in jaipur​ ",
    slug: "bba", // Empty slug for home page
  });
}

export default function BbaPage() {
  return (
    <>
      <MainBBACourse />
    </>
  );
}

import { getMetaDataStatic } from "@/_services/seoService";
import MainBCACourse from "@/components/courses/bca/MainBCACourse";


export async function generateMetadata() {
  return await getMetaDataStatic({
    title: "Best BCA College in Jaipur for Future IT Professionals",
    description: "Looking for the best BCA college in Jaipur? Discover industry-focused computer application programs, practical training, expert faculty, modern labs, and placement support designed to help students build successful careers in the IT industry.",
    meta_keywords: "Best BCA College in Jaipur",
    slug: "bca", // Empty slug for home page
  });
}

export default function BcaPage() {
  return (
    <>
      <MainBCACourse />
    </>
  );
}

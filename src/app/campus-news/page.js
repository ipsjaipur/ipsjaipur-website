import { getMetaDetails } from "@/_services/seoService";
import CampusNewsListPage from "@/components/campus-news/CampusNewsListPage";

export async function generateMetadata() {
  return await getMetaDetails('campus-news');
}

export default function CampusNewsPage() {
  return <CampusNewsListPage />;
}

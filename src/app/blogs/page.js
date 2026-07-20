import { getMetaDetails } from "@/_services/seoService";
import BlogsListPage from "@/components/blogs/BlogsListPage";

export async function generateMetadata() {
  return await getMetaDetails('blogs');
}

export default function BlogsPage() {
  return <BlogsListPage />;
}

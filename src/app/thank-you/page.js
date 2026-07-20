import { getMetaDetails } from "@/_services/seoService";
import ThankYouClient from "./ThankYouClient";

export async function generateMetadata() {
  return await getMetaDetails('thank-you');
}

export default function ThankYouPage() {
  return <ThankYouClient />;
}

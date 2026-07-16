import { getMetaDataStatic } from "@/_services/seoService";
import ComingSoon from "@/components/common/ComingSoon";


export async function generateMetadata() {
  const metadata = await getMetaDataStatic({
    title: "Events & Activities - IPS Business School | Campus Life",
    description: "Stay updated with the latest events, workshops, seminars, and cultural activities at IPS Business School. Join us for an enriching campus experience.",
    meta_keywords: "ips events, business school events, workshops, seminars, campus activities, student events",
    slug: "events",
  });

  // Add noindex, nofollow for coming soon pages
  return {
    ...metadata,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default function EventsPage() {
  return (
    <ComingSoon
      title="Events & Activities"
      subtitle="Exciting Campus Life Awaits"
      message="We're building an exciting events portal to showcase all the workshops, seminars, cultural activities, and networking opportunities at IPS. Check back soon!"
      showBackButton={true}
    />
  );
}

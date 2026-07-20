export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from "@/_services/seoService";
import ComingSoon from "@/components/common/ComingSoon";

export async function generateMetadata() {
  return await getMetaDetails('events');
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

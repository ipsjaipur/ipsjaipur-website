export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from '@/_services/seoService';
import MainBoardOfAdvisors from '@/components/boardOfAdvisors/MainBoardOfAdvisors';

export async function generateMetadata() {
  return await getMetaDetails('board-of-advisors');
}

export default function BoardOfAdvisorsPage() {
  return <MainBoardOfAdvisors />;
}

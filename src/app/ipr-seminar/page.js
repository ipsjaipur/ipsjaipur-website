import { getMetaDetails } from '@/_services/seoService';
import IprSeminarPage from '@/components/ipr-seminar/IprSeminarPage';


export async function generateMetadata() {
  return await getMetaDetails('ipr-seminar');
}


export default function IPRSeminar() {
  return <IprSeminarPage />;
}

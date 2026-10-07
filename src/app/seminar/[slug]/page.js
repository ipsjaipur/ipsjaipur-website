import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import IprSeminarPageContent from '@/models/IprSeminarPageContent';
import IprSeminarPageDark from '@/components/ipr-seminar/IprSeminarPageDark';
import IprSeminarPageLight from '@/components/ipr-seminar/IprSeminarPageLight';

async function getDataBySlug(slug) {
  try {
    await connectDB();

    // Validate the slug against the config document first
    const configDoc = await IprSeminarPageContent.findOne({
      section: 'config',
      slug,
    }).lean();

    if (!configDoc) return null;

    // Merge every section into one flat object
    const docs = await IprSeminarPageContent.find({}).lean();
    const merged = {};
    for (const doc of docs) {
      // eslint-disable-next-line no-unused-vars
      const { section, _id, __v, createdAt, updatedAt, ...fields } = doc;
      Object.assign(merged, fields);
    }
    return merged;
  } catch (err) {
    console.error('[SEMINAR/SLUG] DB error:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getDataBySlug(slug);

  if (!data) {
    return { title: 'Seminar Not Found | IPS Business School' };
  }

  const title = data.heroTitleLine1;
  const description = data.heroDescription;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default async function SeminarSlugPage({ params }) {
  const { slug } = await params;
  const data = await getDataBySlug(slug);

  if (!data) notFound();

  const theme = data?.theme ?? 'dark';

  if (theme === 'light') {
    return <IprSeminarPageLight data={data} />;
  }
  return <IprSeminarPageDark data={data} />;
}

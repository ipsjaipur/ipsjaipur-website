import ContactPageManager from '@/components/dashboard/contact-page/ContactPageManager';

export const metadata = {
  title: 'Contact Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

// In Next.js 15+, searchParams is a Promise — must be awaited
export default async function ContactContentPage({ searchParams }) {
  const params = await searchParams;
  const section = params?.section || null;
  return <ContactPageManager section={section} />;
}

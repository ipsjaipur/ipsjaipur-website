import connectDB from '@/lib/mongodb';
import PageSeo from '@/models/PageSeo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipsedu.in';
const APP_NAME = process.env.APP_NAME || 'IPS Business School';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/main-ips-logo.png`;

function buildMetadata(record) {
  const title = record.metaTitle;
  const description = record.metaDescription;
  const keywords = record.metaKeywords || '';
  const ogImage = record.ogImage || DEFAULT_OG_IMAGE;
  const robots = record.robots || 'index, follow';

  // Canonical — use stored value or auto-derive from slug
  const slug = record.pageSlug || '';
  let canonical = record.canonicalUrl || '';
  if (!canonical) {
    canonical =
      slug === '/' || slug === ''
        ? SITE_URL
        : `${SITE_URL}/${slug}`.replace(/\/+$/, '');
  }

  return {
    title,
    description,
    ...(keywords && { keywords }),
    robots,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      siteName: APP_NAME,
      url: canonical,
      type: 'website',
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ipsedu',
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function getMetaDetails(slug = '/') {
  try {
    await connectDB();
    const record = await PageSeo.findOne({ pageSlug: slug, isActive: true }).lean();
    if (record) {
      return buildMetadata(record);
    }
    // Record not found in DB — warn so it's visible in server logs
    console.warn(`[seoService] No active SEO record found for slug: "${slug}"`);
  } catch (err) {
    console.error(`[seoService] DB error for slug "${slug}":`, err?.message);
  }

  // Minimal fallback — site never hard-crashes even if DB is unreachable
  return {
    title: 'IPS - Institute of Professional Studies',
    description:
      'Empowering students with quality education and industry-ready skills.',
  };
}


export function getMetaDataDynamic({ content, pathPrefix, fallbackTitle }) {
  if (!content) {
    return { title: fallbackTitle || 'Content Not Found' };
  }

  const canonical = `${SITE_URL}/${pathPrefix}/${content.slug}`;
  const ogImage = content.ogImage || content.featuredImage?.url || DEFAULT_OG_IMAGE;

  return {
    title: content.metaTitle || content.title,
    description: content.metaDescription || content.shortDescription,
    keywords: content.metaKeywords || '',
    alternates: { canonical: content.canonicalUrl || canonical },
    openGraph: {
      title: content.metaTitle || content.title,
      description: content.metaDescription || content.shortDescription,
      url: content.canonicalUrl || canonical,
      type: 'article',
      publishedTime: content.publishedAt,
      modifiedTime: content.updatedAt,
      authors: [content.author],
      images: [{ url: ogImage, alt: content.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle || content.title,
      description: content.metaDescription || content.shortDescription,
      images: [ogImage],
    },
  };
}

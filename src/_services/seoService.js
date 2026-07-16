/**
 * Static metadata generator for pages with simple title/description/slug structure.
 * Use this for non-article pages (e.g., About, Courses, Contact).
 *
 * @param {Object} data - { title, description, slug?, meta_keywords? }
 * @returns {Promise<Object>} Next.js metadata object
 */
export const getMetaDataStatic = async (data) => {
  if (data) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipsedu.in';
    const appName = process.env.APP_NAME || 'IPS Business School';

    // Construct the canonical URL
    const canonicalUrl = data.slug
      ? `${siteUrl}/${data.slug}`.replace(/\/+$/, '') // Remove trailing slashes
      : siteUrl;

    const metadata = {
      title: data.title,
      description: data.description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: data.title,
        description: data.description,
        siteName: appName,
        url: canonicalUrl,
        type: 'website',
        images: ['https://www.ipsedu.in/images/main-ips-logo.png'],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ipsedu',
        title: data.title,
        description: data.description,
        images: ['https://www.ipsedu.in/images/main-ips-logo.png'],
      },
    };

    // Add keywords if provided
    if (data.meta_keywords) {
      metadata.keywords = data.meta_keywords;
    }

    return metadata;
  }

  // Return default metadata if no data provided
  return {
    title: 'IPS - Institute of Professional Studies',
    description: 'Empowering students with quality education and industry-ready skills.',
  };
};

/**
 * Dynamic metadata generator for article/blog/news content.
 * Use this for blog posts and news articles that have rich metadata.
 *
 * @param {Object} config
 * @param {Object} config.content - The blog/news document from MongoDB
 * @param {string} config.pathPrefix - URL path prefix (e.g., 'blogs', 'campus-news')
 * @param {string} config.fallbackTitle - Fallback title if content not found
 * @returns {Object} Next.js metadata object
 */
export const getMetaDataDynamic = ({ content, pathPrefix, fallbackTitle }) => {
  if (!content) {
    return { title: fallbackTitle || 'Content Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipsedu.in';
  const canonical = `${siteUrl}/${pathPrefix}/${content.slug}`;
  const ogImage =
    content.ogImage ||
    content.featuredImage?.url ||
    `${siteUrl}/images/main-ips-logo.png`;

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
};

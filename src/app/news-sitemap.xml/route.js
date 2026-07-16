import connectDB from '@/lib/mongodb';
import News from '@/models/News';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipsedu.in';

export async function GET() {
  await connectDB();

  // Fetch all published news
  const allNews = await News.find({ status: 'published' })
    .select('slug publishedAt updatedAt')
    .sort({ publishedAt: -1 })
    .limit(1000)
    .lean();

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/campus-news</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
${allNews
      .map(
        (news) => `  <url>
    <loc>${SITE_URL}/campus-news/${news.slug}</loc>
    <lastmod>${new Date(news.publishedAt || news.updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
      )
      .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}

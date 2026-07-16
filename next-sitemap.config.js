/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipsedu.in';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // generateIndexSitemap: false, // Disable sitemap-0.xml generation
  sitemapSize: 5000,

  exclude: [
    '/404',
    '/api/*',
    '/api-proxy/*',
    '/admin/*',
    '/dashboard/*',
    '/_next/*',
    '/events/*',
    '/thank-you',      // Form submission page - noindex
    '/privacy-policy', // Coming soon page - noindex
    '/terms-conditions', // Coming soon page - noindex
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/blog/wp-admin/admin-ajax.php'],
      },
      {
        userAgent: '*',
        disallow: [
          '/404',
          '/events/',
          '/thank-you',      // Form submission page
          '/privacy-policy', // Coming soon page
          '/terms-conditions', // Coming soon page
          '/api/',
          '/api-proxy/',
          '/_next/',
          '/admin/',
          '/dashboard/',
        ],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/blogs-sitemap.xml`,
      `${siteUrl}/news-sitemap.xml`,
    ],
  },

  transform: async (config, path) => {
    // Skip excluded paths
    if (
      path === '/thank-you' ||
      path === '/admin' ||
      path === '/dashboard' ||
      path === '/events' ||
      path.includes('/admin/') ||
      path.includes('/dashboard/') ||
      path === '/faq' ||
      path === '/blogs' ||
      path === '/campus-news'
    ) {
      return null;
    }

    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/courses')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (
      path.includes('/about') ||
      path.includes('/placements')
    ) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (
      path.includes('/contact') ||
      path.includes('/gallery')
    ) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (path.includes('/privacy-policy')) {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async (config) => {
    const staticPages = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/about', priority: 0.8, changefreq: 'monthly' },
      { path: '/mba', priority: 0.9, changefreq: 'weekly' },
      { path: '/bba', priority: 0.9, changefreq: 'weekly' },
      { path: '/bca', priority: 0.9, changefreq: 'weekly' },
      { path: '/placements', priority: 0.8, changefreq: 'weekly' },
      { path: '/contact', priority: 0.6, changefreq: 'monthly' },
      { path: '/career-ips-business-school', priority: 0.7, changefreq: 'weekly' },
      { path: '/scholarships', priority: 0.7, changefreq: 'monthly' },
      { path: '/infrastructure', priority: 0.6, changefreq: 'monthly' },
      { path: '/anti-ragging', priority: 0.4, changefreq: 'yearly' },
      { path: '/faculty', priority: 0.7, changefreq: 'monthly' },
      { path: '/student-life', priority: 0.7, changefreq: 'monthly' },
      { path: '/life-at-ips', priority: 0.7, changefreq: 'monthly' },
      { path: '/documents-required-for-education-loan', priority: 0.5, changefreq: 'yearly' },
    ];

    return staticPages.map((page) => ({
      loc: page.path,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: new Date().toISOString(),
    }));
  },
};

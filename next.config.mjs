import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */

const nextConfig = {
  turbopack: {
    root: __dirname,
  },

  serverExternalPackages: ['mongoose', 'mongodb'],
  env: {
    VERSION: "1.0.0",
    APP_NAME: "IPS Bussiness School",
    NEXT_PUBLIC_IMG_PATH: "/",

    // ─── URLs ─────────────────────────────────────────────────────
    PUBLIC_SITE_URL: "https://www.ipsedu.in/",
    NEXT_PUBLIC_SITE_URL: "https://www.ipsedu.in",
    DYNAMIC_IMG_BASE_PATH: "https://www.ipsedu.in",
  },

  // Allow images from Cloudinary and site domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ipsedu.in',
      },
    ],
  },

  // Redirects from old PHP pages to new pages
  async redirects() {
    return [
      // About pages
      {
        source: '/about.php',
        destination: '/about-us',
        permanent: true,
        statusCode: 301,
      },
      // Infrastructure
      {
        source: '/infrastructure.php',
        destination: '/infrastructure',
        permanent: true,
        statusCode: 301,
      },
      // Faculty
      {
        source: '/faculty.php',
        destination: '/faculty',
        permanent: true,
        statusCode: 301,
      },
      // Student life
      {
        source: '/student-life.php',
        destination: '/student-life',
        permanent: true,
        statusCode: 301,
      },

      // Course pages
      {
        source: '/mba.php',
        destination: '/mba',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/bba.php',
        destination: '/bba',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/bca.php',
        destination: '/bca',
        permanent: true,
        statusCode: 301,
      },

      // Scholarship
      {
        source: '/scholarship.php',
        destination: '/scholarship',
        permanent: true,
        statusCode: 301,
      },
      // Career
      {
        source: '/career-ips-business-school.php',
        destination: '/career-ips-business-school',
        permanent: true,
        statusCode: 301,
      },

      {
        source: '/documents-required-for-education-loan.php',
        destination: '/documents-required-for-education-loan',
        permanent: true,
        statusCode: 301,
      },
      // Anti-ragging
      {
        source: '/anti-ragging.php',
        destination: '/anti-ragging',
        permanent: true,
        statusCode: 301,
      },

      // Placements
      {
        source: '/placements.php',
        destination: '/placements',
        permanent: true,
        statusCode: 301,
      },

      // Contact
      {
        source: '/contact.php',
        destination: '/contact',
        permanent: true,
        statusCode: 301,
      },

      // Index redirect
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;

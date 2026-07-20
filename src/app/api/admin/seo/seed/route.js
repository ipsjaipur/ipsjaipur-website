import connectDB from '@/lib/mongodb';
import PageSeo from '@/models/PageSeo';
import { getAuthFromCookies } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/apiResponse';

/**
 * Exact original metadata from each page.js — these are the values that were
 * statically hardcoded before the DB-driven system was introduced.
 * The seed uses $setOnInsert so it NEVER overwrites records that already exist.
 */
const SEED_DATA = [
  {
    pageName: 'Home',
    pageSlug: '/',
    metaTitle: 'Best Career Opportunities with Top Business Schools in Jaipur',
    metaDescription:
      'Looking for the top business schools in Jaipur? Discover industry-oriented management education, expert faculty, practical learning, and career-focused programs designed to help students build a successful future in business and management.',
    metaKeywords: 'top business schools in jaipur',
    robots: 'index, follow',
  },
  {
    pageName: 'About Us',
    pageSlug: 'about',
    metaTitle: 'About Us - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA & BBA Jaipur',
    metaDescription:
      'About Us - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    metaKeywords: 'About Us - Top Ranked MBA & BBA College in Rajasthan | MBA & BBA Jaipur',
    robots: 'index, follow',
  },
  {
    pageName: 'MBA Course',
    pageSlug: 'mba',
    metaTitle: 'MBA College in Jaipur with Practical Learning & Expert Faculty',
    metaDescription:
      "Looking for the best MBA college in Jaipur? Explore industry-oriented management programs, expert faculty, practical learning, and strong career opportunities designed to help students succeed in today's competitive business world.",
    metaKeywords: 'MBA college in Jaipur',
    robots: 'index, follow',
  },
  {
    pageName: 'BBA Course',
    pageSlug: 'bba',
    metaTitle: 'Start Your Management Career with Leading BBA Colleges in Jaipur',
    metaDescription:
      'Looking for the best BBA colleges in Jaipur? Discover industry-oriented business education, experienced faculty, practical training, and career-focused programs designed to help students build strong management and leadership skills.',
    metaKeywords: 'bba colleges in jaipur',
    robots: 'index, follow',
  },
  {
    pageName: 'BCA Course',
    pageSlug: 'bca',
    metaTitle: 'Best BCA College in Jaipur for Future IT Professionals',
    metaDescription:
      'Looking for the best BCA college in Jaipur? Discover industry-focused computer application programs, practical training, expert faculty, modern labs, and placement support designed to help students build successful careers in the IT industry.',
    metaKeywords: 'Best BCA College in Jaipur',
    robots: 'index, follow',
  },
  {
    pageName: 'Contact Us',
    pageSlug: 'contact',
    metaTitle: 'Contact - Best MBA, BBA, BCA, B.Com College',
    metaDescription:
      'Get in touch with IPS BUSINESS SCHOOL today! Contact our expert team for admissions, program details, and career guidance.',
    metaKeywords: 'best mba college, best bba college, best bca college, best bcom college',
    robots: 'index, follow',
  },
  {
    pageName: 'Placements',
    pageSlug: 'placements',
    metaTitle: 'Placements - Best Placement College in Rajasthan | MBA / BBA/ BCA',
    metaDescription:
      'Transform your career prospects with IPS Business School exceptional placements. Connect with top recruiters and secure your dream job with IPS College',
    metaKeywords: 'best placement college in jaipur, top placement college, mba placement',
    robots: 'index, follow',
  },
  {
    pageName: 'Faculty',
    pageSlug: 'faculty',
    metaTitle: 'Faculty - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    metaDescription:
      'Faculty - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    metaKeywords:
      'Faculty - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    robots: 'index, follow',
  },
  {
    pageName: 'Infrastructure',
    pageSlug: 'infrastructure',
    metaTitle: 'About IPS Campus - Best Business School | Best Management College',
    metaDescription:
      'The IPS campus is spread over a large area with lush green lawns and possesses modern infrastructure. Best Management College In Jaipur',
    metaKeywords: 'best management college, mba college, bba college',
    robots: 'index, follow',
  },
  {
    pageName: 'Life at IPS',
    pageSlug: 'life-at-ips',
    metaTitle: 'Top Ranked MBA & BBA and BCA College in Rajasthan | MBA & BBA Jaipur',
    metaDescription:
      'Discover life at IPS Business School Jaipur. Experience a vibrant campus with cultural events, sports, and activities that shape well-rounded professionals.',
    metaKeywords: '',
    robots: 'index, follow',
  },
  {
    pageName: 'Student Life',
    pageSlug: 'student-life',
    metaTitle: 'Student Life - Life @ IPS Business School | Best Business School',
    metaDescription:
      "IPS's life is very vivacious as it is situated at a very peaceful and calm city Jaipur, popularly known as the pink city. Here students live their life absolutely.",
    metaKeywords: 'best mba college, best bba college, best bca college',
    robots: 'index, follow',
  },
  {
    pageName: 'Events',
    pageSlug: 'events',
    metaTitle: 'Events & Activities - IPS Business School | Campus Life',
    metaDescription:
      'Stay updated with the latest events, workshops, seminars, and cultural activities at IPS Business School. Join us for an enriching campus experience.',
    metaKeywords:
      'ips events, business school events, workshops, seminars, campus activities, student events',
    robots: 'index, follow',
  },
  {
    pageName: 'Scholarships',
    pageSlug: 'scholarships',
    metaTitle:
      'Scholarships - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    metaDescription:
      'Scholarships - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    metaKeywords:
      'Scholarships - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    robots: 'index, follow',
  },
  {
    pageName: 'Career at IPS',
    pageSlug: 'career-ips-business-school',
    metaTitle:
      'Career @ IPS BUSINESS SCHOOL - Top Ranked MBA, BBA & BCA College in Rajasthan',
    metaDescription:
      'Career @ IPS BUSINESS SCHOOL - Top Ranked MBA, BBA & BCA College in Rajasthan',
    metaKeywords:
      'Career @ IPS BUSINESS SCHOOL - Top Ranked MBA, BBA & BCA College in Rajasthan',
    robots: 'index, follow',
  },
  {
    pageName: 'Apply Now',
    pageSlug: 'apply-now',
    metaTitle: 'IPS School Landing Page',
    metaDescription:
      'Apply now to IPS Business School Jaipur for MBA, BBA, or BCA programs. Take the first step toward a successful career in management and technology.',
    metaKeywords: '',
    robots: 'index, follow',
  },
  {
    pageName: 'Anti-Ragging',
    pageSlug: 'anti-ragging',
    metaTitle: 'Anti Ragging Policy - IPS Business School Jaipur',
    metaDescription:
      'Anti Ragging - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    metaKeywords:
      'Anti Ragging - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    robots: 'index, follow',
  },
  {
    pageName: 'Blogs',
    pageSlug: 'blogs',
    metaTitle: 'Blogs | IPS Business School - Business, Management & Career Insights',
    metaDescription:
      'Read the latest blogs from IPS Business School on business, management, career, MBA, BBA, BCA and more.',
    metaKeywords: 'IPS Business School blogs, MBA blogs, BBA blogs, management articles',
    robots: 'index, follow',
  },
  {
    pageName: 'Campus News',
    pageSlug: 'campus-news',
    metaTitle: 'Campus News | IPS Business School - Latest Updates',
    metaDescription:
      'Stay updated with the latest campus news, placements, events and achievements from IPS Business School, Jaipur.',
    metaKeywords:
      'IPS campus news, IPS placements news, IPS events, IPS Business School updates',
    robots: 'index, follow',
  },
  {
    pageName: 'Privacy Policy',
    pageSlug: 'privacy-policy',
    metaTitle: 'Privacy Policy - IPS Business School | Data Protection & Privacy',
    metaDescription:
      'Learn about how IPS Business School collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data security.',
    metaKeywords: 'privacy policy, data protection, ips privacy, student data security',
    robots: 'noindex, follow',
  },
  {
    pageName: 'Terms & Conditions',
    pageSlug: 'terms-conditions',
    metaTitle:
      'Terms & Conditions - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    metaDescription:
      'Terms & Conditions - Top Ranked MBA, BBA & BCA College in Rajasthan | MBA, BBA & BCA Jaipur',
    metaKeywords: '',
    robots: 'noindex, follow',
  },
  {
    pageName: 'Documents Required for Education Loan',
    pageSlug: 'documents-required-for-education-loan',
    metaTitle: 'Top Ranked MBA & BBA and BCA College in Rajasthan | MBA & BBA Jaipur',
    metaDescription:
      'IPS College, Jaipur is among the top colleges in Rajasthan for MBA, BBA, and BCA, recognized as a premier business school shaping practices and transforming careers worldwide',
    metaKeywords: '',
    robots: 'index, follow',
  },
  {
    pageName: 'Thank You',
    pageSlug: 'thank-you',
    metaTitle: 'Thank You | IPS Business School Jaipur',
    metaDescription:
      'Thank you for reaching out to IPS Business School Jaipur. We will get back to you shortly.',
    metaKeywords: '',
    robots: 'noindex, nofollow',
  },
];

// ─── POST /api/admin/seo/seed ─────────────────────────────────────────────────
// Uses $setOnInsert — safe to call multiple times, never overwrites manual edits.
export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    await connectDB();

    const results = { inserted: [], skipped: [], errors: [] };

    for (const item of SEED_DATA) {
      try {
        const result = await PageSeo.findOneAndUpdate(
          { pageSlug: item.pageSlug },
          { $setOnInsert: item },
          { upsert: true, new: true, rawResult: true },
        );

        if (result.lastErrorObject?.upserted) {
          results.inserted.push(item.pageSlug);
        } else {
          results.skipped.push(item.pageSlug); // already existed — left untouched
        }
      } catch (err) {
        results.errors.push({ slug: item.pageSlug, error: err.message });
      }
    }

    return successResponse(
      {
        total: SEED_DATA.length,
        inserted: results.inserted.length,
        alreadyExisted: results.skipped.length,
        errors: results.errors,
        insertedSlugs: results.inserted,
      },
      `Seed complete. ${results.inserted.length} inserted, ${results.skipped.length} already existed.`,
    );
  } catch (error) {
    console.error('[SEO SEED ERROR]', error);
    return errorResponse('Seed failed', 500);
  }
}

// ─── GET /api/admin/seo/seed — Preview pages list ────────────────────────────
export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    return successResponse(
      { pages: SEED_DATA.map((p) => ({ pageName: p.pageName, pageSlug: p.pageSlug })) },
      `${SEED_DATA.length} pages ready to seed`,
    );
  } catch (error) {
    return errorResponse('Failed', 500);
  }
}

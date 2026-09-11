import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AboutPageContent from '@/models/AboutPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/about-content/seed
 * Admin-protected. Inserts the current static About page data as the initial DB content.
 * Safe to re-run — uses upsert so it won't duplicate.
 * Pass ?force=true to overwrite existing docs with original defaults.
 */
export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    await connectDB();

    const imgBase = process.env.NEXT_PUBLIC_IMG_PATH || '';

    const sections = [
      // ── Content ───────────────────────────────────────────────────────────────
      {
        section: 'content',

        bannerTitle: 'IPS Ideology',
        bannerImageUrl: `${imgBase}images/about/about-us-image-3.webp`,
        bannerPosition: 'object-bottom',

        pageHeading: 'IPS IDEOLOGY',

        quoteText:
          '"Discover who you really are. Think independently. Find your own voice. IPS BUSINESS SCHOOL is one of the Rajasthan\'s elite business schools shaping business practice and transforming careers across the globe."',

        descriptionParagraphs: [
          'As one of the Rajasthans\'s leading Business Schools, IPS BUSINESS SCHOOL brings together people, cultures and ideas to change lives and to transform organisations. A global perspective and cultural diversity are reflected in all aspects of our research and teaching.',
          'For over twelve years, IPS, the Business School, has been at the forefront of Management Education, developing and inspiring business leaders who strive to make a deep, positive and lasting impact on the people, companies and society they serve.',
          'The school\'s integrated and up to date curriculum, close ties with Multinationals, and active connection to the Global Network for Advanced Management ensure that IPS\'s Management Students acquire crucial techno Manage-mental skills and develop a genuine understanding of an increasingly complex global context.',
        ],

        whyChooseHeading: 'Why Choose IPS BUSINESS SCHOOL?',

        whyChooseItems: [
          {
            boldText: 'Excelling at Research',
            description:
              'We strive for excellence in research and innovation. We also come up with a panel of part-time Distinguished Research Professors and Entrepreneurs whose Knowledge are shared with Management Folks at IPS. These people concentrate on mentoring and promoting research of international significance and on deepening international Knowledge by ties with Prestigious institutions.',
            order: 0,
          },
          {
            boldText: 'Excelling at Teaching',
            description:
              'Our world-class researchers and Entrepreneurs are also superb teachers, skilled at using a variety of teaching methods to engage and instruct. We also employ Professors of Practice, people who combine academic expertise with substantial business experience to aid the practical learning in the classroom.',
            order: 1,
          },
          {
            boldText: 'Excelling in producing the most valuable Graduates',
            description:
              'Those very bright students we recruit for management program, turns into fantastic graduates, with a thirst for learning and a rounded approach to life and work. With academic theory and practical skills, they hit the ground running in any company. More than all of this, we believe in the power of creativity, of human imagination to do new things, to see things differently. And so do our staff, our students, and our graduates. Do you?',
            order: 2,
          },
          {
            boldText: 'Excelling in On Job Training',
            description:
              'Our Student come up as a Prodigious Management Folk after graduation with our unique On Job Training Methodology which they undergo during period of graduation with top corporate and multinationals. More than all of this, we believe in the power of creativity, of human imagination to do new things, to see things differently. And so do our staff, our students, and our graduates. Do you?',
            order: 3,
          },
        ],
      },

      // ── Sidebar ────────────────────────────────────────────────────────────────
      {
        section: 'sidebar',
        sidebarVideos: [
          {
            url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb',
            title: '',
            order: 0,
          },
          {
            url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
            title: 'Raghav Sharma Video Resume',
            order: 1,
          },
        ],
      },
    ];

    const results = [];
    for (const sectionData of sections) {
      const { section } = sectionData;

      if (!force) {
        const existing = await AboutPageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await AboutPageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[ABOUT-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}

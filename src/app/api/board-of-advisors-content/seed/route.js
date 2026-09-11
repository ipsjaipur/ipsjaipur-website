import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BoardOfAdvisorsPageContent from '@/models/BoardOfAdvisorsPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/board-of-advisors-content/seed
 * Admin-protected. Inserts the current static Board of Advisors data as initial DB content.
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
      // ── Banner ───────────────────────────────────────────────────────────────
      {
        section:        'banner',
        bannerTitle:    'Board of Advisors',
        bannerImageUrl: `${imgBase}images/about/board-of-advisor-img.webp`,
        bannerPosition: 'object-center',
      },

      // ── Advisors ─────────────────────────────────────────────────────────────
      {
        section:         'advisors',
        ghostText:       'Corporate Leadership',
        sectionHeading:  'Guided by Industry Legends',
        sectionSubtitle:
          'The strategic trajectory, curriculum relevance, and Industrial association at IPS Business School are actively guided by a distinguished Board of Advisors comprising banking leaders, healthcare chairmen, asset managers, and academic visionaries.',
        advisors: [
          {
            name:         'Dr. S.K. Agarwal',
            designation:  'Member, Board of Advisors',
            organization: 'Chairman, Agarwal Hospital',
            description:
              'Headed senior leadership positions across Public and Private Sector organizations, guiding institutional ethics and public governance.',
            initials: 'SA',
            order:    0,
          },
          {
            name:         'Mr. Ashish Mittal',
            designation:  'Member, Board of Advisors',
            organization: 'Chairman, Agarwal Hospital',
            description:
              'Extensive operational leadership and enterprise management expertise from leading positions across private and public sectors.',
            initials: 'AM',
            order:    1,
          },
          {
            name:         'Dr. Sudhir Agarwal',
            designation:  'Senior Vice-President & Advisor',
            organization: 'IPS Business School',
            description:
              'Worked with Hong Kong Shanghai Banking Corporation Ltd. (HSBC), IDBI Bank Ltd., and Citibank N.A. Heads corporate alliances and placement strategy.',
            initials: 'SA',
            order:    2,
          },
          {
            name:         'Mr. Mohit Bhagat',
            designation:  'Strategic Head & Advisor',
            organization: 'IPS Business School',
            description:
              'Worked as Sr. Vice President with Kotak Mahindra Bank Ltd., North Head TATA Mutual Fund, BDM North ICICI Prudential Mutual Funds, State Head Rajasthan Franklin Templeton Mutual Funds.',
            initials: 'MB',
            order:    3,
          },
          {
            name:         'Mr. Paresh Nankany',
            designation:  'Member, Board of Advisors',
            organization: 'Formerly North Head - ING Vysya, HDFC, IDBI & ICICI',
            description:
              'Worked as North Head - ING Vysya Bank Ltd., HDFC Bank Ltd., IDBI Bank Ltd., ICICI Bank Ltd. Mentors students in commercial banking and credit operations.',
            initials: 'PN',
            order:    4,
          },
          {
            name:         'Dr. Deepti Agarwal',
            designation:  'Director & Executive Advisor',
            organization: 'IPS Business School',
            description:
              'Director - IPS Business School. Oversees academic execution, regulatory compliance (AICTE/RTU), faculty governance, and student development.',
            initials: 'DA',
            order:    5,
          },
        ],
      },

      // ── Bridging Theory ───────────────────────────────────────────────────────
      {
        section:            'bridging',
        bridgingHeading:    'Bridging Classroom Theory & Corporate Reality',
        bridgingParagraph:
          'Our Board of Advisors conducts periodic curriculum reviews, delivers executive masterclasses, and facilitates direct On Job Training (OJT) opportunities with Fortune 500 companies and leading Indian MNCs.',
        bridgingButtonText: 'Explore Placements',
        bridgingButtonHref: '/placements',
      },
    ];

    const results = [];
    for (const sectionData of sections) {
      const { section } = sectionData;

      if (!force) {
        const existing = await BoardOfAdvisorsPageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await BoardOfAdvisorsPageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[BOARD-OF-ADVISORS-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CareerPageContent from '@/models/CareerPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * Default seed data — mirrors the original static content in MainCareer.jsx
 */
const SEED_DATA = [
  {
    section: 'banner',
    bannerTitle: 'Career @ IPS BUSINESS SCHOOL',
    bannerImageUrl: '',
    bannerPosition: 'object-center',
  },
  {
    section: 'intro',
    introParagraph:
      'IPS BUSINESS SCHOOL has been a flag bearer pioneering the legacy of industry oriented Management Education and an undisputed leader in Corporate connection in North India for over a period of 17+ glorious years',
  },
  {
    section: 'requirements',
    requirementsHeading: 'We are looking for the professionals who are:',
    requirements: [
      {
        text: 'Sincere and committed to their professional and education.',
        order: 0,
      },
      {
        text: 'Good Learners, having the capacity to assimilate new knowledge, develop new skills in the field of academics, with a commitment to excellence and urge to grow faster than their colleagues elsewhere.',
        order: 1,
      },
      {
        text: 'Ready to accept the challenge pf extending their perception beyond the traditional system of education.',
        order: 2,
      },
    ],
  },
  {
    section: 'perks',
    perksHeading: 'If you have it in you, IPS BUSINESS SCHOOL is the right place for you',
    perks: [
      { text: 'Immense opportunities to grow personally and professionally', order: 0 },
      {
        text: 'Sharing of revenue with faculty on income generated through consultancy, research and industry projects.',
        order: 1,
      },
    ],
  },
  {
    section: 'openings',
    openingsHeading: 'Current Openings',
    openings: [
      {
        department: 'SENIOR LECTURERS / LECTURERS',
        roles: [
          'Marketing',
          'HR',
          'Finance',
          'International Business',
          'Retail Management',
          'English',
          'Personality Development Trainer.',
        ],
        order: 0,
      },
    ],
  },
  {
    section: 'contact',
    contactHeading: 'You may apply to',
    contactEmail: 'careers@ipsedu.in',
    contactPhone: '+91-9829047517',
  },
];

/**
 * POST /api/career-content/seed
 * Admin protected.
 *
 * ?force=true  — overwrite ALL sections with defaults
 * (default)    — only insert sections that are missing from the DB
 */
export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    const results = [];

    for (const seedDoc of SEED_DATA) {
      const { section, ...fields } = seedDoc;

      if (!force) {
        // Skip sections that already exist
        const existing = await CareerPageContent.findOne({ section }).lean();
        if (existing) {
          results.push({ section, action: 'skipped' });
          continue;
        }
      }

      await CareerPageContent.findOneAndUpdate(
        { section },
        { $set: { section, ...fields } },
        { upsert: true, new: true, runValidators: false },
      );

      results.push({ section, action: force ? 'reset' : 'seeded' });
    }

    return NextResponse.json({
      success: true,
      message: force
        ? 'All career page sections reset to defaults'
        : 'Missing career page sections seeded successfully',
      results,
    });
  } catch (error) {
    console.error('[CAREER-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 },
    );
  }
}

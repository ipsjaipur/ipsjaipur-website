import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EducationLoanPageContent from '@/models/EducationLoanPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * Default seed data — mirrors the original static content in EducationDetail.jsx
 */
const SEED_DATA = [
  {
    section: 'banner',
    bannerTitle: 'Education loan',
    bannerImageUrl: '',
    bannerPosition: 'object-top',
  },
  {
    section: 'main',
    mainHeading: 'Education Loan Facilities',
    mainImageUrl: '',
    introParagraphs: [
      "Welcome to IPS BUSINESS SCHOOL! At IPS BUSINESS SCHOOL, we're firm believers in the universal right to education. We're on a mission to tear down financial barriers so that every deserving student can chase their dreams without worry.",
      "How do we do it? With a range of financial support options like scholarships and educational loans, we're here to ensure nothing stands in the way of your education.",
      "We believe the sky's the limit. With our unwavering support and your determination, there's no goal that is impossible to achieve.",
      "And when it comes to financing, the choice is yours. Pick the bank that works best for you, and let's make your education dreams a reality together.",
    ],
    boldParagraph:
      "Join IPS Business School, where possibilities are limitless, and your future is bright. Let's embark on this journey together!",
    vidyaLakshmiNote:
      '40 banks have been registered so far and 71 loan schemes have been uploaded in Vidya Lakshmi Portal.',
    officialsNote: 'IPS OFFICIALS NUMBER - Rohit sharma - 8955273791 | Sourav Nagi - 9509266472',
  },
  {
    section: 'assistance',
    assistanceHeading: 'Education Loan Assistance',
    assistanceIntro:
      'We are pleased to announce our partnership with Kuhoo, to offer education loans tailored to meet the diverse needs of our students. Kuhoo specializes in providing hassle-free financial solutions to empower students to pursue their higher education goals without financial constraints.',
    keyFeaturesHeading: 'Key Features',
    keyFeatures: [
      'Competitive interest rates',
      'Tie-ups with over 10+ leading Banks & NBFCs',
      'Quick and transparent loan processing',
      'No collateral required',
      'No Joining fees',
      'Loan coverage for program fees, Hostel fee and other educational expenses.',
    ],
    eligibilityHeading: 'Eligibility Criteria:',
    eligibilityCriteria: ['Indian nationals', 'Admission to IPS COLLEGE academic programs'],
    documentsHeading: 'Students may access the same and avail the facilities',
    documents: [
      'Applicant Photo',
      'Parent Photo',
      'Aadhar Card',
      'Pan Card',
      'X and XII Marksheets',
      'University Admission Letter',
      'Student / Parent Bank Details',
      'Salary Slip (If Employed)',
      'Residence Proof',
      'ITR/Form 16',
    ],
  },
  {
    section: 'videos',
    videoUrls: [
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

/**
 * POST /api/education-loan-content/seed
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
        const existing = await EducationLoanPageContent.findOne({ section }).lean();
        if (existing) {
          results.push({ section, action: 'skipped' });
          continue;
        }
      }

      await EducationLoanPageContent.findOneAndUpdate(
        { section },
        { $set: { section, ...fields } },
        { upsert: true, new: true, runValidators: false },
      );

      results.push({ section, action: force ? 'reset' : 'seeded' });
    }

    return NextResponse.json({
      success: true,
      message: force
        ? 'All education loan page sections reset to defaults'
        : 'Missing education loan page sections seeded successfully',
      results,
    });
  } catch (error) {
    console.error('[EDUCATION-LOAN-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 },
    );
  }
}

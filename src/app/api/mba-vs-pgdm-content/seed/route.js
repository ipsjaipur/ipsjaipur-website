import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MbaVsPgdmPageContent from '@/models/MbaVsPgdmPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/mba-vs-pgdm-content/seed
 * Admin-protected. Inserts the current static MBA vs PGDM page data as the initial DB content.
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
      // ── Banner ─────────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerTitle: 'MBA vs. PGDM',
        bannerImageUrl: `${imgBase}images/about/mba-vs-pgdm-bg-2.webp`,
        bannerPosition: 'object-[50%_35%]',
      },

      // ── Content ────────────────────────────────────────────────────────────────
      {
        section: 'content',
        backgroundWatermarkText: 'Strategic Decision',
        mainHeading: 'University MBA vs. Autonomous PGDM',
        introParagraph:
          'Making the right choice between a Master of Business Administration (MBA) degree and a Post Graduate Diploma in Management (PGDM) is pivotal for management aspirants.',
        paragraph2:
          'While <strong>traditional university MBA degrees</strong> provide statutory legal security, government job eligibility, and worldwide academic recognition for Ph.D. studies, autonomous PGDM diplomas emphasize practical industry exposure.',
        paragraph3:
          '<strong>IPS Business School</strong>, this dilemma is resolved by offering the <strong>IPS Hybrid Solution</strong> - a program that delivers maximum ROI at an affordable fee.',
        card1Title: 'AICTE Approved',
        card1Subtitle: 'Govt. of India Statutory Body',
        card1SubtitleColor: 'blue',
        card1LogoUrl: `${imgBase}images/home/aicte.webp`,
        card2Title: 'RTU Affiliated',
        card2Subtitle: 'UGC Recognized University Degree',
        card2SubtitleColor: 'orange',
        card2LogoUrl: `${imgBase}images/home/rtu.webp`,
        hybridBadgeText: 'The IPS Hybrid Solution',
        hybridHeading: 'Get the Best of Both Worlds',
        hybridDescription:
          'Why compromise? At IPS Business School, students earn a <strong class="text-white">UGC-recognized University MBA Degree*</strong> while undergoing <strong class="text-white">**100% Practical Corporate OJTA*</strong>, attends, and executive mentorship - delivering maximum ROI at an affordable fee.',
        hybridCtaText: 'Explore MBA Program',
        hybridCtaHref: '/mba',
      },

      // ── Comparison ─────────────────────────────────────────────────────────────
      {
        section: 'comparison',
        comparisonBackgroundWatermarkText: 'Comparison Matrix',
        comparisonHeading: 'Key Differences at a Glance',
        col1Header: 'Evaluation Dimension',
        col2Header: 'University MBA',
        col3Header: 'Autonomous PGDM',
        col4Header: 'IPS Business School Hybrid MBA',
        comparisonRows: [
          {
            dimension: 'Official Qualification',
            universityMBA: "Postgraduate **Master's Degree**",
            autonomousPGDM: 'Postgraduate **Diploma**',
            ipsHybridMBA: "UGC Master's Degree (RTU Affiliated)",
            order: 0,
          },
          {
            dimension: 'Statutory Accreditation',
            universityMBA: 'UGC / University Recognition',
            autonomousPGDM: 'AICTE Approval only',
            ipsHybridMBA: 'AICTE Approved + RTU Affiliated',
            order: 1,
          },
          {
            dimension: 'Ph.D. & Foreign Mobility',
            universityMBA: 'Direct Global Eligibility',
            autonomousPGDM: 'Requires AIU Equivalency Certificate',
            ipsHybridMBA: '100% Direct Global & Ph.D. Eligibility',
            order: 2,
          },
          {
            dimension: 'Government & PSU Jobs',
            universityMBA: '100% Valid everywhere',
            autonomousPGDM: 'May require AIU Equivalence proof',
            ipsHybridMBA: '100% Accepted in UPSC, RPSC, Banking Officers',
            order: 3,
          },
          {
            dimension: 'Practical Corporate Exposure',
            universityMBA: 'Traditionally 6-8 weeks summer project',
            autonomousPGDM: 'Case study oriented',
            ipsHybridMBA: 'Day-1 Corporate OJTA & Stipend Projects',
            order: 4,
          },
          {
            dimension: 'Value-Added Modules',
            universityMBA: 'Basic university electives',
            autonomousPGDM: 'Institute dependent',
            ipsHybridMBA: 'AI/ML, Business Analytics & Digital Marketing',
            order: 5,
          },
          {
            dimension: 'Fee Investment & ROI',
            universityMBA: 'Affordable regulated fee',
            autonomousPGDM: 'High private autonomous fees',
            ipsHybridMBA: 'High ROI at Affordable University Fee',
            order: 6,
          },
        ],
        featureCards: [
          {
            iconName: 'GraduationCap',
            title: 'Academic Security',
            description:
              'A University MBA degree ensures lifelong security for civil services, doctorate admissions and global employment.',
            order: 0,
          },
          {
            iconName: 'Briefcase',
            title: 'Corporate Readiness',
            description:
              '100 incomparable SECTORAL case-labs cum Trainings, 100TLs from Semester-1 to students graduate with real work experience.',
            order: 1,
          },
          {
            iconName: 'TrendingUp',
            title: 'Accessible ROI',
            description:
              'Enjoy elite corporate placements and international immersion without incurring exorbitant autonomous diploma fees.',
            order: 2,
          },
        ],
      },
    ];

    const results = [];

    for (const sectionData of sections) {
      const filter = { section: sectionData.section };
      let result;

      if (force) {
        // Overwrite everything
        result = await MbaVsPgdmPageContent.findOneAndUpdate(
          filter,
          { $set: sectionData },
          { upsert: true, new: true, runValidators: true }
        ).lean();
      } else {
        // Only insert if missing
        const exists = await MbaVsPgdmPageContent.findOne(filter).lean();
        if (!exists) {
          result = await MbaVsPgdmPageContent.create(sectionData);
          result = result.toObject();
        } else {
          result = exists;
        }
      }

      results.push({ section: sectionData.section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({
      success: true,
      message: force
        ? 'All MBA vs PGDM sections reset to defaults'
        : 'Missing MBA vs PGDM sections seeded successfully',
      data: results,
    });
  } catch (error) {
    console.error('[MBA-VS-PGDM-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}

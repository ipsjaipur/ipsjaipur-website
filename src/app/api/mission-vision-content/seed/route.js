import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MissionVisionPageContent from '@/models/MissionVisionPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/mission-vision-content/seed
 * Admin-protected. Inserts the current static Mission & Vision page data as initial DB content.
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
      // ── Banner ──────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerTitle: 'Mission & Vision',
        bannerImageUrl: `${imgBase}images/about/mission-vision-bg-2.webp`,
        bannerPosition: 'object-center',
      },

      // ── Institutional ────────────────────────────────────────────────────────
      {
        section: 'institutional',
        institutionalHeading: 'Shaping Practice & Transforming Careers',
        institutionalQuote:
          '"Discover who you really are. Think independently. Find your own voice. IPS BUSINESS SCHOOL is one of Rajasthan\'s elite business schools shaping business practice and transforming careers across the globe."',
        institutionalParagraph1:
          "As one of Rajasthan's leading Business Schools, IPS BUSINESS SCHOOL brings together people, cultures and ideas to change lives and to transform organizations. A global perspective and cultural diversity are reflected in all aspects of our research and teaching.",
        institutionalParagraph2:
          'For over 18 years, IPS has been at the forefront of Management Education, developing and inspiring business leaders who strive to make a deep, positive and lasting impact on the people, companies, and society they serve.',
        institutionalImageUrl: `${imgBase}images/about/ab-image.webp`,
        institutionalImageAlt: 'Shaping Practice & Transforming Careers - IPS Business School',
      },

      // ── Vision & Mission ─────────────────────────────────────────────────────
      {
        section: 'vision_mission',
        visionMissionCards: [
          {
            cardType: 'vision',
            label: 'Our Vision',
            title: 'Achieving Excellence in Professional Education',
            description:
              'To be a globally recognized institution of management and technical education that empowers individuals with cutting-edge techno-managerial capabilities, ethical leadership, and practical corporate mastery—driving economic progress and social transformation.',
            order: 0,
          },
          {
            cardType: 'mission',
            label: 'Our Mission',
            title: 'Employability & Social Responsibility',
            description:
              'Providing multi-level education with an emphasis on employability skills and nurturing social responsibility. The mission of IPS is to equip students for effective contributions in their chosen professions through affordable, high-quality, practical education.',
            order: 1,
          },
        ],
      },

      // ── Core Values ──────────────────────────────────────────────────────────
      {
        section: 'core_values',
        coreValuesSectionTitle: 'Our Core Values',
        coreValuesSectionSubtitle: 'The IPS DNA',
        coreValues: [
          {
            iconKey: 'integrity',
            title: 'Integrity',
            description: 'Absolute transparency in academic standards, admissions, and institutional operations.',
            order: 0,
          },
          {
            iconKey: 'holistic_health',
            title: 'Holistic Health',
            description:
              'Balancing physical, mental, emotional, spiritual, and social development across campus life.',
            order: 1,
          },
          {
            iconKey: 'social_responsibility',
            title: 'Social Responsibility',
            description:
              'Educating leaders committed to ethical governance, community service, and environmental stewardship.',
            order: 2,
          },
          {
            iconKey: 'agility_innovation',
            title: 'Agility & Innovation',
            description:
              'Embracing AI, business analytics, and digital tools to stay at the forefront of global management education.',
            order: 3,
          },
        ],
      },
    ];

    const results = [];

    for (const sectionData of sections) {
      const filter = { section: sectionData.section };

      if (force) {
        await MissionVisionPageContent.findOneAndUpdate(
          filter,
          { $set: sectionData },
          { upsert: true, new: true, runValidators: false },
        ).lean();
        results.push({ section: sectionData.section, status: 'overwritten' });
      } else {
        const exists = await MissionVisionPageContent.findOne(filter).lean();
        if (!exists) {
          await MissionVisionPageContent.create(sectionData);
          results.push({ section: sectionData.section, status: 'seeded' });
        } else {
          results.push({ section: sectionData.section, status: 'skipped' });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: force
        ? 'All Mission & Vision page sections reset to defaults'
        : 'Missing Mission & Vision page sections seeded successfully',
      data: results,
    });
  } catch (error) {
    console.error('[MISSION-VISION-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 },
    );
  }
}

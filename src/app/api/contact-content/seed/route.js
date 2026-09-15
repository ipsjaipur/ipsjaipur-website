import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactPageContent from '@/models/ContactPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/contact-content/seed
 * Admin-protected. Inserts the current static contact page data as the initial DB content.
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
        bannerTitle: 'Contact Us',
        bannerImageUrl: `${imgBase}images/about/about-us-image-new.webp`,
        bannerPosition: 'object-center',
      },

      // ── Info ────────────────────────────────────────────────────────────────
      {
        section: 'info',

        cardTitle: 'Contact Us',
        cardSubtitle: 'IPS COLLEGE JAIPUR',

        addresses: [
          {
            text: 'A 1, Padmawati Colony - B, Pandit T.N. Mishra Marg, Nirman Nagar, Jaipur, Rajasthan, INDIA - 302019.',
            order: 0,
          },
          {
            text: 'Rohini Nagar, Phase 3, Chandawas, Sanganer - Renwal Road, Jaipur, Rajasthan, INDIA - 303904.',
            order: 1,
          },
        ],

        phoneLabel: 'Phone',
        phoneNumber: '+91 8233970000',
        phoneHref: 'tel:+918233970000',

        whatsappLabel: 'WhatsApp',
        whatsappNumber: '+91 7976814849',
        whatsappHref: 'https://wa.me/917976814849',

        emailLabel: 'Email',
        emailAddress: 'info@ipsedu.in',
        emailHref: 'mailto:info@ipsedu.in',

        websiteLabel: 'Website',
        websiteDisplay: 'www.ipsedu.in',
        websiteHref: 'https://www.ipsedu.in',

        socialHeading: 'Follow Us',
        socialLinks: [
          { name: 'facebook', href: 'https://www.facebook.com/ipsbusinessschool', order: 0 },
          { name: 'twitter', href: 'https://twitter.com/home', order: 1 },
          { name: 'linkedin', href: 'https://www.linkedin.com/school/1024483/admin/feed/posts/', order: 2 },
          { name: 'instagram', href: 'https://www.instagram.com/ipsbschool/', order: 3 },
        ],

        streetViewEmbedUrl:
          'https://www.google.com/maps/embed?pb=!4v1545940800964!6m8!1m7!1sYaqLow5lF1QAAAQpmtYJlg!2m2!1d26.88099616194766!2d75.75499552269685!3f177.38064455944863!4f-1.5276697203127583!5f1.7732863038280446',
        streetViewTitle: 'IPS Business School Street View',

        locationEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14234.851438834463!2d75.7553402!3d26.8808625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4f750821f2b%3A0x9070c7c87969b72d!2sIPS%20BUSINESS%20SCHOOL!5e0!3m2!1sen!2sin!4v1678969475461!5m2!1sen!2sin',
        locationMapTitle: 'IPS Business School Location',
      },
    ];

    const results = [];

    for (const sectionData of sections) {
      const filter = { section: sectionData.section };

      if (force) {
        await ContactPageContent.findOneAndUpdate(
          filter,
          { $set: sectionData },
          { upsert: true, new: true, runValidators: false }
        ).lean();
        results.push({ section: sectionData.section, status: 'overwritten' });
      } else {
        const exists = await ContactPageContent.findOne(filter).lean();
        if (!exists) {
          await ContactPageContent.create(sectionData);
          results.push({ section: sectionData.section, status: 'seeded' });
        } else {
          results.push({ section: sectionData.section, status: 'skipped' });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: force
        ? 'All contact page sections reset to defaults'
        : 'Missing contact page sections seeded successfully',
      data: results,
    });
  } catch (error) {
    console.error('[CONTACT-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}

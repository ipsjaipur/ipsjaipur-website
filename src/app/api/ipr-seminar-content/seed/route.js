import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import IprSeminarPageContent from '@/models/IprSeminarPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * Image fields in each section — these are NEVER overwritten by the seed.
 * Existing uploaded images in the DB are always preserved.
 */
const IMAGE_FIELDS = {
  hero: ['heroPosterImageUrl'],
  about: ['aboutImageUrl'],
};

/**
 * Zephyr 2026 — full text content for every section.
 */
const SEED_DATA = [
  // ── Config ────────────────────────────────────────────────────────────────
  {
    section: 'config',
    slug: 'zephyr-2026',
    status: 'published',
    theme: 'dark',
    topBarIsShow: true,
    topBarButtonText: 'Zephyr 2026 — Register Free',
    brochurePdfUrl: '/images/brochure/IPS_IPR_International_Seminar_Brochure.pdf',
    brochureDownloadName: 'Zephyr-2026-Brochure.pdf',
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  {
    section: 'hero',
    heroBadgeText: 'IPS Business School, Jaipur presents',
    heroSuperText: 'ZEPHYR 2026',
    heroTitleLine1: "Rajasthan's Most",
    heroTitleLine2: 'Awaited',
    heroTitleHighlight: 'Youth Festival',
    heroSubtitle: "Rajasthan's Most Awaited Youth Festival is Here.",
    heroDescription:
      'The Intercollegiate Management & IT Fest. 3 Days. 20 Events. One Unforgettable Wave.',
    heroDate: '[Dates]',
    heroDaytime: '3 Days of Non-Stop Energy',
    heroVenueName: '[Venue]',
    heroVenueCity: 'Jaipur, Rajasthan',
    heroEntryBadge: 'Free Entry',
    heroEntryBadgeSub: 'Gifts Worth ₹2000',
    heroRegisterButtonText: 'REGISTER FREE',
    heroRegisterButtonLink: 'https://forms.gle/',
    heroBrochureButtonText: 'Download Brochure',
    // heroPosterImageUrl — preserved from DB (IMAGE_FIELDS)
    heroPosterDownloadText: 'Download Poster',
    heroTrustBadges: [
      '100% Free Registration',
      'Guaranteed Gifts Worth ₹2000',
      'No Lucky Draw — Every Participant Wins',
    ],
  },

  // ── Topics (Three Days / Three Headliners) ────────────────────────────────
  {
    section: 'topics',
    topicsHeading: 'Three Days. Three Headliners.',
    topicsSubheading: '3 DAYS · 20 EVENTS',
    topics: [
      {
        iconName: 'Mic2',
        title: 'DAY 1 — THE VOICE OF ZEPHYR',
        desc: '[Date] · Singing Competition — Where raw talent meets the spotlight. Find the voice that owns the stage.',
        color: '#f5c518',
        order: 0,
      },
      {
        iconName: 'Music',
        title: 'DAY 2 — RHYTHM & ELECTRICITY',
        desc: '[Date] · Dance Competition + DJ Night — Battle it out on the floor by day. Lose yourself in the beats by night.',
        color: '#a855f7',
        order: 1,
      },
      {
        iconName: 'Crown',
        title: 'DAY 3 — THE GRAND FINALE',
        desc: '[Date] · Gala Ramp Walk — Style, poise, attitude. The runway is yours to own.',
        color: '#f97316',
        order: 2,
      },
    ],
  },

  // ── About (Why Zephyr?) ───────────────────────────────────────────────────
  {
    section: 'about',
    aboutSuperText: 'Why Zephyr?',
    aboutHeading: "More Than a Fest — A Stage for Rajasthan's Best.",
    aboutParagraph1:
      "Zephyr is where Rajasthan's brightest young minds meet its boldest talent. Hosted by IPS Business School, Jaipur, this is more than a fest. It's a three-day stage for management minds, tech innovators, performers and dreamers from colleges across the region. Compete. Connect. Celebrate.",
    aboutParagraph2:
      'Register free, show up, and walk away with guaranteed gifts worth ₹2000. No fees. No lucky draws. No fine print. Every registered participant wins.',
    // aboutImageUrl — preserved from DB (IMAGE_FIELDS)
    aboutAttendeesCount: '[ ]+',
    aboutAttendeesLabel: 'Participants',
    aboutAttendeesSubLabel: 'Expected',
  },

  // ── Takeaways (What Every Participant Takes Home) ─────────────────────────
  {
    section: 'takeaways',
    takeawaysSuperText: 'What Every Participant Takes Home',
    takeawaysHeading: 'Register. Show Up. Walk Away with Gifts Worth ₹2000. Guaranteed.',
    takeawaysDescription:
      'No fees. No lucky draws. No fine print. Every registered participant gets a gift.',
    takeaways: [
      {
        iconName: 'Gift',
        title: 'Guaranteed Gifts Worth ₹2000',
        desc: 'Every registered participant walks away with real gifts — not vouchers, not entry into a draw.',
        color: '#f5c518',
        order: 0,
      },
      {
        iconName: 'Trophy',
        title: 'Cash Prizes & Trophies',
        desc: 'For winners across all 20 events and competitions. [Prize pool to be confirmed]',
        color: '#eb5905',
        order: 1,
      },
      {
        iconName: 'Award',
        title: 'Participation Certificates',
        desc: 'Official certificates for all participants. [If applicable]',
        color: '#10B981',
        order: 2,
      },
      {
        iconName: 'Users',
        title: 'Networking Opportunities',
        desc: 'Connect with students and industry guests from colleges across Rajasthan. [If applicable]',
        color: '#3B82F6',
        order: 3,
      },
    ],
  },

  // ── Audience ──────────────────────────────────────────────────────────────
  {
    section: 'audience',
    audienceSuperText: 'Open For Everyone',
    audienceHeading: "If You're a Student, Zephyr is For You.",
    audienceDescription:
      'Zephyr welcomes students from all colleges across Rajasthan. Whether you compete, perform, or just come to experience — you are welcome.',
    audience: [
      {
        iconName: 'BookOpen',
        label: 'Management Students',
        sub: 'MBA, BBA & Commerce',
        color: '#f5c518',
        order: 0,
      },
      {
        iconName: 'Monitor',
        label: 'IT & Tech Students',
        sub: 'BCA, MCA & Engineering',
        color: '#3B82F6',
        order: 1,
      },
      {
        iconName: 'Mic2',
        label: 'Performers & Artists',
        sub: 'Singers, Dancers, Modellers',
        color: '#a855f7',
        order: 2,
      },
      {
        iconName: 'Zap',
        label: 'Dreamers & Innovators',
        sub: 'All disciplines welcome',
        color: '#10B981',
        order: 3,
      },
    ],
  },

  // ── Agenda ────────────────────────────────────────────────────────────────
  {
    section: 'agenda',
    agendaSuperText: '20 Ways to Win',
    agendaHeading: 'Events & Competitions',
    agendaRegisterButtonText: 'Register Free Now →',
    agenda: [
      {
        time: 'Day 1 · [Date]',
        session: 'THE VOICE OF ZEPHYR — Singing Competition',
        type: 'keynote',
        order: 0,
      },
      {
        time: 'Day 2 · [Date]',
        session: 'RHYTHM & ELECTRICITY — Dance Competition',
        type: 'session',
        order: 1,
      },
      {
        time: 'Day 2 · [Date] — Evening',
        session: 'DJ NIGHT',
        type: 'ceremony',
        order: 2,
      },
      {
        time: 'Day 3 · [Date]',
        session: 'THE GRAND FINALE — Gala Ramp Walk',
        type: 'keynote',
        order: 3,
      },
    ],
    highlights: [
      { iconName: 'Calendar', text: '3 Days of Events', color: '#f5c518', order: 0 },
      { iconName: 'Trophy', text: '20 Events & Competitions', color: '#eb5905', order: 1 },
      { iconName: 'GraduationCap', text: '[ ]+ Colleges Participating', color: '#10B981', order: 2 },
      { iconName: 'Users', text: '[ ]+ Participants Expected', color: '#3B82F6', order: 3 },
      { iconName: 'Gift', text: '₹[ ] Prize Pool', color: '#a855f7', order: 4 },
    ],
    eventDetailRows: [
      { label: 'Event', value: 'ZEPHYR 2026', order: 0 },
      { label: 'Dates', value: '[Dates — to be filled]', order: 1 },
      { label: 'Venue', value: '[Venue], Jaipur, Rajasthan', order: 2 },
      { label: 'Registration', value: '100% Free', order: 3 },
      { label: 'Gift', value: 'Guaranteed worth ₹2000 per participant', order: 4 },
      { label: 'Events', value: '20 Competitions across Management, IT & Cultural', order: 5 },
    ],
    eventDetailsSuperText: 'Mark Your Calendar',
    eventDetailsHeading: 'Zephyr 2026 — At a Glance',
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  {
    section: 'faq',
    faqSuperText: 'Got Questions?',
    faqHeading: 'Frequently Asked Questions',
    faqDescription: 'Everything you need to know before registering for Zephyr 2026.',
    faqs: [
      {
        question: 'Is registration really free?',
        answer: "Yes — 100% free. There are no entry fees, no hidden charges, and no fine print. Just fill the form and you're in.",
        order: 0,
      },
      {
        question: 'Do all participants get gifts worth ₹2000?',
        answer: 'Yes. Every registered participant who attends Zephyr 2026 is guaranteed gifts worth ₹2000. This is not a lucky draw — every single attendee wins.',
        order: 1,
      },
      {
        question: 'Which colleges can participate?',
        answer: 'Any college student from Rajasthan is welcome to register and participate in Zephyr 2026.',
        order: 2,
      },
      {
        question: 'How do I register?',
        answer: "Click the \"Register Free\" button, fill in the 2-minute form, and you'll receive a confirmation on your email or WhatsApp.",
        order: 3,
      },
      {
        question: 'How many events can I participate in?',
        answer: 'You can register for and participate in multiple events. Check the Events section for the complete list of 20 competitions.',
        order: 4,
      },
      {
        question: 'Is there a registration deadline?',
        answer: 'Registrations are limited. The form will close once the limit is reached or on the closing date — whichever comes first. Register early to be sure.',
        order: 5,
      },
    ],
  },

  // ── CTA ───────────────────────────────────────────────────────────────────
  {
    section: 'cta',
    ctaBadgeText: '[Dates] · [Venue], Jaipur',
    ctaHeading: 'The Wave is Coming. Are You Ready?',
    ctaDescription:
      "Don't miss Zephyr 2026 — Rajasthan's most awaited intercollegiate fest. Register free in 2 minutes and guarantee your gifts worth ₹2000.",
    ctaRegisterButtonText: 'REGISTER FREE NOW →',
    ctaRegisterButtonLink: 'https://forms.gle/',
    ctaBrochureButtonText: 'Download Brochure',
    ctaAudienceTags: [
      'Free Registration',
      'Guaranteed ₹2000 Gifts',
      '20 Events',
      '3 Days',
      'All Colleges Welcome',
    ],
  },
];

/**
 * POST /api/ipr-seminar-content/seed
 * Admin protected.
 *
 * Always overwrites text content with Zephyr 2026 data.
 * Image fields (heroPosterImageUrl, aboutImageUrl) are ALWAYS preserved from
 * whatever is already in the DB — they are never reset by this route.
 */
export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const results = [];

    for (const seedDoc of SEED_DATA) {
      const { section, ...fields } = seedDoc;

      // Pull existing doc so we can preserve image URLs
      const existing = await IprSeminarPageContent.findOne({ section }).lean();

      // Build the update: start with seed fields, then restore any existing image URLs
      const update = { ...fields };
      const imageFields = IMAGE_FIELDS[section] || [];
      for (const imgField of imageFields) {
        if (existing?.[imgField]) {
          // Keep whatever image is already uploaded — don't clobber it
          update[imgField] = existing[imgField];
        }
      }

      await IprSeminarPageContent.findOneAndUpdate(
        { section },
        { $set: { section, ...update } },
        { upsert: true, new: true, runValidators: false },
      );

      results.push({ section, action: existing ? 'updated' : 'seeded' });
    }

    return NextResponse.json({
      success: true,
      message: 'All sections updated with Zephyr 2026 content (images preserved)',
      results,
    });
  } catch (error) {
    console.error('[IPR-SEMINAR-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 },
    );
  }
}

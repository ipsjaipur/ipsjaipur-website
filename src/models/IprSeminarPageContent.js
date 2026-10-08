import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const IprTopicSchema = new mongoose.Schema({
  iconName: { type: String, required: true }, // lucide icon name e.g. 'Lightbulb'
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  color: { type: String, default: '#f5c518' },
  order: { type: Number, default: 0 },
});

const IprTakeawaySchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  color: { type: String, default: '#eb5905' },
  order: { type: Number, default: 0 },
});

const IprAudienceSchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  label: { type: String, required: true },
  sub: { type: String, default: '' },
  color: { type: String, default: '#60a5fa' },
  order: { type: Number, default: 0 },
});

const IprAgendaItemSchema = new mongoose.Schema({
  time: { type: String, required: true },
  session: { type: String, required: true },
  type: {
    type: String,
    enum: ['keynote', 'session', 'panel', 'ceremony', 'break'],
    default: 'session',
  },
  order: { type: Number, default: 0 },
});

const IprFAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const IprEventHighlightSchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  text: { type: String, required: true },
  color: { type: String, default: '#60a5fa' },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const IprSeminarPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: [
        'config',
        'hero',
        'topics',
        'about',
        'takeaways',
        'audience',
        'agenda',
        'faq',
        'cta',
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: config
    // Global page settings — theme, top bar strip, brochure PDF
    // ══════════════════════════════════════════════════════════════════════════

    /** URL slug — e.g. 'ipr-seminar-2026' → page lives at /seminar/ipr-seminar-2026 */
    slug: { type: String, default: 'ipr-seminar-2026' },

    /**
     * Page publish status.
     *  'published'   → publicly visible at /seminar/<slug>
     *  'draft'       → saved in DB but returns 404 for public visitors
     *  'unpublished' → same as draft; admin intent is "taken down"
     * Default is 'published' so existing records (which have no status) stay live.
     */
    status: {
      type: String,
      enum: ['published', 'draft', 'unpublished'],
      default: 'published',
    },

    /** 'dark' | 'light'  — controls which template is rendered */
    theme: { type: String, enum: ['dark', 'light'], default: 'dark' },

    /** Top-bar strip / header button */
    topBarIsShow: { type: Boolean, default: true },
    topBarButtonText: { type: String, default: 'IPR Seminar — Oct 9, 2026' },
    // topBarButtonLink is intentionally removed — the link is always /seminar/<slug>

    /** Brochure PDF for download buttons across the page */
    brochurePdfUrl: { type: String, default: '/images/brochure/IPS_IPR_International_Seminar_Brochure.pdf' },
    brochureDownloadName: { type: String, default: 'IPS-IPR-Seminar-Brochure.pdf' },

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: hero
    // ══════════════════════════════════════════════════════════════════════════

    heroBadgeText: {
      type: String,
      default: 'IPS Business School & IPS College · 9 October 2026',
    },
    heroSuperText: { type: String, default: 'International Seminar on' },
    heroTitleLine1: { type: String, default: 'Intellectual' },
    heroTitleLine2: { type: String, default: 'Property' },
    heroTitleHighlight: { type: String, default: 'Rights' },
    heroSubtitle: { type: String, default: 'Ideas Today. Impact Tomorrow.' },
    heroDescription: {
      type: String,
      default:
        'Understand Patents, Copyrights, Trademarks, Designs and Intellectual Property Rights — and how they can help protect ideas, creativity and innovation.',
    },

    // Event meta chips
    heroDate: { type: String, default: '9 October 2026' },
    heroDaytime: { type: String, default: 'Friday · 8:00 AM onwards' },
    heroVenueName: { type: String, default: 'IPS College' },
    heroVenueCity: { type: String, default: 'Jaipur, Rajasthan' },
    heroEntryBadge: { type: String, default: 'Free Entry' },
    heroEntryBadgeSub: { type: String, default: 'All Welcome' },

    // Register CTA button
    heroRegisterButtonText: { type: String, default: 'Register Now — Free' },
    heroRegisterButtonLink: { type: String, default: 'https://forms.gle/1BjmWr9vKXE5ckx29' },

    // Brochure button (label only — PDF comes from config section)
    heroBrochureButtonText: { type: String, default: 'Download Brochure' },

    // Poster image + download
    heroPosterImageUrl: { type: String, default: '/images/poster-img.webp' },
    heroPosterDownloadText: { type: String, default: 'Download Poster' },

    // Trust badges below buttons
    heroTrustBadges: [{ type: String }], // e.g. ['AICTE Approved', 'RTU Affiliated']

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: topics
    // ══════════════════════════════════════════════════════════════════════════

    topicsHeading: { type: String, default: 'Know What You Can Protect.' },
    topicsSubheading: { type: String, default: 'Topics Covered' },
    topics: [IprTopicSchema],

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: about
    // ══════════════════════════════════════════════════════════════════════════

    aboutSuperText: { type: String, default: 'About the Event' },
    aboutHeading: { type: String, default: 'Your Idea Has Value. Do You Know How to Protect It?' },
    aboutParagraph1: {
      type: String,
      default:
        'Whether you are a student, researcher, entrepreneur, creator or professional, understanding Intellectual Property Rights can help you recognise, protect and manage the value behind your ideas.',
    },
    aboutParagraph2: {
      type: String,
      default:
        'Presented by IPS Business School & IPS College, Jaipur, this International Seminar brings together experts and curious minds to explore how IP rights protect creativity, fuel innovation and build competitive advantage — completely free for all attendees.',
    },
    aboutImageUrl: { type: String, default: '/images/event-img-2.webp' },
    aboutAttendeesCount: { type: String, default: '500+' },
    aboutAttendeesLabel: { type: String, default: 'Attendees' },
    aboutAttendeesSubLabel: { type: String, default: 'Expected' },

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: takeaways
    // ══════════════════════════════════════════════════════════════════════════

    takeawaysSuperText: { type: String, default: 'What You Will Take Away' },
    takeawaysHeading: { type: String, default: 'Turn Your Ideas Into Protected Assets.' },
    takeawaysDescription: {
      type: String,
      default:
        'Leave the seminar with actionable knowledge and a stronger understanding of how to protect and leverage your intellectual property.',
    },
    takeaways: [IprTakeawaySchema],

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: audience
    // ══════════════════════════════════════════════════════════════════════════

    audienceSuperText: { type: String, default: 'Open For All' },
    audienceHeading: { type: String, default: 'This Seminar Is For You If You Are…' },
    audienceDescription: {
      type: String,
      default: 'The IPR Seminar welcomes everyone with a curious mind and an interest in protecting ideas.',
    },
    audience: [IprAudienceSchema],

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: agenda
    // ══════════════════════════════════════════════════════════════════════════

    agendaSuperText: { type: String, default: 'What to Expect' },
    agendaHeading: { type: String, default: 'One Seminar. Multiple Perspectives.' },
    agendaRegisterButtonText: { type: String, default: 'Register now →' },
    agenda: [IprAgendaItemSchema],

    // Event highlights cards (shown in the event highlights section)
    highlights: [IprEventHighlightSchema],

    // Event details table
    eventDetailRows: [
      {
        label: { type: String },
        value: { type: String },
        order: { type: Number, default: 0 },
      },
    ],
    eventDetailsSuperText: { type: String, default: 'Mark Your Calendar' },
    eventDetailsHeading: { type: String, default: 'Event Details' },

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: faq
    // ══════════════════════════════════════════════════════════════════════════

    faqSuperText: { type: String, default: 'Got Questions?' },
    faqHeading: { type: String, default: 'Frequently Asked Questions' },
    faqDescription: {
      type: String,
      default: 'Everything you need to know before registering for the seminar.',
    },
    faqs: [IprFAQSchema],

    // ══════════════════════════════════════════════════════════════════════════
    // SECTION: cta
    // Bottom call-to-action banner
    // ══════════════════════════════════════════════════════════════════════════

    ctaBadgeText: { type: String, default: '9 October 2026 · IPS College, Jaipur' },
    ctaHeading: { type: String, default: 'Have an Idea? Know How to Protect It.' },
    ctaDescription: {
      type: String,
      default:
        "Don't miss the opportunity to understand Intellectual Property Rights and their relevance to innovation, creativity and business.",
    },
    ctaRegisterButtonText: { type: String, default: 'Register Now →' },
    ctaRegisterButtonLink: { type: String, default: 'https://forms.gle/1BjmWr9vKXE5ckx29' },
    ctaBrochureButtonText: { type: String, default: 'Download Brochure' },
    ctaAudienceTags: [{ type: String }], // ['Students', 'Researchers', ...]
  },
  {
    timestamps: true,
  }
);

const IprSeminarPageContent =
  mongoose.models.IprSeminarPageContent ||
  mongoose.model('IprSeminarPageContent', IprSeminarPageContentSchema);

export default IprSeminarPageContent;

import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const AdvisorSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  designation:  { type: String, default: '' },
  organization: { type: String, default: '' },
  description:  { type: String, default: '' },
  initials:     { type: String, default: '' }, // kept for future avatar use
  order:        { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const BoardOfAdvisorsPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     *   'banner'   — hero banner (title, image, position)
     *   'advisors' — section header text + advisor cards array
     *   'bridging' — bottom CTA section text + button
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'advisors', 'bridging'],
    },

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerTitle:    { type: String, default: 'Board of Advisors' },
    bannerImageUrl: { type: String, default: 'images/about/board-of-advisor-img.webp' },
    bannerPosition: { type: String, default: 'object-center' },

    // ── Advisors section header ────────────────────────────────────────────────
    ghostText:       { type: String, default: 'Corporate Leadership' },
    sectionHeading:  { type: String, default: 'Guided by Industry Legends' },
    sectionSubtitle: {
      type: String,
      default:
        'The strategic trajectory, curriculum relevance, and Industrial association at IPS Business School are actively guided by a distinguished Board of Advisors comprising banking leaders, healthcare chairmen, asset managers, and academic visionaries.',
    },
    advisors: [AdvisorSchema],

    // ── Bridging Theory section ────────────────────────────────────────────────
    bridgingHeading:   { type: String, default: 'Bridging Classroom Theory & Corporate Reality' },
    // The first two words before "Classroom Theory" are styled differently on the frontend.
    // We store the full heading and split on the frontend as before.
    bridgingParagraph: {
      type: String,
      default:
        'Our Board of Advisors conducts periodic curriculum reviews, delivers executive masterclasses, and facilitates direct On Job Training (OJT) opportunities with Fortune 500 companies and leading Indian MNCs.',
    },
    bridgingButtonText: { type: String, default: 'Explore Placements' },
    bridgingButtonHref: { type: String, default: '/placements' },
  },
  { timestamps: true },
);

const BoardOfAdvisorsPageContent =
  mongoose.models.BoardOfAdvisorsPageContent ||
  mongoose.model('BoardOfAdvisorsPageContent', BoardOfAdvisorsPageContentSchema);

export default BoardOfAdvisorsPageContent;

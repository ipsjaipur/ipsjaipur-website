import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const AboutWhyChooseItemSchema = new mongoose.Schema({
  boldText: { type: String, required: true },  // e.g. "Excelling at Research"
  description: { type: String, required: true },  // paragraph after the bold lead
  order: { type: Number, default: 0 },
});

const AboutSidebarVideoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const AboutPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     * Sections:
     *   'content'  — banner + main text content
     *   'sidebar'  — YouTube videos in the right sidebar
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['content', 'sidebar'],
    },

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerTitle: { type: String, default: 'IPS Ideology' },
    bannerImageUrl: { type: String, default: 'images/about/about-us-image-3.webp' },
    bannerPosition: { type: String, default: 'object-bottom' },

    // ── Page header (inside the bordered box) ─────────────────────────────────
    pageHeading: { type: String, default: 'IPS IDEOLOGY' },

    // ── Quote ─────────────────────────────────────────────────────────────────
    quoteText: {
      type: String,
      default:
        '"Discover who you really are. Think independently. Find your own voice. IPS BUSINESS SCHOOL is one of the Rajasthan\'s elite business schools shaping business practice and transforming careers across the globe."',
    },

    // ── Description paragraphs (plain HTML-safe strings) ──────────────────────
    descriptionParagraphs: [{ type: String }],

    // ── "Why Choose" sub-section ──────────────────────────────────────────────
    whyChooseHeading: { type: String, default: 'Why Choose IPS BUSINESS SCHOOL?' },
    whyChooseItems: [AboutWhyChooseItemSchema],

    // ── Sidebar section ────────────────────────────────────────────────────────
    sidebarVideos: [AboutSidebarVideoSchema],
  },
  {
    timestamps: true,
  },
);

const AboutPageContent =
  mongoose.models.AboutPageContent ||
  mongoose.model('AboutPageContent', AboutPageContentSchema);

export default AboutPageContent;

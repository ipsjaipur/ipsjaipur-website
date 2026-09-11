import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const IpsSutraAdvantageSchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  text:     { type: String, required: true },
  color:    { type: String, default: 'from-orange-500 to-orange-600' }, // tailwind gradient class
  order:    { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const IpsSutraPageContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['content', 'advantages'],
    },

    // ── Content Section ────────────────────────────────────────────────────────
    // Banner
    bannerTitle:    { type: String, default: 'आईपीएस सूत्र' },
    bannerImageUrl: { type: String, default: 'images/about/ips-sutra-banner-img-2.webp' },

    // Main content heading + paragraphs
    contentHeading: { type: String, default: 'आईपीएस सूत्र' },
    // Paragraphs stored as array of strings (HTML-safe, supports <strong> etc.)
    contentParagraphs: [{ type: String }],

    // CTA button
    ctaText: { type: String, default: 'Start Journey Today' },
    ctaHref: { type: String, default: 'https://admissions.ipsedu.in/' },

    // Side image
    sideImageUrl: { type: String, default: 'images/about/bba-ab.webp' },
    sideImageAlt: { type: String, default: 'IPS Sutra - Skill Development Program' },

    // ── Advantages Section ─────────────────────────────────────────────────────
    advantagesHeading:       { type: String, default: 'IPS Advantages' },
    advantagesApplyText:     { type: String, default: 'Apply Now' },
    advantagesApplyHref:     { type: String, default: 'https://admissions.ipsedu.in/' },
    advantages:              [IpsSutraAdvantageSchema],
  },
  { timestamps: true },
);

const IpsSutraPageContent =
  mongoose.models.IpsSutraPageContent ||
  mongoose.model('IpsSutraPageContent', IpsSutraPageContentSchema);

export default IpsSutraPageContent;

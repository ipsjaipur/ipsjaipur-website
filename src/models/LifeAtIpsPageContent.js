import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

/**
 * One "activity" section on the Life@IPS page.
 * Displayed as alternating left/right blocks — image carousel on one side,
 * title + paragraph on the other.
 */
const ActivitySectionSchema = new mongoose.Schema({
  title:     { type: String, required: true },       // e.g. "ZEPHYR Hosted by IPS COLLEGE"
  paragraph: { type: String, default: '' },           // descriptive text shown beside the slider
  images:    [{ type: String }],                      // array of image URLs / paths
  order:     { type: Number, default: 0 },            // sort order
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const LifeAtIpsPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     * Sections:
     *   'banner'     — hero banner image, title, position
     *   'activities' — the list of activity sections (Zephyr, Seminars, etc.)
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'activities'],
    },

    // ── Banner (section: 'banner') ─────────────────────────────────────────────
    bannerTitle:    { type: String, default: 'Life@ips' },
    bannerImageUrl: { type: String, default: 'images/about/life-of-ips-img.webp' },
    bannerPosition: { type: String, default: 'object-center' },

    // ── Activities (section: 'activities') ────────────────────────────────────
    activities: [ActivitySectionSchema],
  },
  {
    timestamps: true,
  },
);

const LifeAtIpsPageContent =
  mongoose.models.LifeAtIpsPageContent ||
  mongoose.model('LifeAtIpsPageContent', LifeAtIpsPageContentSchema);

export default LifeAtIpsPageContent;

import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

/**
 * A single job opening / position listing.
 */
const JobOpeningSchema = new mongoose.Schema({
  department: { type: String, default: '' }, // e.g. "SENIOR LECTURERS / LECTURERS"
  roles:      [{ type: String }],             // e.g. ["Marketing", "HR", "Finance"]
  order:      { type: Number, default: 0 },
});

/**
 * A single "why join us" / perks bullet point.
 */
const PerkSchema = new mongoose.Schema({
  text:  { type: String, default: '' },
  order: { type: Number, default: 0 },
});

/**
 * A single "we are looking for" requirement bullet.
 */
const RequirementSchema = new mongoose.Schema({
  text:  { type: String, default: '' },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const CareerPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. `section` is the unique key.
     *   'banner'       — hero banner image + title + position
     *   'intro'        — introductory paragraph about IPS
     *   'requirements' — "We are looking for" bullets
     *   'perks'        — "What we offer / If you have it in you" bullets
     *   'openings'     — Job opening groups (department + roles list)
     *   'contact'      — How to apply: email, phone
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'intro', 'requirements', 'perks', 'openings', 'contact'],
    },

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerTitle:    { type: String, default: 'Career @ IPS BUSINESS SCHOOL' },
    bannerImageUrl: { type: String, default: '' },
    bannerPosition: { type: String, default: 'object-center' },

    // ── Intro ─────────────────────────────────────────────────────────────────
    introParagraph: {
      type: String,
      default:
        'IPS BUSINESS SCHOOL has been a flag bearer pioneering the legacy of industry oriented Management Education and an undisputed leader in Corporate connection in North India for over a period of 17+ glorious years.',
    },

    // ── Requirements ─────────────────────────────────────────────────────────
    requirementsHeading: {
      type: String,
      default: 'We are looking for the professionals who are:',
    },
    requirements: [RequirementSchema],

    // ── Perks ─────────────────────────────────────────────────────────────────
    perksHeading: {
      type: String,
      default: 'If you have it in you, IPS BUSINESS SCHOOL is the right place for you',
    },
    perks: [PerkSchema],

    // ── Openings ──────────────────────────────────────────────────────────────
    openingsHeading: { type: String, default: 'Current Openings' },
    openings:        [JobOpeningSchema],

    // ── Contact ───────────────────────────────────────────────────────────────
    contactHeading: { type: String, default: 'You may apply to' },
    contactEmail:   { type: String, default: 'careers@ipsedu.in' },
    contactPhone:   { type: String, default: '+91-9829047517' },
  },
  { timestamps: true },
);

// Force recompile on schema change — safe in dev (hot reload)
if (mongoose.models.CareerPageContent) {
  delete mongoose.models.CareerPageContent;
}

const CareerPageContent = mongoose.model('CareerPageContent', CareerPageContentSchema);

export default CareerPageContent;

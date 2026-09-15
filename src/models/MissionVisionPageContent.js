import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

/**
 * Vision / Mission card sub-schema.
 * Stores text content only — icons and colour tokens are static in the UI.
 */
const VisionMissionCardSchema = new mongoose.Schema({
  /**
   * Must be one of the two known card types so the frontend knows which icon
   * and colour scheme to render.
   */
  cardType: {
    type: String,
    required: true,
    enum: ['vision', 'mission'],
  },
  label: { type: String, default: '' },     // e.g. "Our Vision"
  title: { type: String, default: '' },     // bold heading inside card
  description: { type: String, default: '' }, // paragraph body
  order: { type: Number, default: 0 },
});

/**
 * Core value card sub-schema.
 * Icon and colour tokens are static in the UI — only text is stored.
 */
const CoreValueSchema = new mongoose.Schema({
  /**
   * Must match one of the 4 known icon keys so the frontend can render the
   * correct Lucide icon and colour palette.
   */
  iconKey: {
    type: String,
    required: true,
    enum: ['integrity', 'holistic_health', 'social_responsibility', 'agility_innovation'],
  },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const MissionVisionPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. `section` is the unique key.
     *   'banner'           — hero banner image + title + position
     *   'institutional'    — "Shaping Practice" heading, quote, paragraphs, side image
     *   'vision_mission'   — Vision & Mission cards
     *   'core_values'      — Core Values grid
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'institutional', 'vision_mission', 'core_values'],
    },

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerTitle:    { type: String, default: 'Mission & Vision' },
    bannerImageUrl: { type: String, default: '' },
    bannerPosition: { type: String, default: 'object-center' },

    // ── Institutional Section ──────────────────────────────────────────────────
    institutionalHeading:  { type: String, default: 'Shaping Practice & Transforming Careers' },
    institutionalQuote:    {
      type: String,
      default:
        '"Discover who you really are. Think independently. Find your own voice. IPS BUSINESS SCHOOL is one of Rajasthan\'s elite business schools shaping business practice and transforming careers across the globe."',
    },
    institutionalParagraph1: {
      type: String,
      default:
        "As one of Rajasthan's leading Business Schools, IPS BUSINESS SCHOOL brings together people, cultures and ideas to change lives and to transform organizations. A global perspective and cultural diversity are reflected in all aspects of our research and teaching.",
    },
    institutionalParagraph2: {
      type: String,
      default:
        'For over 18 years, IPS has been at the forefront of Management Education, developing and inspiring business leaders who strive to make a deep, positive and lasting impact on the people, companies, and society they serve.',
    },
    // Cloudinary URL for the right-side image in the Institutional section
    institutionalImageUrl: { type: String, default: '' },
    institutionalImageAlt: {
      type: String,
      default: 'Shaping Practice & Transforming Careers - IPS Business School',
    },

    // ── Vision & Mission Section ────────────────────────────────────────────────
    visionMissionCards: [VisionMissionCardSchema],

    // ── Core Values Section ─────────────────────────────────────────────────────
    coreValuesSectionTitle:    { type: String, default: 'Our Core Values' },
    coreValuesSectionSubtitle: { type: String, default: 'The IPS DNA' }, // large background watermark text
    coreValues:                [CoreValueSchema],
  },
  {
    timestamps: true,
  },
);

// Force recompile when schema changes — safe because we fully replace the schema
if (mongoose.models.MissionVisionPageContent) {
  delete mongoose.models.MissionVisionPageContent;
}

const MissionVisionPageContent = mongoose.model(
  'MissionVisionPageContent',
  MissionVisionPageContentSchema,
);

export default MissionVisionPageContent;

import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

/**
 * A sidebar video entry — shown in CourseQuickLinks.
 */
const VideoSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  url:   { type: String, default: '' },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const EducationLoanPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. `section` is the unique key.
     *   'banner'      — hero banner image + title + position
     *   'main'        — "Education Loan Facilities" heading, image, intro paragraphs, notes
     *   'assistance'  — "Education Loan Assistance" box: intro, key features, eligibility, documents
     *   'videos'      — sidebar video URLs
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'main', 'assistance', 'videos'],
    },

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerTitle:    { type: String, default: 'Education loan' },
    bannerImageUrl: { type: String, default: '' },
    bannerPosition: { type: String, default: 'object-top' },

    // ── Main content (Education Loan Facilities) ──────────────────────────────
    mainHeading:       { type: String, default: 'Education Loan Facilities' },
    mainImageUrl:      { type: String, default: '' }, // image shown after the heading
    introParagraphs:   [{ type: String }],              // array of paragraph strings
    boldParagraph:     { type: String, default: '' },  // bold closing paragraph
    vidyaLakshmiNote:  { type: String, default: '' },  // italic note about banks
    officialsNote:     { type: String, default: '' },  // italic note about officials

    // ── Assistance (Education Loan Assistance) ───────────────────────────────
    assistanceHeading:  { type: String, default: 'Education Loan Assistance' },
    assistanceIntro:    { type: String, default: '' },
    keyFeaturesHeading: { type: String, default: 'Key Features' },
    keyFeatures:        [{ type: String }],
    eligibilityHeading: { type: String, default: 'Eligibility Criteria:' },
    eligibilityCriteria: [{ type: String }],
    documentsHeading:   { type: String, default: 'Students may access the same and avail the facilities' },
    documents:          [{ type: String }],

    // ── Videos ─────────────────────────────────────────────────────────────────
    videoUrls: [VideoSchema],
  },
  { timestamps: true },
);

// Force recompile on schema change — safe in dev (hot reload)
if (mongoose.models.EducationLoanPageContent) {
  delete mongoose.models.EducationLoanPageContent;
}

const EducationLoanPageContent = mongoose.model(
  'EducationLoanPageContent',
  EducationLoanPageContentSchema,
);

export default EducationLoanPageContent;

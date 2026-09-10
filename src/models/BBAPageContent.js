import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const BBABannerSlideSchema = new mongoose.Schema({
  src:      { type: String, required: true },
  alt:      { type: String, default: '' },
  priority: { type: Boolean, default: false },
  order:    { type: Number, default: 0 },
});

const BBAHighlightSchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  text:     { type: String, required: true },
  hindiText:{ type: String, default: '' },
  order:    { type: Number, default: 0 },
});

const BBASyllabusItemSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  pdfFile: { type: String, required: true },
  order:   { type: Number, default: 0 },
});

const BBASpecializationSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  order: { type: Number, default: 0 },
});

const BBAEligibilityPointSchema = new mongoose.Schema({
  text:  { type: String, required: true },
  order: { type: Number, default: 0 },
});

const BBAEligibilityPrioritySchema = new mongoose.Schema({
  text:  { type: String, required: true },
  order: { type: Number, default: 0 },
});

const BBAAdmissionStepSchema = new mongoose.Schema({
  label:       { type: String, required: true },
  description: { type: String, required: true },
  linkText:    { type: String, default: '' },
  linkHref:    { type: String, default: '' },
  order:       { type: Number, default: 0 },
});

const BBADocumentSchema = new mongoose.Schema({
  text:   { type: String, required: true },
  isBold: { type: Boolean, default: false },
  order:  { type: Number, default: 0 },
});

const BBASelectionStepSchema = new mongoose.Schema({
  stepLabel:   { type: String, required: true },
  description: { type: String, required: true },
  order:       { type: Number, default: 0 },
});

const BBAFAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  order:    { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const BBAPageContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: [
        'banner',
        'overview',
        'syllabus',
        'specializations',
        'admissionProcess',
        'documentsRequired',
        'selectionProcedure',
        'feeStructure',
        'faq',
        'sidebar',
      ],
    },

    // ── Banner ──────────────────────────────────────────────────────────────────
    bannerSlides: [BBABannerSlideSchema],

    // ── Overview ────────────────────────────────────────────────────────────────
    overviewTitle:    { type: String, default: 'BACHELOR OF BUSINESS ADMINISTRATION (BBA)' },
    overviewDuration: { type: String, default: '3 Years (6 Semesters)' },
    overviewCaption:  { type: String, default: '(Approved by AICTE New Delhi, Government of India)' },
    rtuLogoUrl:       { type: String, default: '' },
    aicteLogoUrl:     { type: String, default: '' },
    approvalImageUrl: { type: String, default: '' },
    approvalImageCaption: { type: String, default: '(Approved by AICTE New Delhi - Govt of INDIA)' },
    highlightsHeading:    { type: String, default: 'BBA HIGHLIGHTS:' },
    highlights:           [BBAHighlightSchema],
    descriptionParagraphs: [{ type: String }],
    whyIpsHeading: { type: String, default: 'Why IPS Business School is Recognized Among the Best Colleges for BBA in Jaipur' },
    whyIpsIntro:   { type: String, default: '' },
    whyIpsPoints:  [{ type: String }],

    // ── Syllabus ────────────────────────────────────────────────────────────────
    syllabusHeading: { type: String, default: 'SYLLABUS:' },
    syllabusItems:   [BBASyllabusItemSchema],

    // ── Specializations + Eligibility ───────────────────────────────────────────
    specializationsHeading: { type: String, default: 'SPECIALIZATIONS AVAILABLE:' },
    specializations:        [BBASpecializationSchema],
    eligibilityHeading:     { type: String, default: 'Eligibility:' },
    eligibilityPoints:      [BBAEligibilityPointSchema],
    eligibilityPriorities:  [BBAEligibilityPrioritySchema],

    // ── Admission Process ───────────────────────────────────────────────────────
    admissionHeading: { type: String, default: 'How to Apply:' },
    admissionIntro:   { type: String, default: '' },
    admissionSteps:   [BBAAdmissionStepSchema],

    // ── Documents Required ──────────────────────────────────────────────────────
    documentsHeading: { type: String, default: 'Documents Required:' },
    documents:        [BBADocumentSchema],

    // ── Selection Procedure ─────────────────────────────────────────────────────
    selectionHeading: { type: String, default: 'Selection Procedure:' },
    selectionSteps:   [BBASelectionStepSchema],

    // ── Fee Structure ───────────────────────────────────────────────────────────
    feeHeading:     { type: String, default: 'Fee Structure of BBA' },
    feeEnglishText: { type: String, default: '' },
    feeHindiText:   { type: String, default: '' },

    // ── FAQ ─────────────────────────────────────────────────────────────────────
    faqHeading: { type: String, default: 'Frequently Asked Questions' },
    faqs:       [BBAFAQSchema],

    // ── Sidebar ─────────────────────────────────────────────────────────────────
    sidebarVideos: [
      {
        url:   { type: String, required: true },
        title: { type: String, default: '' },
        order: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true },
);

const BBAPageContent =
  mongoose.models.BBAPageContent ||
  mongoose.model('BBAPageContent', BBAPageContentSchema);

export default BBAPageContent;

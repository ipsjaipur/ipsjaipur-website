import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const BCABannerSlideSchema = new mongoose.Schema({
  src:      { type: String, required: true },
  alt:      { type: String, default: '' },
  priority: { type: Boolean, default: false },
  order:    { type: Number, default: 0 },
});

const BCAHighlightSchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  text:     { type: String, required: true },
  hindiText:{ type: String, default: '' },
  order:    { type: Number, default: 0 },
});

const BCASyllabusItemSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  pdfFile: { type: String, required: true },
  order:   { type: Number, default: 0 },
});

const BCASpecializationSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  order: { type: Number, default: 0 },
});

const BCAEligibilityPointSchema = new mongoose.Schema({
  text:  { type: String, required: true },
  order: { type: Number, default: 0 },
});

const BCAEligibilityPrioritySchema = new mongoose.Schema({
  text:  { type: String, required: true },
  order: { type: Number, default: 0 },
});

const BCAAdmissionStepSchema = new mongoose.Schema({
  label:       { type: String, required: true },
  description: { type: String, required: true },
  linkText:    { type: String, default: '' },
  linkHref:    { type: String, default: '' },
  order:       { type: Number, default: 0 },
});

const BCADocumentSchema = new mongoose.Schema({
  text:   { type: String, required: true },
  isBold: { type: Boolean, default: false },
  order:  { type: Number, default: 0 },
});

const BCASelectionStepSchema = new mongoose.Schema({
  stepLabel:   { type: String, required: true },
  description: { type: String, required: true },
  order:       { type: Number, default: 0 },
});

const BCAFAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  order:    { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const BCAPageContentSchema = new mongoose.Schema(
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
    bannerSlides: [BCABannerSlideSchema],

    // ── Overview ────────────────────────────────────────────────────────────────
    overviewTitle:    { type: String, default: 'Bachelor of Computer Applications (BCA)' },
    overviewDuration: { type: String, default: '3 Years' },
    overviewCaption:  { type: String, default: '(Approved by AICTE New Delhi, Government of India)' },
    rtuLogoUrl:       { type: String, default: '' },
    aicteLogoUrl:     { type: String, default: '' },
    approvalImageUrl: { type: String, default: '' },
    approvalImageCaption: { type: String, default: '(Approved by AICTE New Delhi - Govt of INDIA)' },
    highlightsHeading:    { type: String, default: 'BCA HIGHLIGHTS:' },
    highlights:           [BCAHighlightSchema],
    descriptionParagraphs: [{ type: String }],
    whyIpsHeading: { type: String, default: 'Why IPS Business School is Recognized as the Best BCA College in Jaipur' },
    whyIpsIntro:   { type: String, default: '' },
    whyIpsPoints:  [{ type: String }],

    // ── Syllabus ────────────────────────────────────────────────────────────────
    syllabusHeading: { type: String, default: 'SYLLABUS:' },
    syllabusItems:   [BCASyllabusItemSchema],

    // ── Specializations + Eligibility ───────────────────────────────────────────
    specializationsHeading: { type: String, default: 'SPECIALIZATIONS AVAILABLE:' },
    specializations:        [BCASpecializationSchema],
    eligibilityHeading:     { type: String, default: 'Eligibility:' },
    eligibilityPoints:      [BCAEligibilityPointSchema],
    eligibilityPriorities:  [BCAEligibilityPrioritySchema],

    // ── Admission Process ───────────────────────────────────────────────────────
    admissionHeading: { type: String, default: 'How to Apply:' },
    admissionIntro:   { type: String, default: '' },
    admissionSteps:   [BCAAdmissionStepSchema],

    // ── Documents Required ──────────────────────────────────────────────────────
    documentsHeading: { type: String, default: 'Documents Required:' },
    documents:        [BCADocumentSchema],

    // ── Selection Procedure ─────────────────────────────────────────────────────
    selectionHeading: { type: String, default: 'Selection Procedure:' },
    selectionSteps:   [BCASelectionStepSchema],

    // ── Fee Structure ───────────────────────────────────────────────────────────
    feeHeading:     { type: String, default: 'Fee Structure of BCA' },
    feeEnglishText: { type: String, default: '' },
    feeHindiText:   { type: String, default: '' },

    // ── FAQ ─────────────────────────────────────────────────────────────────────
    faqHeading: { type: String, default: 'Frequently Asked Questions' },
    faqs:       [BCAFAQSchema],

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

const BCAPageContent =
  mongoose.models.BCAPageContent ||
  mongoose.model('BCAPageContent', BCAPageContentSchema);

export default BCAPageContent;

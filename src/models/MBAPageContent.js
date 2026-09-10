import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const MBABannerSlideSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  priority: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

const MBAHighlightSchema = new mongoose.Schema({
  iconName: { type: String, required: true }, // lucide icon name e.g. 'CheckCircle2'
  text: { type: String, required: true },
  hindiText: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

const MBASyllabusItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pdfFile: { type: String, required: true }, // filename or full URL
  order: { type: Number, default: 0 },
});

const MBASpecializationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const MBAEligibilityPointSchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const MBAEligibilityPrioritySchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const MBAAdmissionStepSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g. 'Online'
  description: { type: String, required: true },
  linkText: { type: String, default: '' },
  linkHref: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

const MBADocumentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isBold: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

const MBASelectionStepSchema = new mongoose.Schema({
  stepLabel: { type: String, required: true }, // e.g. 'Step 1'
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const MBAFAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const MBAPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     */
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

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerSlides: [MBABannerSlideSchema],

    // ── Overview (highlights + description paragraphs) ─────────────────────────
    overviewTitle: { type: String, default: 'MASTER IN BUSINESS ADMINISTRATION (MBA)' },
    overviewDuration: { type: String, default: '2 Years' },
    overviewCaption: {
      type: String,
      default: '(Approved by AICTE New Delhi, Government of Rajasthan & and Affiliated with RTU Kota)',
    },
    // Header logos
    rtuLogoUrl: { type: String, default: '' },
    aicteLogoUrl: { type: String, default: '' },
    // Decorative image between highlights and description
    approvalImageUrl: { type: String, default: '' },
    approvalImageCaption: {
      type: String,
      default: '(Approved by AICTE New Delhi - Govt of INDIA)',
    },
    highlightsHeading: { type: String, default: 'MBA HIGHLIGHTS:' },
    highlights: [MBAHighlightSchema],
    // Description paragraphs stored as JSON array of strings
    descriptionParagraphs: [{ type: String }],
    // "Why IPS" sub-section
    whyIpsHeading: { type: String, default: 'Why IPS Business School is Recognized as the Best MBA College in Jaipur' },
    whyIpsIntro: { type: String, default: '' },
    whyIpsPoints: [{ type: String }], // array of HTML-safe strings (bold lead: text)

    // ── Syllabus ───────────────────────────────────────────────────────────────
    syllabusHeading: { type: String, default: 'SYLLABUS:' },
    syllabusItems: [MBASyllabusItemSchema],

    // ── Specializations + Eligibility (combined section) ──────────────────────
    specializationsHeading: {
      type: String,
      default: 'SPECIALIZATIONS ARE AVAILABLE IN FOLLOWING AREA:',
    },
    specializations: [MBASpecializationSchema],
    eligibilityHeading: { type: String, default: 'Eligibility:' },
    eligibilityPoints: [MBAEligibilityPointSchema],
    eligibilityPriorities: [MBAEligibilityPrioritySchema],

    // ── Admission Process ──────────────────────────────────────────────────────
    admissionHeading: { type: String, default: 'How to Apply:' },
    admissionIntro: { type: String, default: '' },
    admissionSteps: [MBAAdmissionStepSchema],

    // ── Documents Required ─────────────────────────────────────────────────────
    documentsHeading: { type: String, default: 'Documents Required:' },
    documents: [MBADocumentSchema],

    // ── Selection Procedure ────────────────────────────────────────────────────
    selectionHeading: { type: String, default: 'Selection Procedure:' },
    selectionSteps: [MBASelectionStepSchema],

    // ── Fee Structure ──────────────────────────────────────────────────────────
    feeHeading: { type: String, default: 'Fee Structure of MBA' },
    feeEnglishText: { type: String, default: '' },
    feeHindiText: { type: String, default: '' },

    // ── FAQ ────────────────────────────────────────────────────────────────────
    faqHeading: { type: String, default: 'Frequently Asked Questions' },
    faqs: [MBAFAQSchema],

    // ── Sidebar ────────────────────────────────────────────────────────────────
    sidebarVideos: [
      {
        url: { type: String, required: true },
        title: { type: String, default: '' },
        order: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const MBAPageContent =
  mongoose.models.MBAPageContent ||
  mongoose.model('MBAPageContent', MBAPageContentSchema);

export default MBAPageContent;

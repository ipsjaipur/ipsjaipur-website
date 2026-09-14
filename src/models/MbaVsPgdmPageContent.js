import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const ComparisonRowSchema = new mongoose.Schema({
  dimension: { type: String, required: true },
  universityMBA: { type: String, required: true },
  autonomousPGDM: { type: String, required: true },
  ipsHybridMBA: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const FeatureCardSchema = new mongoose.Schema({
  iconName: {
    type: String,
    required: true,
    enum: ['GraduationCap', 'Briefcase', 'TrendingUp', 'Award', 'CheckCircle2', 'Star', 'Target', 'Zap'],
    default: 'GraduationCap',
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const MbaVsPgdmPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     * Sections:
     *   'banner'      — banner image + title + position
     *   'content'     — left/right content section (headings, paragraphs, cards, CTA)
     *   'comparison'  — comparison matrix table rows + headings
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'content', 'comparison'],
    },

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerTitle: { type: String, default: 'MBA vs. PGDM' },
    bannerImageUrl: { type: String, default: '' },
    bannerPosition: { type: String, default: 'object-[50%_35%]' },

    // ── Content Section ────────────────────────────────────────────────────────
    // Background watermark text
    backgroundWatermarkText: { type: String, default: 'Strategic Decision' },

    // Main heading
    mainHeading: { type: String, default: 'University MBA vs. Autonomous PGDM' },

    // Intro paragraph (first paragraph)
    introParagraph: {
      type: String,
      default:
        'Making the right choice between a Master of Business Administration (MBA) degree and a Post Graduate Diploma in Management (PGDM) is pivotal for management aspirants.',
    },

    // Second paragraph (mentions traditional university MBA + PGDM)
    paragraph2: {
      type: String,
      default:
        'While <strong>traditional university MBA degrees</strong> provide statutory legal security, government job eligibility, and worldwide academic recognition for Ph.D. studies, autonomous PGDM diplomas emphasize practical industry exposure.',
    },

    // Third paragraph (mentions IPS Hybrid Solution)
    paragraph3: {
      type: String,
      default:
        '<strong>IPS Business School</strong>, this dilemma is resolved by offering the <strong>IPS Hybrid Solution</strong> - a program that delivers maximum ROI at an affordable fee.',
    },

    // Approval card 1 (AICTE)
    card1Title: { type: String, default: 'AICTE Approved' },
    card1Subtitle: { type: String, default: 'Govt. of India Statutory Body' },
    card1SubtitleColor: { type: String, default: 'blue' }, // 'blue' | 'orange'
    card1LogoUrl: { type: String, default: '' }, // Cloudinary URL for AICTE logo

    // Approval card 2 (RTU)
    card2Title: { type: String, default: 'RTU Affiliated' },
    card2Subtitle: { type: String, default: 'UGC Recognized University Degree' },
    card2SubtitleColor: { type: String, default: 'orange' },
    card2LogoUrl: { type: String, default: '' }, // Cloudinary URL for RTU logo

    // Right dark card — IPS Hybrid Solution
    hybridBadgeText: { type: String, default: 'The IPS Hybrid Solution' },
    hybridHeading: { type: String, default: 'Get the Best of Both Worlds' },
    hybridDescription: {
      type: String,
      default:
        'Why compromise? At IPS Business School, students earn a <strong class="text-white">UGC-recognized University MBA Degree*</strong> while undergoing <strong class="text-white">**100% Practical Corporate OJTA*</strong>, attends, and executive mentorship - delivering maximum ROI at an affordable fee.',
    },
    hybridCtaText: { type: String, default: 'Explore MBA Program' },
    hybridCtaHref: { type: String, default: '/mba' },

    // ── Comparison Matrix Section ──────────────────────────────────────────────
    comparisonBackgroundWatermarkText: { type: String, default: 'Comparison Matrix' },
    comparisonHeading: { type: String, default: 'Key Differences at a Glance' },
    // Table column headers
    col1Header: { type: String, default: 'Evaluation Dimension' },
    col2Header: { type: String, default: 'University MBA' },
    col3Header: { type: String, default: 'Autonomous PGDM' },
    col4Header: { type: String, default: 'IPS Business School Hybrid MBA' },

    comparisonRows: [ComparisonRowSchema],

    // ── Features Section ───────────────────────────────────────────────────────
    featureCards: [FeatureCardSchema],
  },
  {
    timestamps: true,
  },
);

const MbaVsPgdmPageContent =
  mongoose.models.MbaVsPgdmPageContent ||
  mongoose.model('MbaVsPgdmPageContent', MbaVsPgdmPageContentSchema);

export default MbaVsPgdmPageContent;

import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const BannerSlideSchema = new mongoose.Schema({
  src: { type: String, required: true },      // Cloudinary URL or relative path
  alt: { type: String, default: '' },
  priority: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

const AffiliationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
  alt: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

const MethodologyFeatureSchema = new mongoose.Schema({
  iconName: { type: String, required: true }, // lucide icon name: FlaskConical, BookOpen, Users, Briefcase
  title: { type: String, required: true },
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const PathwayCardSchema = new mongoose.Schema({
  icon: { type: String, required: true },  // image URL
  title: { type: String, required: true },
  color: { type: String, default: '#FF6B00' },
  order: { type: Number, default: 0 },
});

const ProgramApprovalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
});

const ProgramSchema = new mongoose.Schema({
  badge: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  hoverTitle: { type: String, required: true },
  features: [{ type: String }],
  approvals: [ProgramApprovalSchema],
  duration: { type: String, required: true },
  eligibility: { type: String, default: 'Check Eligibility' },
  buttonText: { type: String, default: 'Read More' },
  link: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const PlacementStatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const CompanyLogoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const PlacementStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const VideoItemSchema = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const AchieverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const TestimonialImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const HomePageContentSchema = new mongoose.Schema(
  {
    // There will only ever be ONE document; section field identifies it
    section: {
      type: String,
      required: true,
      unique: true,
      enum: [
        'banner',
        'approvals',
        'methodology',
        'pathway',
        'programs',
        'placements',
        'videoGallery',
        'achievers',
        'testimonials',
      ],
    },

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerSlides: [BannerSlideSchema],
    bannerSeoH1: { type: String, default: '' },

    // ── Approvals & Affiliations ───────────────────────────────────────────────
    affiliations: [AffiliationSchema],

    // ── IPS Methodology (About section) ───────────────────────────────────────
    methodologySectionLabel: { type: String, default: 'START TODAY' },
    methodologyHeading: { type: String, default: 'About IPS Business School' },
    methodologyDescription: { type: String, default: '' },
    methodologyFeatures: [MethodologyFeatureSchema],
    methodologyCTAText: { type: String, default: 'Read More' },
    methodologyCTALink: { type: String, default: '/about' },

    // ── Pathway to Excellence ──────────────────────────────────────────────────
    pathwaySectionLabel: { type: String, default: 'IPS COLLEGE' },
    pathwayHeading: { type: String, default: 'Your Pathway to Excellence' },
    pathwayCenterImage: { type: String, default: '' },
    pathwayCards: [PathwayCardSchema],

    // ── Programs Offered ───────────────────────────────────────────────────────
    programsHeading: { type: String, default: 'Programs Offered' },
    programsSubHeading: { type: String, default: 'Discover Your Perfect Program' },
    programs: [ProgramSchema],

    // ── Placements ─────────────────────────────────────────────────────────────
    placementsHeading: { type: String, default: 'Our Placements' },
    placementsSubText: { type: String, default: '' },
    placementsStats: [PlacementStatSchema],
    companyLogos: [CompanyLogoSchema],
    placementStudents: [PlacementStudentSchema],

    // ── Video Gallery ──────────────────────────────────────────────────────────
    videoGalleryHeading: { type: String, default: 'Video Gallery' },
    videos: [VideoItemSchema],

    // ── Our Achievers ──────────────────────────────────────────────────────────
    achieversHeading: { type: String, default: 'Our Achievers' },
    achievers: [AchieverSchema],

    // ── Student Testimonials ───────────────────────────────────────────────────
    testimonialsLabel: { type: String, default: 'STUDENTS FEEDBACK' },
    testimonialsHeading: { type: String, default: 'Our Students Says' },
    testimonialsDescription: { type: String, default: '' },
    testimonialImages: [TestimonialImageSchema],

    // ── Apply Now — kept static, not managed via DB ──────────────────────────
  },
  {
    timestamps: true,
  }
);

const HomePageContent =
  mongoose.models.HomePageContent ||
  mongoose.model('HomePageContent', HomePageContentSchema);

export default HomePageContent;

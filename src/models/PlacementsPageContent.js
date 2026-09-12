import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const PlacementStatItemSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Cloudinary or CDN URL
  title: { type: String, required: true },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

const PlacementUpdateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary or CDN URL
  order: { type: Number, default: 0 },
});

const VideoResumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },  // YouTube embed URL
  thumbnailUrl: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

const FAQItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const CoordinatorSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  phone1: { type: String, default: '' },
  phone2: { type: String, default: '' },
  email1: { type: String, default: '' },
  email2: { type: String, default: '' },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const PlacementsPageContentSchema = new mongoose.Schema(
  {
    // Discriminator — one document per section
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'stats', 'updates', 'resumeBook', 'faq', 'coordinator'],
    },

    // ── Banner ────────────────────────────────────────────────────────────────
    bannerTitle: { type: String, default: 'Placements' },
    bannerImageUrl: { type: String, default: '' },
    bannerPosition: { type: String, default: 'object-bottom' },

    // ── Placement Stats (sector-wise images) ────────────────────────────────
    statsHeading: { type: String, default: '' },
    statItems: [PlacementStatItemSchema],

    // ── Placement Updates (student grid) ────────────────────────────────────
    updatesHeading: { type: String, default: 'PLACEMENT UPDATES' },
    placementUpdates: [PlacementUpdateSchema],

    // ── Resume Book (video grid) ─────────────────────────────────────────────
    resumeBookHeading: { type: String, default: 'Resume Book' },
    resumeBookDescription: {
      type: String,
      default:
        'The Classes of MBA Resume Books are now available. Search our database of IPS BUSINESS SCHOOL MBA students or alumni to find talented candidates for your openings.',
    },
    resumeBookCTAText: { type: String, default: 'View More....' },
    resumeBookCTALink: {
      type: String,
      default: 'https://www.youtube.com/channel/UCDAbHzu7iO893x7IyT5JttQ',
    },
    videoResumes: [VideoResumeSchema],

    // ── Industry FAQ ─────────────────────────────────────────────────────────
    faqHeading: { type: String, default: 'Industry Hiring Practices' },
    faqSubText: {
      type: String,
      default:
        'IPS BUSINESS SCHOOL students are interested in business careers across all functions and industries. The IPS MBA Placement office is organized into teams aligned by industry to provide targeted expertise and resources for both employers and students. Learn how best to recruit for your industry.',
    },
    faqs: [FAQItemSchema],

    // ── Coordinator ──────────────────────────────────────────────────────────
    coordinator: { type: CoordinatorSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const PlacementsPageContent =
  mongoose.models.PlacementsPageContent ||
  mongoose.model('PlacementsPageContent', PlacementsPageContentSchema);

export default PlacementsPageContent;

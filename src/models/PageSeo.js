import mongoose from 'mongoose';

/**
 * PageSeo — stores SEO metadata for each static/dynamic page.
 * Keyed by `pageSlug` (e.g. "/", "about", "mba", "bba", "contact").
 * The API endpoint GET /api/metadetails?slug=<pageSlug> is used by
 * generateMetadata() on each page.
 */
const PageSeoSchema = new mongoose.Schema(
  {
    // Human-readable page name shown in admin (e.g. "Home", "About Us")
    pageName: {
      type: String,
      required: [true, 'Page name is required'],
      trim: true,
      maxlength: [100, 'Page name cannot exceed 100 characters'],
    },

    // URL slug — unique identifier for lookup. Use "/" for home page.
    pageSlug: {
      type: String,
      required: [true, 'Page slug is required'],
      unique: true,
      trim: true,
      maxlength: [200, 'Page slug cannot exceed 200 characters'],
    },

    // --- Core SEO fields ---
    metaTitle: {
      type: String,
      required: [true, 'Meta title is required'],
      trim: true,
      maxlength: [70, 'Meta title cannot exceed 70 characters'],
    },
    metaDescription: {
      type: String,
      required: [true, 'Meta description is required'],
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
    },
    metaKeywords: {
      type: String,
      trim: true,
      default: '',
    },

    // Canonical URL — if empty, auto-constructed from SITE_URL + pageSlug
    canonicalUrl: {
      type: String,
      trim: true,
      default: '',
    },

    // OG image override (full URL). Falls back to site default if empty.
    ogImage: {
      type: String,
      trim: true,
      default: '',
    },

    // robots meta — e.g. "index, follow" or "noindex, nofollow"
    robots: {
      type: String,
      trim: true,
      default: 'index, follow',
    },

    // Whether this record is active (soft-disable without delete)
    isActive: {
      type: Boolean,
      default: true,
    },

    // Internal note for admin context (not rendered)
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Fast lookup by slug
PageSeoSchema.index({ pageSlug: 1 }, { unique: true });
PageSeoSchema.index({ isActive: 1 });

const PageSeo = mongoose.models.PageSeo || mongoose.model('PageSeo', PageSeoSchema);

export default PageSeo;

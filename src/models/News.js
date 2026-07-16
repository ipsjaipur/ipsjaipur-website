import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [500, 'Short description cannot exceed 500 characters'],
    },
    content: {
      type: String,
      default: '',
    },
    featuredImage: {
      url: { type: String, default: '' },
      alt: { type: String, default: '' },
    },
    author: {
      type: String,
      trim: true,
      default: 'IPS Business School',
    },
    category: {
      type: String,
      trim: true,
      enum: ['Placement News', 'IPS News'],
      default: 'IPS News',
    },
    tags: {
      type: [String],
      default: [],
    },
    // SEO fields
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Meta title cannot exceed 70 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
    canonicalUrl: {
      type: String,
      trim: true,
    },
    ogImage: {
      type: String,
      trim: true,
    },
    // Status
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    // Reading time (auto-calculated)
    readingTime: {
      type: Number,
      default: 1,
    },
    // View count
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
NewsSchema.index({ slug: 1 });
NewsSchema.index({ status: 1, publishedAt: -1 });
NewsSchema.index({ category: 1 });

const News = mongoose.models.News || mongoose.model('News', NewsSchema);

export default News;

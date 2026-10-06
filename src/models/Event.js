import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
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
    // Featured / cover image
    featuredImage: {
      url: { type: String, default: '' },
      alt: { type: String, default: '' },
    },
    // Gallery images (for event recap after it happens)
    gallery: {
      type: [
        {
          url: { type: String, default: '' },
          alt: { type: String, default: '' },
        },
      ],
      default: [],
    },
    // Event-specific fields
    eventDate: {
      type: Date,
      default: null,
    },
    eventEndDate: {
      type: Date,
      default: null,
    },
    eventTime: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    organizer: {
      type: String,
      trim: true,
      default: 'IPS Business School',
    },
    category: {
      type: String,
      trim: true,
      enum: ['Workshop', 'Seminar', 'Cultural', 'Sports', 'Academic', 'Networking', 'Placement', 'Other'],
      default: 'Other',
    },
    // upcoming | completed
    eventStatus: {
      type: String,
      enum: ['upcoming', 'completed'],
      default: 'upcoming',
    },
    tags: {
      type: [String],
      default: [],
    },
    registrationLink: {
      type: String,
      trim: true,
      default: '',
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
    // Publish status (draft/published — controls visibility)
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
      default: null,
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

// Indexes for faster queries
EventSchema.index({ slug: 1 });
EventSchema.index({ status: 1, eventDate: -1 });
EventSchema.index({ eventStatus: 1, eventDate: 1 });
EventSchema.index({ category: 1 });

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;

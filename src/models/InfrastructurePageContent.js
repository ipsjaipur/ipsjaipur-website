import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

/**
 * Each section in the infrastructure page has an optional list of image URLs.
 * We store them as plain strings rather than embedded objects to keep things simple.
 */

// ─── Main Schema ───────────────────────────────────────────────────────────────

const InfrastructurePageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     *
     * Sections:
     *   'banner'       — hero CommonBanner (title, image, position)
     *   'intro'        — the static "#campus" intro card (heading, subheading, description)
     *   'classrooms'   — Digital AC Classrooms
     *   'auditorium'   — Seminar Halls & Auditorium
     *   'labs'         — Computer Labs
     *   'library'      — Library
     *   'sports'       — Sports Activities
     *   'wifi'         — Wi-Fi Campus
     *   'parking'      — Parking Area
     *   'hostels'      — Hostels + PGs
     *   'location'     — Located at Heart of City (single image)
     *   'transport'    — Public Transport connectivity
     *   'nearby'       — Cafés, Malls & Destinations
     *   'ecosystem'    — closing paragraph (no images, no title/subtitle)
     *   'navigation'   — sidebar navigation labels (array of { id, label })
     *   'sidebar'      — YouTube video URLs in the right sidebar
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: [
        'banner',
        'intro',
        'classrooms',
        'auditorium',
        'labs',
        'library',
        'sports',
        'wifi',
        'parking',
        'hostels',
        'location',
        'transport',
        'nearby',
        'ecosystem',
        'navigation',
        'sidebar',
      ],
    },

    // ── Banner (section: 'banner') ─────────────────────────────────────────────
    bannerTitle:    { type: String, default: 'Infrastructure' },
    bannerImageUrl: { type: String, default: 'images/about/infrastructure-img-2.webp' },
    bannerPosition: { type: String, default: 'object-bottom' },

    // ── Intro card (section: 'intro') ──────────────────────────────────────────
    introHeading:     { type: String, default: 'IPS BUSINESS SCHOOL, JAIPUR' },
    introSubheading:  { type: String, default: 'Where World-Class Infrastructure Meets Academic Excellence' },
    introDescription: { type: String, default: '' },

    // ── Content sections (all except banner/intro/navigation/sidebar) ──────────
    // These fields are used by: classrooms, auditorium, labs, library, sports,
    // wifi, parking, hostels, location, transport, nearby, ecosystem
    title:       { type: String, default: '' },
    subtitle:    { type: String, default: '' },
    description: { type: String, default: '' },

    // images[] — array of image URLs (used by most sections)
    images: [{ type: String }],

    // image — single image URL (used by 'location' section)
    image: { type: String, default: '' },

    // ── Navigation (section: 'navigation') ────────────────────────────────────
    // Array of sidebar nav items: [{ id: 'campus', label: 'Our Campus' }, ...]
    navItems: [
      {
        id:    { type: String, required: true },
        label: { type: String, required: true },
        order: { type: Number, default: 0 },
      },
    ],

    // ── Sidebar (section: 'sidebar') ───────────────────────────────────────────
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

const InfrastructurePageContent =
  mongoose.models.InfrastructurePageContent ||
  mongoose.model('InfrastructurePageContent', InfrastructurePageContentSchema);

export default InfrastructurePageContent;

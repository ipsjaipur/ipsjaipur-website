import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true },           // e.g. "MARCOS CLUB"
  bullets: [{ type: String }],                       // bullet-point activities
  order: { type: Number, default: 0 },
});

const CommitteeSchema = new mongoose.Schema({
  name: { type: String, required: true },            // e.g. "Placement Committee"
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const SidebarVideoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const StudentLifePageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     * Sections:
     *   'banner'       — hero banner + breadcrumb title
     *   'campus'       — life-at-campus image + paragraphs
     *   'student-club' — clubs council intro + list of clubs
     *   'sports-club'  — sports club image + paragraphs
     *   'indoor-games' — indoor games image + paragraphs
     *   'committees'   — list of committees
     *   'sidebar'      — YouTube videos in the right sidebar
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'campus', 'student-club', 'sports-club', 'indoor-games', 'committees', 'sidebar'],
    },

    // ── Banner (section: 'banner') ─────────────────────────────────────────────
    bannerTitle: { type: String, default: 'Student Life' },
    bannerImageUrl: { type: String, default: 'images/about/student-img-2.webp' },
    bannerPosition: { type: String, default: 'object-top' },

    // ── Campus (section: 'campus') ─────────────────────────────────────────────
    campusImageUrl: { type: String, default: 'images/student-life/campus-image.webp' },
    campusImageAlt: { type: String, default: 'IPS Business School Campus Life' },
    campusParagraphs: [{ type: String }],

    // ── Student Club (section: 'student-club') ─────────────────────────────────
    studentClubHeading: { type: String, default: 'STUDENTS CLUB (MANAGEMENT):' },
    studentClubIntro: { type: String, default: '' },   // paragraph before the clubs list
    clubs: [ClubSchema],

    // ── Sports Club (section: 'sports-club') ───────────────────────────────────
    sportsClubHeading: { type: String, default: 'Sports Club:' },
    sportsClubImageUrl: { type: String, default: 'images/student-life/sports-club.webp' },
    sportsClubImageAlt: { type: String, default: 'IPS Sports Club Activities' },
    sportsClubParagraphs: [{ type: String }],

    // ── Indoor Games (section: 'indoor-games') ─────────────────────────────────
    indoorGamesHeading: { type: String, default: 'Indoor Games:' },
    indoorGamesImageUrl: { type: String, default: 'images/student-life/gym-membership.webp' },
    indoorGamesImageAlt: { type: String, default: 'IPS Indoor Games and Gym Facilities' },
    indoorGamesParagraphs: [{ type: String }],

    // ── Committees (section: 'committees') ─────────────────────────────────────
    committeesHeading: { type: String, default: 'Committees:' },
    committees: [CommitteeSchema],

    // ── Sidebar (section: 'sidebar') ───────────────────────────────────────────
    sidebarVideos: [SidebarVideoSchema],
  },
  {
    timestamps: true,
  },
);

const StudentLifePageContent =
  mongoose.models.StudentLifePageContent ||
  mongoose.model('StudentLifePageContent', StudentLifePageContentSchema);

export default StudentLifePageContent;

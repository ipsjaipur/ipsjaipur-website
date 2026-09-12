import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const FacultyMemberSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  qualification: { type: String, default: '' },
  designation: { type: String, default: '' },
  experience:  { type: String, default: '' },
  order:       { type: Number, default: 0 },
});

const MentorSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  qualification: { type: String, default: '' }, // used as "Designation" in mentor table
  experience:  { type: String, default: '' },   // used as "Organization/Company" in mentor table
  order:       { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const FacultyPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section field is the unique key.
     *   'banner'  — hero banner (title, image, position)
     *   'faculty' — Core & Visiting Faculty section header + table rows
     *   'mentors' — Corporate Speakers / Mentors section header + table rows
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'faculty', 'mentors'],
    },

    // ── Banner ──────────────────────────────────────────────────────────────────
    bannerTitle:    { type: String, default: 'Faculty' },
    bannerImageUrl: { type: String, default: 'images/about/faculty-img.webp' },
    bannerPosition: { type: String, default: 'object-center' },

    // ── Faculty section header ──────────────────────────────────────────────────
    facultySectionTitle: { type: String, default: 'Core & Visiting Faculty' },
    facultyColName:      { type: String, default: 'Faculty Name' },
    facultyColExp:       { type: String, default: 'Experience' },
    facultyMembers:      [FacultyMemberSchema],

    // ── Mentors section header ──────────────────────────────────────────────────
    mentorsSectionTitle: { type: String, default: 'Corporate Speakers / Mentors' },
    mentorsColName:      { type: String, default: 'Name & Designation' },
    mentorsColQual:      { type: String, default: 'Qualification' },
    mentors:             [MentorSchema],
  },
  { timestamps: true },
);

const FacultyPageContent =
  mongoose.models.FacultyPageContent ||
  mongoose.model('FacultyPageContent', FacultyPageContentSchema);

export default FacultyPageContent;

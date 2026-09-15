import mongoose from 'mongoose';

// ─── Sub-schemas ───────────────────────────────────────────────────────────────

const AddressSchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
});

/**
 * Social links — only the URL is stored in DB.
 * Icons (SVG) are hardcoded in the frontend component.
 * 'name' must match one of the 4 known platforms:
 *   facebook | twitter | linkedin | instagram
 */
const SocialLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['facebook', 'twitter', 'linkedin', 'instagram'],
  },
  href: { type: String, required: true }, // full profile URL
  order: { type: Number, default: 0 },
});

// ─── Main Schema ───────────────────────────────────────────────────────────────

const ContactPageContentSchema = new mongoose.Schema(
  {
    /**
     * One document per section. section is the unique key.
     *   'banner' — hero banner image + title + position
     *   'info'   — all contact details, maps, social links
     */
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['banner', 'info'],
    },

    // ── Banner ─────────────────────────────────────────────────────────────────
    bannerTitle: { type: String, default: 'Contact Us' },
    bannerImageUrl: { type: String, default: '' },
    bannerPosition: { type: String, default: 'object-center' },

    // ── Info ───────────────────────────────────────────────────────────────────
    // Contact card header
    cardTitle: { type: String, default: 'Contact Us' },
    cardSubtitle: { type: String, default: 'IPS COLLEGE JAIPUR' },

    // Campus addresses (array — supports multiple campuses)
    addresses: [AddressSchema],

    // Phone
    phoneLabel: { type: String, default: 'Phone' },
    phoneNumber: { type: String, default: '+91 8233970000' },
    phoneHref: { type: String, default: 'tel:+918233970000' },

    // WhatsApp
    whatsappLabel: { type: String, default: 'WhatsApp' },
    whatsappNumber: { type: String, default: '+91 7976814849' },
    whatsappHref: { type: String, default: 'https://wa.me/917976814849' },

    // Email
    emailLabel: { type: String, default: 'Email' },
    emailAddress: { type: String, default: 'info@ipsedu.in' },
    emailHref: { type: String, default: 'mailto:info@ipsedu.in' },

    // Website
    websiteLabel: { type: String, default: 'Website' },
    websiteDisplay: { type: String, default: 'www.ipsedu.in' },
    websiteHref: { type: String, default: 'https://www.ipsedu.in' },

    // Social links — only URLs stored; icons are static in the frontend
    socialHeading: { type: String, default: 'Follow Us' },
    socialLinks: [SocialLinkSchema],

    // Google Maps — Street View embed
    streetViewEmbedUrl: {
      type: String,
      default:
        'https://www.google.com/maps/embed?pb=!4v1545940800964!6m8!1m7!1sYaqLow5lF1QAAAQpmtYJlg!2m2!1d26.88099616194766!2d75.75499552269685!3f177.38064455944863!4f-1.5276697203127583!5f1.7732863038280446',
    },
    streetViewTitle: { type: String, default: 'IPS Business School Street View' },

    // Google Maps — Location Map embed
    locationEmbedUrl: {
      type: String,
      default:
        'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14234.851438834463!2d75.7553402!3d26.8808625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4f750821f2b%3A0x9070c7c87969b72d!2sIPS%20BUSINESS%20SCHOOL!5e0!3m2!1sen!2sin!4v1678969475461!5m2!1sen!2sin',
    },
    locationMapTitle: { type: String, default: 'IPS Business School Location' },
  },
  {
    timestamps: true,
  },
);

// Force recompile when schema changes — safe because we fully replace the schema
if (mongoose.models.ContactPageContent) {
  delete mongoose.models.ContactPageContent;
}

const ContactPageContent = mongoose.model('ContactPageContent', ContactPageContentSchema);

export default ContactPageContent;

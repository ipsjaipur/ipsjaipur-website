'use client';

import ContactSectionEditorShell from '../ContactSectionEditorShell';
import SortableList from '../../home-page/SortableList';

// ── Reusable field ────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false, rows = 2, placeholder = '', hint = '' }) {
  const cls =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      {hint && <p className="text-[11px] text-[#77838f] mb-1">{hint}</p>}
      {multiline ? (
        <textarea
          rows={rows}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

// ── Address list item ─────────────────────────────────────────────────────────
function AddressItem(item, _index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Address</label>
      <textarea
        rows={2}
        value={item.text || ''}
        onChange={(e) => update({ text: e.target.value })}
        placeholder="Full campus address…"
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
      />
    </div>
  );
}

// ── Platform icon map (for admin preview labels) ──────────────────────────────
const PLATFORM_META = {
  facebook: { label: 'Facebook', placeholder: 'https://www.facebook.com/…' },
  twitter: { label: 'Twitter', placeholder: 'https://twitter.com/…' },
  linkedin: { label: 'LinkedIn', placeholder: 'https://www.linkedin.com/…' },
  instagram: { label: 'Instagram', placeholder: 'https://www.instagram.com/…' },
};

const PLATFORMS = ['facebook', 'twitter', 'linkedin', 'instagram'];

// ── Main editor ───────────────────────────────────────────────────────────────
export default function ContactInfoEditor() {
  return (
    <ContactSectionEditorShell
      sectionKey="info"
      title="Contact Information"
      description="Card heading, campus addresses, phone, WhatsApp, email, website, social links, and Google Maps embeds."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        // ── Social link helpers ──────────────────────────────────────────────
        // Ensure all 4 platforms exist in the array; fill missing ones
        const existingLinks = data?.socialLinks || [];
        const normalizedLinks = PLATFORMS.map((name, idx) => {
          const found = existingLinks.find((l) => l.name === name);
          return found || { name, href: '', order: idx };
        });

        function updateSocialHref(platformName, newHref) {
          const updated = normalizedLinks.map((l) => (l.name === platformName ? { ...l, href: newHref } : l));
          setData({ ...data, socialLinks: updated });
        }

        return (
          <>
            {/* ── Card heading ──────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Card Heading</h2>
              <p className="text-[12px] text-[#77838f]">The orange header bar at the top of the contact info card.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title" value={data?.cardTitle} onChange={set('cardTitle')} placeholder="Contact Us" />
                <Field
                  label="Subtitle"
                  value={data?.cardSubtitle}
                  onChange={set('cardSubtitle')}
                  placeholder="IPS COLLEGE JAIPUR"
                />
              </div>
            </div>

            {/* ── Campus addresses ──────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Campus Addresses</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Each entry appears as a separate paragraph under the map-pin icon. Drag to reorder.
              </p>
              <SortableList
                items={data?.addresses || []}
                onChange={(addresses) => setData({ ...data, addresses })}
                renderItem={AddressItem}
                onAdd={() => ({ text: '', order: data?.addresses?.length || 0 })}
                addLabel="Add Address"
              />
            </div>

            {/* ── Phone ─────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Phone</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Label" value={data?.phoneLabel} onChange={set('phoneLabel')} placeholder="Phone" />
                <Field
                  label="Display Number"
                  value={data?.phoneNumber}
                  onChange={set('phoneNumber')}
                  placeholder="+91 8233970000"
                />
                <Field
                  label="tel: href"
                  value={data?.phoneHref}
                  onChange={set('phoneHref')}
                  placeholder="tel:+918233970000"
                />
              </div>
            </div>

            {/* ── WhatsApp ──────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">WhatsApp</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field
                  label="Label"
                  value={data?.whatsappLabel}
                  onChange={set('whatsappLabel')}
                  placeholder="WhatsApp"
                />
                <Field
                  label="Display Number"
                  value={data?.whatsappNumber}
                  onChange={set('whatsappNumber')}
                  placeholder="+91 7976814849"
                />
                <Field
                  label="wa.me href"
                  value={data?.whatsappHref}
                  onChange={set('whatsappHref')}
                  placeholder="https://wa.me/917976814849"
                />
              </div>
            </div>

            {/* ── Email ─────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Email</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Label" value={data?.emailLabel} onChange={set('emailLabel')} placeholder="Email" />
                <Field
                  label="Display Address"
                  value={data?.emailAddress}
                  onChange={set('emailAddress')}
                  placeholder="info@ipsedu.in"
                />
                <Field
                  label="mailto: href"
                  value={data?.emailHref}
                  onChange={set('emailHref')}
                  placeholder="mailto:info@ipsedu.in"
                />
              </div>
            </div>

            {/* ── Website ───────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Website</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Label" value={data?.websiteLabel} onChange={set('websiteLabel')} placeholder="Website" />
                <Field
                  label="Display Text"
                  value={data?.websiteDisplay}
                  onChange={set('websiteDisplay')}
                  placeholder="www.ipsedu.in"
                />
                <Field
                  label="Full URL"
                  value={data?.websiteHref}
                  onChange={set('websiteHref')}
                  placeholder="https://www.ipsedu.in"
                />
              </div>
            </div>

            {/* ── Social Links — URL only ────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Social Links</h2>
              <p className="text-[12px] text-[#77838f]">Icons are fixed — just update the profile URLs below.</p>
              <Field
                label="Section Heading"
                value={data?.socialHeading}
                onChange={set('socialHeading')}
                placeholder="Follow Us"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {normalizedLinks.map((link) => {
                  const meta = PLATFORM_META[link.name];
                  return (
                    <div key={link.name}>
                      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                        {meta.label} URL
                      </label>
                      <input
                        type="url"
                        value={link.href || ''}
                        onChange={(e) => updateSocialHref(link.name, e.target.value)}
                        placeholder={meta.placeholder}
                        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Google Maps — Street View ─────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Google Maps — Street View</h2>
              <p className="text-[12px] text-[#77838f]">
                Paste the full embed URL from Google Maps → Share → Embed a map. Shown in the right column beside the
                contact card.
              </p>
              <Field
                label="Street View Embed URL"
                value={data?.streetViewEmbedUrl}
                onChange={set('streetViewEmbedUrl')}
                placeholder="https://www.google.com/maps/embed?pb=…"
              />
              <Field
                label="iframe title (accessibility)"
                value={data?.streetViewTitle}
                onChange={set('streetViewTitle')}
                placeholder="IPS Business School Street View"
              />
            </div>

            {/* ── Google Maps — Location Map ────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Google Maps — Location Map</h2>
              <p className="text-[12px] text-[#77838f]">The full-width map shown below the contact info row.</p>
              <Field
                label="Location Map Embed URL"
                value={data?.locationEmbedUrl}
                onChange={set('locationEmbedUrl')}
                placeholder="https://www.google.com/maps/embed?pb=…"
              />
              <Field
                label="iframe title (accessibility)"
                value={data?.locationMapTitle}
                onChange={set('locationMapTitle')}
                placeholder="IPS Business School Location"
              />
            </div>
          </>
        );
      }}
    </ContactSectionEditorShell>
  );
}

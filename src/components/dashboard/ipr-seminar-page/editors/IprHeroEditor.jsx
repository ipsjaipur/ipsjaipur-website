'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';
import ImageUpload from '../../home-page/ImageUpload';

const inputCls = 'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
const textareaCls = `${inputCls} resize-none`;

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      {hint && <p className="text-[11px] text-[#77838f] mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
      <h2 className="text-[14px] font-bold text-[#222] mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TrustBadges({ value = [], onChange }) {
  const add = () => onChange([...value, '']);
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i, v) => onChange(value.map((item, idx) => (idx === i ? v : item)));

  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-2">
        Trust Badges (below CTA buttons)
      </label>
      <div className="space-y-2 mb-2">
        {value.map((badge, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={badge}
              onChange={(e) => update(i, e.target.value)}
              placeholder="e.g. AICTE Approved"
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-red-400 hover:text-red-600 text-[11px] font-semibold shrink-0 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="text-[12px] font-semibold text-[#eb5905] hover:underline"
      >
        + Add Badge
      </button>
    </div>
  );
}

export default function IprHeroEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="hero"
      title="Hero Section"
      description="Main headline, date/venue chips, CTA buttons, poster image, and trust badges."
    >
      {(data, setData) => (
        <>
          {/* Headline */}
          <Card title="Headline">
            <Field label="Top Badge Text" hint="Shown inside the live-badge pill above the headline.">
              <input type="text" value={data?.heroBadgeText || ''} onChange={(e) => setData({ ...data, heroBadgeText: e.target.value })} placeholder="IPS Business School & IPS College · 9 October 2026" className={inputCls} />
            </Field>
            <Field label="Super Text" hint="Small ALL-CAPS label above the main headline.">
              <input type="text" value={data?.heroSuperText || ''} onChange={(e) => setData({ ...data, heroSuperText: e.target.value })} placeholder="International Seminar on" className={inputCls} />
            </Field>
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Title Line 1">
                <input type="text" value={data?.heroTitleLine1 || ''} onChange={(e) => setData({ ...data, heroTitleLine1: e.target.value })} placeholder="Intellectual" className={inputCls} />
              </Field>
              <Field label="Title Line 2">
                <input type="text" value={data?.heroTitleLine2 || ''} onChange={(e) => setData({ ...data, heroTitleLine2: e.target.value })} placeholder="Property" className={inputCls} />
              </Field>
              <Field label="Highlighted Word">
                <input type="text" value={data?.heroTitleHighlight || ''} onChange={(e) => setData({ ...data, heroTitleHighlight: e.target.value })} placeholder="Rights" className={inputCls} />
              </Field>
            </div>
            <Field label="Subtitle (tagline)">
              <input type="text" value={data?.heroSubtitle || ''} onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })} placeholder="Ideas Today. Impact Tomorrow." className={inputCls} />
            </Field>
            <Field label="Description">
              <textarea rows={3} value={data?.heroDescription || ''} onChange={(e) => setData({ ...data, heroDescription: e.target.value })} className={textareaCls} />
            </Field>
          </Card>

          {/* Event chips */}
          <Card title="Event Meta Chips">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Date">
                <input type="text" value={data?.heroDate || ''} onChange={(e) => setData({ ...data, heroDate: e.target.value })} placeholder="9 October 2026" className={inputCls} />
              </Field>
              <Field label="Day & Time">
                <input type="text" value={data?.heroDaytime || ''} onChange={(e) => setData({ ...data, heroDaytime: e.target.value })} placeholder="Friday · 8:00 AM onwards" className={inputCls} />
              </Field>
              <Field label="Venue Name">
                <input type="text" value={data?.heroVenueName || ''} onChange={(e) => setData({ ...data, heroVenueName: e.target.value })} placeholder="IPS College" className={inputCls} />
              </Field>
              <Field label="Venue City">
                <input type="text" value={data?.heroVenueCity || ''} onChange={(e) => setData({ ...data, heroVenueCity: e.target.value })} placeholder="Jaipur, Rajasthan" className={inputCls} />
              </Field>
              <Field label="Entry Badge Label">
                <input type="text" value={data?.heroEntryBadge || ''} onChange={(e) => setData({ ...data, heroEntryBadge: e.target.value })} placeholder="Free Entry" className={inputCls} />
              </Field>
              <Field label="Entry Badge Sub-label">
                <input type="text" value={data?.heroEntryBadgeSub || ''} onChange={(e) => setData({ ...data, heroEntryBadgeSub: e.target.value })} placeholder="All Welcome" className={inputCls} />
              </Field>
            </div>
          </Card>

          {/* Register CTA */}
          <Card title="Register Button">
            <Field label="Button Text">
              <input type="text" value={data?.heroRegisterButtonText || ''} onChange={(e) => setData({ ...data, heroRegisterButtonText: e.target.value })} placeholder="Register Now — Free" className={inputCls} />
            </Field>
            <Field label="Button Link (Google Form or other URL)">
              <input type="text" value={data?.heroRegisterButtonLink || ''} onChange={(e) => setData({ ...data, heroRegisterButtonLink: e.target.value })} placeholder="https://forms.gle/..." className={inputCls} />
            </Field>
          </Card>

          {/* Brochure button label */}
          <Card title="Brochure Download Button">
            <p className="text-[12px] text-[#77838f] -mt-2 mb-3">
              The actual PDF is managed in the <strong>Config</strong> section. Set the button label here.
            </p>
            <Field label="Button Text">
              <input type="text" value={data?.heroBrochureButtonText || ''} onChange={(e) => setData({ ...data, heroBrochureButtonText: e.target.value })} placeholder="Download Brochure" className={inputCls} />
            </Field>
          </Card>

          {/* Poster image */}
          <Card title="Poster Image">
            <ImageUpload
              label="Poster Image"
              value={data?.heroPosterImageUrl || ''}
              onChange={(url) => setData({ ...data, heroPosterImageUrl: url })}
            />
            <Field label="Poster Download Button Text">
              <input type="text" value={data?.heroPosterDownloadText || ''} onChange={(e) => setData({ ...data, heroPosterDownloadText: e.target.value })} placeholder="Download Poster" className={inputCls} />
            </Field>
          </Card>

          {/* Trust badges */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <TrustBadges
              value={data?.heroTrustBadges || []}
              onChange={(v) => setData({ ...data, heroTrustBadges: v })}
            />
          </div>
        </>
      )}
    </IprSectionEditorShell>
  );
}

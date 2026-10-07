'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';

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

function AudienceTagsEditor({ value = [], onChange }) {
  const add = () => onChange([...value, '']);
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i, v) => onChange(value.map((item, idx) => (idx === i ? v : item)));

  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-2">
        Audience Tags (dot-separated row at the bottom)
      </label>
      <div className="space-y-2 mb-2">
        {value.map((tag, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => update(i, e.target.value)}
              placeholder="e.g. Students"
              className={inputCls}
            />
            <button type="button" onClick={() => remove(i)}
              className="text-red-400 hover:text-red-600 text-[11px] font-semibold shrink-0 transition">
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="text-[12px] font-semibold text-[#eb5905] hover:underline">
        + Add Tag
      </button>
    </div>
  );
}

export default function IprCtaEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="cta"
      title="Bottom CTA Banner"
      description="The full-width call-to-action section at the bottom of the page."
    >
      {(data, setData) => (
        <div className="space-y-5">

          {/* Content */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-4">Content</h2>
            <div className="space-y-4">
              <Field label="Badge Text" hint="Shown in the pill above the heading.">
                <input type="text" value={data?.ctaBadgeText || ''} onChange={(e) => setData({ ...data, ctaBadgeText: e.target.value })} placeholder="9 October 2026 · IPS College, Jaipur" className={inputCls} />
              </Field>
              <Field label="Heading">
                <input type="text" value={data?.ctaHeading || ''} onChange={(e) => setData({ ...data, ctaHeading: e.target.value })} placeholder="Have an Idea? Know How to Protect It." className={inputCls} />
              </Field>
              <Field label="Description">
                <textarea rows={3} value={data?.ctaDescription || ''} onChange={(e) => setData({ ...data, ctaDescription: e.target.value })} className={textareaCls} placeholder="Don't miss the opportunity…" />
              </Field>
            </div>
          </div>

          {/* Register button */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-4">Register Button</h2>
            <div className="space-y-3">
              <Field label="Button Text">
                <input type="text" value={data?.ctaRegisterButtonText || ''} onChange={(e) => setData({ ...data, ctaRegisterButtonText: e.target.value })} placeholder="Register Now →" className={inputCls} />
              </Field>
              <Field label="Button Link">
                <input type="text" value={data?.ctaRegisterButtonLink || ''} onChange={(e) => setData({ ...data, ctaRegisterButtonLink: e.target.value })} placeholder="https://forms.gle/…" className={inputCls} />
              </Field>
            </div>
          </div>

          {/* Brochure button label */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Brochure Download Button</h2>
            <p className="text-[12px] text-[#77838f] mb-3">
              The PDF itself is managed in the <strong>Config</strong> section.
            </p>
            <Field label="Button Text">
              <input type="text" value={data?.ctaBrochureButtonText || ''} onChange={(e) => setData({ ...data, ctaBrochureButtonText: e.target.value })} placeholder="Download Brochure" className={inputCls} />
            </Field>
          </div>

          {/* Audience tags */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <AudienceTagsEditor
              value={data?.ctaAudienceTags || []}
              onChange={(v) => setData({ ...data, ctaAudienceTags: v })}
            />
          </div>

        </div>
      )}
    </IprSectionEditorShell>
  );
}

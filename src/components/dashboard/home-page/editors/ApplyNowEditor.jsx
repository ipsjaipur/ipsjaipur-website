'use client';

import SectionEditorShell from '../SectionEditorShell';

function Field({ label, value, onChange, placeholder, hint }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] text-[#222] placeholder-[#aab4bf] focus:outline-none focus:border-[#eb5905] transition"
      />
      {hint && <p className="text-[11px] text-[#77838f] mt-1">{hint}</p>}
    </div>
  );
}

export default function ApplyNowEditor() {
  return (
    <SectionEditorShell
      sectionKey="applyNow"
      title="Apply Now CTA"
      description="The call-to-action strip between testimonials and campus news."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-5">
            <h2 className="text-[14px] font-bold text-[#222]">CTA Content</h2>

            <Field
              label="Main Heading"
              value={data?.applyNowHeading}
              onChange={set('applyNowHeading')}
              placeholder="Apply Now & Shape Your Future Today"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#f0f0f0]">
              <div>
                <p className="text-[12px] font-bold text-[#4a5568] mb-3">Apply Now Button</p>
                <div className="space-y-3">
                  <Field
                    label="Button Text"
                    value={data?.applyNowButtonText}
                    onChange={set('applyNowButtonText')}
                    placeholder="Apply Now"
                  />
                  <Field
                    label="Button URL"
                    value={data?.applyNowButtonUrl}
                    onChange={set('applyNowButtonUrl')}
                    placeholder="https://admissions.ipsedu.in/"
                    hint="Opens in new tab"
                  />
                </div>
              </div>

              <div>
                <p className="text-[12px] font-bold text-[#4a5568] mb-3">Brochure Button</p>
                <div className="space-y-3">
                  <Field
                    label="Button Text"
                    value={data?.brochureButtonText}
                    onChange={set('brochureButtonText')}
                    placeholder="Download Brochure"
                  />
                  <Field
                    label="Brochure URL / Path"
                    value={data?.brochureUrl}
                    onChange={set('brochureUrl')}
                    placeholder="/images/brochure/ips-brochure.pdf"
                    hint="Can be a local path or Cloudinary URL"
                  />
                </div>
              </div>
            </div>

            {/* Live preview */}
            <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
              <p className="text-[11px] font-semibold text-[#77838f] uppercase tracking-wide mb-3">Preview</p>
              <div className="bg-gradient-to-br from-[#FCEFE3] via-[#FAE6D2] to-[#F6D7B8] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-extrabold text-[#1B2E4A] text-[18px] leading-tight">
                  {data?.applyNowHeading || 'Apply Now & Shape Your Future Today'}
                </p>
                <div className="flex gap-3 shrink-0">
                  <span className="bg-[#C8501F] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl">
                    {data?.applyNowButtonText || 'Apply Now'}
                  </span>
                  <span className="border-2 border-[#C8501F]/30 bg-white/40 text-[#1B2E4A] text-[13px] font-semibold px-4 py-2.5 rounded-xl">
                    {data?.brochureButtonText || 'Download Brochure'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </SectionEditorShell>
  );
}

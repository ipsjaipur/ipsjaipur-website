'use client';

import InfrastructureSectionEditorShell from '../InfrastructureSectionEditorShell';

function Field({ label, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
      />
    </div>
  );
}

export default function IntroEditor() {
  return (
    <InfrastructureSectionEditorShell
      sectionKey="intro"
      title="Campus Intro"
      description='The opening "#campus" card — main heading, subheading, and introductory paragraph.'
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Campus Intro Card</h2>
            <Field
              label="Heading (orange, uppercase)"
              value={data?.introHeading}
              onChange={set('introHeading')}
              placeholder="IPS BUSINESS SCHOOL, JAIPUR"
            />
            <Field
              label="Subheading"
              value={data?.introSubheading}
              onChange={set('introSubheading')}
              placeholder="Where World-Class Infrastructure Meets Academic Excellence"
            />
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Description Paragraph
              </label>
              <textarea
                rows={5}
                value={data?.introDescription || ''}
                onChange={(e) => set('introDescription')(e.target.value)}
                placeholder="At IPS BUSINESS SCHOOL JAIPUR, we believe…"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
              />
            </div>
          </div>
        );
      }}
    </InfrastructureSectionEditorShell>
  );
}

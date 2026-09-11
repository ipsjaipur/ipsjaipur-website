'use client';

import BoardOfAdvisorsSectionEditorShell from '../BoardOfAdvisorsSectionEditorShell';

function Field({ label, value, onChange, multiline = false, rows = 2, placeholder = '', hint = '' }) {
  const cls =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
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

export default function BoardOfAdvisorsBridgingEditor() {
  return (
    <BoardOfAdvisorsSectionEditorShell
      sectionKey="bridging"
      title="Bridging Theory CTA"
      description="Bottom CTA section — heading, paragraph, and the Explore Placements button."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Bridging Theory Section</h2>

            <Field
              label="Heading"
              value={data?.bridgingHeading}
              onChange={set('bridgingHeading')}
              placeholder="Bridging Classroom Theory & Corporate Reality"
              hint='The phrase "Classroom Theory" is automatically highlighted in orange on the live page.'
            />

            <Field
              label="Paragraph"
              value={data?.bridgingParagraph}
              onChange={set('bridgingParagraph')}
              multiline
              rows={3}
              placeholder="Our Board of Advisors conducts periodic curriculum reviews…"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Button Text"
                value={data?.bridgingButtonText}
                onChange={set('bridgingButtonText')}
                placeholder="Explore Placements"
              />
              <Field
                label="Button URL"
                value={data?.bridgingButtonHref}
                onChange={set('bridgingButtonHref')}
                placeholder="/placements"
              />
            </div>
          </div>
        );
      }}
    </BoardOfAdvisorsSectionEditorShell>
  );
}

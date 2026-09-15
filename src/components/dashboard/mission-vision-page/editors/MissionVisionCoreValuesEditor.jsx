'use client';

import MissionVisionSectionEditorShell from '../MissionVisionSectionEditorShell';

// iconKey → UI display config
const VALUE_CONFIG = {
  integrity: {
    label: 'Integrity',
    emoji: '🛡️',
    color: '#F59E0B',
  },
  holistic_health: {
    label: 'Holistic Health',
    emoji: '❤️',
    color: '#EF4444',
  },
  social_responsibility: {
    label: 'Social Responsibility',
    emoji: '🤝',
    color: '#F97316',
  },
  agility_innovation: {
    label: 'Agility & Innovation',
    emoji: '💡',
    color: '#EAB308',
  },
};

const ICON_ORDER = ['integrity', 'holistic_health', 'social_responsibility', 'agility_innovation'];

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

function TextArea({ label, value, onChange, placeholder = '', rows = 3 }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
      />
    </div>
  );
}

export default function MissionVisionCoreValuesEditor() {
  return (
    <MissionVisionSectionEditorShell
      sectionKey="core_values"
      title="Core Values"
      description="Section heading, watermark subtitle, and the four core value cards. Icons and colours are fixed by type."
    >
      {(data, setData) => {
        const values = data?.coreValues || [];

        function updateValue(iconKey, field, value) {
          const existing = values.find((v) => v.iconKey === iconKey);
          let updated;
          if (existing) {
            updated = values.map((v) =>
              v.iconKey === iconKey ? { ...v, [field]: value } : v,
            );
          } else {
            updated = [
              ...values,
              {
                iconKey,
                title:       '',
                description: '',
                order:       ICON_ORDER.indexOf(iconKey),
                [field]:     value,
              },
            ];
          }
          setData({ ...data, coreValues: updated });
        }

        return (
          <>
            {/* Section heading fields */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Heading</h2>
              <Field
                label="Title"
                value={data?.coreValuesSectionTitle}
                onChange={(v) => setData({ ...data, coreValuesSectionTitle: v })}
                placeholder="Our Core Values"
              />
              <Field
                label="Watermark / Background Text"
                value={data?.coreValuesSectionSubtitle}
                onChange={(v) => setData({ ...data, coreValuesSectionSubtitle: v })}
                placeholder="The IPS DNA"
                hint="Shown as a large faded text behind the heading. Keep it short."
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-[12px] text-amber-800">
                <strong>Icons & colours are fixed</strong> per card type and cannot be changed here. Only title and description text is editable.
              </p>
            </div>

            {/* Individual value cards */}
            {ICON_ORDER.map((iconKey) => {
              const cfg  = VALUE_CONFIG[iconKey];
              const card = values.find((v) => v.iconKey === iconKey) || {};

              return (
                <div
                  key={iconKey}
                  className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[20px]">{cfg.emoji}</span>
                    <h2 className="text-[14px] font-bold text-[#222]">{cfg.label}</h2>
                    <span
                      className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: cfg.color }}
                    >
                      {iconKey}
                    </span>
                  </div>

                  <Field
                    label="Card Title"
                    value={card.title}
                    onChange={(v) => updateValue(iconKey, 'title', v)}
                    placeholder={cfg.label}
                  />

                  <TextArea
                    label="Description"
                    value={card.description}
                    onChange={(v) => updateValue(iconKey, 'description', v)}
                    rows={3}
                  />
                </div>
              );
            })}
          </>
        );
      }}
    </MissionVisionSectionEditorShell>
  );
}

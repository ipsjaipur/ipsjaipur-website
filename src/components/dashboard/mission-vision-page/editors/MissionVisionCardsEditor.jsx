'use client';

import MissionVisionSectionEditorShell from '../MissionVisionSectionEditorShell';

// Card type → display label mapping for the UI
const CARD_LABELS = {
  vision:  { heading: 'Vision Card', color: '#F97316', badge: 'Our Vision' },
  mission: { heading: 'Mission Card', color: '#3B82F6', badge: 'Our Mission' },
};

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

export default function MissionVisionCardsEditor() {
  return (
    <MissionVisionSectionEditorShell
      sectionKey="vision_mission"
      title="Vision & Mission"
      description="Edit the two cards — Our Vision (orange) and Our Mission (blue). Icons and colours are fixed by card type."
    >
      {(data, setData) => {
        const cards = data?.visionMissionCards || [];

        // Keep card order stable; always show both card types
        const cardTypes = ['vision', 'mission'];

        function updateCard(cardType, field, value) {
          const existing = cards.find((c) => c.cardType === cardType);
          let updated;
          if (existing) {
            updated = cards.map((c) =>
              c.cardType === cardType ? { ...c, [field]: value } : c,
            );
          } else {
            updated = [
              ...cards,
              {
                cardType,
                label:       CARD_LABELS[cardType]?.badge || '',
                title:       '',
                description: '',
                order:       cardType === 'vision' ? 0 : 1,
                [field]:     value,
              },
            ];
          }
          setData({ ...data, visionMissionCards: updated });
        }

        return (
          <>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-[12px] text-amber-800">
                <strong>Icons & colours are fixed</strong> — the orange Eye icon is always Vision; the blue Target icon is always Mission. Only text content is editable here.
              </p>
            </div>

            {cardTypes.map((cardType) => {
              const card = cards.find((c) => c.cardType === cardType) || {};
              const cfg  = CARD_LABELS[cardType];

              return (
                <div
                  key={cardType}
                  className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: cfg.color }}
                    >
                      {cfg.badge}
                    </span>
                    <h2 className="text-[14px] font-bold text-[#222]">{cfg.heading}</h2>
                  </div>

                  {/* Label */}
                  <Field
                    label="Card Label (watermark text)"
                    value={card.label}
                    onChange={(v) => updateCard(cardType, 'label', v)}
                    placeholder={cfg.badge}
                  />

                  {/* Title */}
                  <Field
                    label="Card Title"
                    value={card.title}
                    onChange={(v) => updateCard(cardType, 'title', v)}
                    placeholder={
                      cardType === 'vision'
                        ? 'Achieving Excellence in Professional Education'
                        : 'Employability & Social Responsibility'
                    }
                  />

                  {/* Description */}
                  <TextArea
                    label="Description"
                    value={card.description}
                    onChange={(v) => updateCard(cardType, 'description', v)}
                    rows={5}
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

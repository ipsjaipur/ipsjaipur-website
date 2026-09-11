'use client';

import BoardOfAdvisorsSectionEditorShell from '../BoardOfAdvisorsSectionEditorShell';
import SortableList from '../../home-page/SortableList';

// ── Reusable labelled field ───────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false, rows = 2, placeholder = '' }) {
  const cls =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
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

// ── Single advisor card item ──────────────────────────────────────────────────
function AdvisorItem(item, _index, update) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={item.name || ''}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Dr. S.K. Agarwal"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Initials (for future avatar)
          </label>
          <input
            type="text"
            value={item.initials || ''}
            onChange={(e) => update({ initials: e.target.value })}
            placeholder="SA"
            maxLength={3}
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Designation <span className="text-orange-500">(shown in orange)</span>
        </label>
        <input
          type="text"
          value={item.designation || ''}
          onChange={(e) => update({ designation: e.target.value })}
          placeholder="Member, Board of Advisors"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Organization
        </label>
        <input
          type="text"
          value={item.organization || ''}
          onChange={(e) => update({ organization: e.target.value })}
          placeholder="Chairman, Agarwal Hospital"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Description
        </label>
        <textarea
          rows={3}
          value={item.description || ''}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Brief professional background…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
        />
      </div>
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────
export default function BoardOfAdvisorsAdvisorsEditor() {
  return (
    <BoardOfAdvisorsSectionEditorShell
      sectionKey="advisors"
      title="Advisors"
      description="Section header text and all advisor profile cards. Drag to reorder."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            {/* ── Section header ─────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Header</h2>

              <Field
                label="Ghost Background Text"
                value={data?.ghostText}
                onChange={set('ghostText')}
                placeholder="Corporate Leadership"
              />
              <Field
                label="Main Heading"
                value={data?.sectionHeading}
                onChange={set('sectionHeading')}
                placeholder="Guided by Industry Legends"
              />
              <Field
                label="Subtitle Paragraph"
                value={data?.sectionSubtitle}
                onChange={set('sectionSubtitle')}
                multiline
                rows={3}
                placeholder="The strategic trajectory, curriculum relevance…"
              />
            </div>

            {/* ── Advisor cards ──────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Advisor Cards</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Each card shows name, designation (orange), organization, and description. Drag to reorder.
              </p>
              <SortableList
                items={data?.advisors || []}
                onChange={(advisors) => setData({ ...data, advisors })}
                renderItem={AdvisorItem}
                onAdd={() => ({
                  name:         '',
                  designation:  '',
                  organization: '',
                  description:  '',
                  initials:     '',
                  order:        0,
                })}
                addLabel="Add Advisor"
              />
            </div>
          </>
        );
      }}
    </BoardOfAdvisorsSectionEditorShell>
  );
}

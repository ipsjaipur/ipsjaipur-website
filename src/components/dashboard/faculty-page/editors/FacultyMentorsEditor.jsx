'use client';

import FacultySectionEditorShell from '../FacultySectionEditorShell';
import SortableList from '../../home-page/SortableList';

// ── Reusable labelled field ───────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
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

// ── Single mentor row item ────────────────────────────────────────────────────
function MentorItem(item, _index, update) {
  const inp =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  const lbl = 'block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1';

  return (
    <div className="space-y-3">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-3 border p-2 rounded-sm">
          <div>
            <label className={lbl}>Full Name</label>
            <input
              type="text"
              value={item.name || ''}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Mr. John Smith"
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>
              Designation <span className="text-[#77838f] normal-case">(col 1 — shown below name)</span>
            </label>
            <input
              type="text"
              value={item.qualification || ''}
              onChange={(e) => update({ qualification: e.target.value })}
              placeholder="Sr. Vice President"
              className={inp}
            />
          </div>
        </div>
        {/* Designation (qualification field) + Organization (experience field) */}

        <div className="space-y-3 border p-2 rounded-sm">
          <label className={lbl}>
            Organization <span className="text-[#77838f] normal-case">(col 2)</span>
          </label>
          <input
            type="text"
            value={item.experience || ''}
            onChange={(e) => update({ experience: e.target.value })}
            placeholder="HDFC Bank Ltd."
            className={inp}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────
export default function FacultyMentorsEditor() {
  return (
    <FacultySectionEditorShell
      sectionKey="mentors"
      title="Corporate Speakers / Mentors"
      description="Section title, column labels, and all corporate mentor rows. Drag to reorder."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            {/* ── Section header ────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Settings</h2>

              <Field
                label="Section Title"
                value={data?.mentorsSectionTitle}
                onChange={set('mentorsSectionTitle')}
                placeholder="Corporate Speakers / Mentors"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Column 1 Heading (Name & Designation)"
                  value={data?.mentorsColName}
                  onChange={set('mentorsColName')}
                  placeholder="Name & Designation"
                />
                <Field
                  label="Column 2 Heading (Qualification)"
                  value={data?.mentorsColQual}
                  onChange={set('mentorsColQual')}
                  placeholder="Qualification"
                />
              </div>
            </div>

            {/* ── Mentor rows ───────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Mentor / Corporate Speaker Entries</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Col 1 shows Name + Designation. Col 2 shows Organization. Drag to reorder.
              </p>
              <SortableList
                items={data?.mentors || []}
                onChange={(mentors) => setData({ ...data, mentors })}
                renderItem={MentorItem}
                onAdd={() => ({
                  name: '',
                  qualification: '',
                  experience: '',
                  order: 0,
                })}
                addLabel="Add Mentor"
              />
            </div>
          </>
        );
      }}
    </FacultySectionEditorShell>
  );
}

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

// ── Single faculty member row item ────────────────────────────────────────────
function FacultyMemberItem(item, _index, update) {
  const inp =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  const lbl = 'block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1';

  return (
    <div className="space-y-3">
      {/* Name + Designation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-3 border p-2 rounded-sm">
          <div>
            <label className={lbl}>Full Name</label>
            <input
              type="text"
              value={item.name || ''}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Dr. Jane Doe"
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>
              Designation <span className="text-[#77838f] normal-case">(optional, shown in brackets)</span>
            </label>
            <input
              type="text"
              value={item.designation || ''}
              onChange={(e) => update({ designation: e.target.value })}
              placeholder="Dean / Chairman…"
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Qualification</label>
            <input
              type="text"
              value={item.qualification || ''}
              onChange={(e) => update({ qualification: e.target.value })}
              placeholder="Ph.D, MBA…"
              className={inp}
            />
          </div>
        </div>
        <div className="border p-2  rounded-sm">
          <label className={lbl}>Experience</label>
          <input
            type="text"
            value={item.experience || ''}
            onChange={(e) => update({ experience: e.target.value })}
            placeholder="20 Years of Work Experience…"
            className={inp}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────
export default function FacultyFacultyEditor() {
  return (
    <FacultySectionEditorShell
      sectionKey="faculty"
      title="Core & Visiting Faculty"
      description="Section title, column labels, and all faculty member rows. Drag to reorder."
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
                value={data?.facultySectionTitle}
                onChange={set('facultySectionTitle')}
                placeholder="Core & Visiting Faculty"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Column 1 Heading (Name)"
                  value={data?.facultyColName}
                  onChange={set('facultyColName')}
                  placeholder="Faculty Name"
                />
                <Field
                  label="Column 2 Heading (Experience)"
                  value={data?.facultyColExp}
                  onChange={set('facultyColExp')}
                  placeholder="Experience"
                />
              </div>
            </div>

            {/* ── Faculty rows ──────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Faculty Members</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Each row shows in the table as Name / Qualification / Designation (col 1) and Experience (col 2). Drag
                to reorder.
              </p>
              <SortableList
                items={data?.facultyMembers || []}
                onChange={(facultyMembers) => setData({ ...data, facultyMembers })}
                renderItem={FacultyMemberItem}
                onAdd={() => ({
                  name: '',
                  qualification: '',
                  designation: '',
                  experience: '',
                  order: 0,
                })}
                addLabel="Add Faculty Member"
              />
            </div>
          </>
        );
      }}
    </FacultySectionEditorShell>
  );
}

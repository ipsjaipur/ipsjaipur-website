'use client';

import { PlusCircle, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import CareerSectionEditorShell from '../CareerSectionEditorShell';

/**
 * Editor for a single job opening group (department + roles[]).
 */
function OpeningCard({ opening, idx, onChange, onRemove }) {
  const [expanded, setExpanded] = useState(true);

  function updateDept(val) {
    onChange({ ...opening, department: val });
  }

  function updateRole(rIdx, val) {
    const next = (opening.roles || []).map((r, i) => (i === rIdx ? val : r));
    onChange({ ...opening, roles: next });
  }

  function addRole() {
    onChange({ ...opening, roles: [...(opening.roles || []), ''] });
  }

  function removeRole(rIdx) {
    onChange({ ...opening, roles: (opening.roles || []).filter((_, i) => i !== rIdx) });
  }

  return (
    <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#f8fafc]">
        <GripVertical className="w-4 h-4 text-[#aab4bf] shrink-0" />
        <span className="flex-1 text-[13px] font-semibold text-[#222] truncate">
          {opening.department || `Department ${idx + 1}`}
        </span>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="p-1 text-[#77838f] hover:text-[#222] transition cursor-pointer"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-[#aab4bf] hover:text-red-500 transition cursor-pointer"
          title="Remove department"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {expanded && (
        <div className="p-4 space-y-4">
          {/* Department name */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
              Department / Position Group
            </label>
            <input
              type="text"
              value={opening.department || ''}
              onChange={(e) => updateDept(e.target.value)}
              placeholder="e.g. SENIOR LECTURERS / LECTURERS"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
            />
          </div>

          {/* Roles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide">
                Roles / Subjects
              </label>
              <button
                type="button"
                onClick={addRole}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#eb5905] hover:underline cursor-pointer"
              >
                <PlusCircle className="w-3 h-3" />
                Add Role
              </button>
            </div>

            {(opening.roles || []).length === 0 && (
              <p className="text-[12px] text-[#77838f] italic">No roles yet.</p>
            )}

            <div className="space-y-2">
              {(opening.roles || []).map((role, rIdx) => (
                <div key={rIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => updateRole(rIdx, e.target.value)}
                    placeholder={`Role ${rIdx + 1}`}
                    className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                  />
                  <button
                    type="button"
                    onClick={() => removeRole(rIdx)}
                    className="p-1.5 text-[#aab4bf] hover:text-red-500 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CareerOpeningsEditor() {
  return (
    <CareerSectionEditorShell
      sectionKey="openings"
      title="Current Openings"
      description="Manage job departments and their role / subject lists shown on the career page."
    >
      {(data, setData) => {
        const openings = data?.openings || [];

        function updateHeading(val) {
          setData({ ...data, openingsHeading: val });
        }

        function updateOpening(idx, val) {
          const next = openings.map((o, i) => (i === idx ? val : o));
          setData({ ...data, openings: next });
        }

        function addOpening() {
          const next = [
            ...openings,
            { department: '', roles: [], order: openings.length },
          ];
          setData({ ...data, openings: next });
        }

        function removeOpening(idx) {
          const next = openings
            .filter((_, i) => i !== idx)
            .map((o, i) => ({ ...o, order: i }));
          setData({ ...data, openings: next });
        }

        return (
          <>
            {/* Section heading */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Heading</h2>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Heading Text
                </label>
                <input
                  type="text"
                  value={data?.openingsHeading || ''}
                  onChange={(e) => updateHeading(e.target.value)}
                  placeholder="Current Openings"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
            </div>

            {/* Openings list */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[14px] font-bold text-[#222]">Job Departments</h2>
                  <p className="text-[12px] text-[#77838f] mt-0.5">
                    Each department card holds a heading and a list of roles/subjects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addOpening}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-1.5 hover:bg-[#eb5905]/5 transition cursor-pointer shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Add Department
                </button>
              </div>

              {openings.length === 0 && (
                <p className="text-[12px] text-[#77838f] italic">
                  No departments yet — click &ldquo;Add Department&rdquo; to get started.
                </p>
              )}

              <div className="space-y-3">
                {openings.map((opening, idx) => (
                  <OpeningCard
                    key={idx}
                    opening={opening}
                    idx={idx}
                    onChange={(val) => updateOpening(idx, val)}
                    onRemove={() => removeOpening(idx)}
                  />
                ))}
              </div>
            </div>
          </>
        );
      }}
    </CareerSectionEditorShell>
  );
}

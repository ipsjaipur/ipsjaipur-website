'use client';

import StudentLifeSectionEditorShell from '../StudentLifeSectionEditorShell';
import SortableList from '../../home-page/SortableList';

function CommitteeItem(item, _index, update) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Committee Name
        </label>
        <input
          type="text"
          value={item.name || ''}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="e.g. Placement Committee"
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
          placeholder="Committee description…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
        />
      </div>
    </div>
  );
}

export default function CommitteesEditor() {
  return (
    <StudentLifeSectionEditorShell
      sectionKey="committees"
      title="Committees"
      description="List of student committees with their names and descriptions."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Heading</h2>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={data?.committeesHeading || ''}
                  onChange={(e) => set('committeesHeading')(e.target.value)}
                  placeholder="Committees:"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Committees</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Each committee has a name and a description. Drag to reorder.
              </p>
              <SortableList
                items={data?.committees || []}
                onChange={(committees) => setData({ ...data, committees })}
                renderItem={CommitteeItem}
                onAdd={() => ({ name: '', description: '', order: 0 })}
                addLabel="Add Committee"
              />
            </div>
          </>
        );
      }}
    </StudentLifeSectionEditorShell>
  );
}

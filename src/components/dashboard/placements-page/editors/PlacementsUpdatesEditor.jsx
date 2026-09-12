'use client';

import PlacementsSectionEditorShell from '../PlacementsSectionEditorShell';
import SortableList from '../../home-page/SortableList';
import ImageUpload from '../../home-page/ImageUpload';

function UpdateItem(item, index, update) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <ImageUpload
        label="Student Photo"
        value={item.image || ''}
        onChange={(url) => update({ image: url })}
        aspectHint="Square portrait recommended (400×400)"
        maxWidth="200px"
        previewHeight="120px"
        objectFit="cover"
      />
      <div className="space-y-2">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Student Name</label>
          <input
            type="text"
            value={item.name || ''}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Tanishka Pareekh"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Company</label>
          <input
            type="text"
            value={item.company || ''}
            onChange={(e) => update({ company: e.target.value })}
            placeholder="Archer & Bull"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
      </div>
    </div>
  );
}

export default function PlacementsUpdatesEditor() {
  return (
    <PlacementsSectionEditorShell
      sectionKey="updates"
      title="Placement Updates"
      description="Student placement card grid — name, company, and square portrait photo."
    >
      {(data, setData) => (
        <>
          {/* Heading */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-3">Section Heading</h2>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Heading</label>
              <input
                type="text"
                value={data?.updatesHeading || ''}
                onChange={(e) => setData({ ...data, updatesHeading: e.target.value })}
                placeholder="PLACEMENT UPDATES"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
          </div>

          {/* Students */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Placed Students</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              Drag to reorder. Each card shows the student photo, name, and company.
            </p>
            <SortableList
              items={data?.placementUpdates || []}
              onChange={(placementUpdates) => setData({ ...data, placementUpdates })}
              renderItem={UpdateItem}
              onAdd={() => ({ name: '', company: '', image: '', order: 0 })}
              addLabel="Add Student"
            />
          </div>
        </>
      )}
    </PlacementsSectionEditorShell>
  );
}

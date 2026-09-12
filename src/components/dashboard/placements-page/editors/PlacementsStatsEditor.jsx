'use client';

import PlacementsSectionEditorShell from '../PlacementsSectionEditorShell';
import SortableList from '../../home-page/SortableList';
import ImageUpload from '../../home-page/ImageUpload';

function StatItemRow(item, index, update) {
  return (
    <div className="space-y-3">
      <ImageUpload
        label="Section Image"
        value={item.image || ''}
        onChange={(url) => update({ image: url })}
        aspectHint="Full-width infographic (e.g. sector-wise chart)"
        maxWidth="100%"
        previewHeight="160px"
        objectFit="contain"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Title</label>
          <input
            type="text"
            value={item.title || ''}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="Placements"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Description <span className="text-[#aab4bf] normal-case font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={item.description || ''}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Short description"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
      </div>
    </div>
  );
}

export default function PlacementsStatsEditor() {
  return (
    <PlacementsSectionEditorShell
      sectionKey="stats"
      title="Placement Stats (Sector-wise)"
      description="Infographic images shown below the PLACEMENTS slider — sector-wise charts."
    >
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <h2 className="text-[14px] font-bold text-[#222] mb-1">Stat Images</h2>
          <p className="text-[12px] text-[#77838f] mb-4">
            Each item shows a full-width infographic image with a title above it. Drag to reorder.
          </p>
          <SortableList
            items={data?.statItems || []}
            onChange={(statItems) => setData({ ...data, statItems })}
            renderItem={StatItemRow}
            onAdd={() => ({ image: '', title: '', description: '', order: 0 })}
            addLabel="Add Stat Image"
          />
        </div>
      )}
    </PlacementsSectionEditorShell>
  );
}

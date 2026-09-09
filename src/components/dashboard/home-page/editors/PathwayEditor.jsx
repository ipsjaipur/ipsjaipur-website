'use client';

import SectionEditorShell from '../SectionEditorShell';
import SortableList from '../SortableList';
import ImageUpload from '../ImageUpload';

function PathwayCardItem(item, index, update) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImageUpload
        label="Icon Image"
        value={item.icon || ''}
        onChange={(url) => update({ icon: url })}
        aspectHint="Small icon, square recommended"
        maxWidth="220px"
        previewHeight="140px"
        objectFit="contain"
      />
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Title</label>
          <textarea
            rows={2}
            value={item.title || ''}
            onChange={(e) => update({ title: e.target.value })}
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Accent Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={item.color || '#FF6B00'}
              onChange={(e) => update({ color: e.target.value })}
              className="w-10 h-8 rounded border border-[#e2e8f0] cursor-pointer"
            />
            <input
              type="text"
              value={item.color || '#FF6B00'}
              onChange={(e) => update({ color: e.target.value })}
              className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PathwayEditor() {
  return (
    <SectionEditorShell
      sectionKey="pathway"
      title="Pathway to Excellence"
      description="Feature cards arranged around the centre graduate image."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        return (
          <>
            {/* Text & image */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Header</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                    Section Label
                  </label>
                  <input
                    type="text"
                    value={data?.pathwaySectionLabel || ''}
                    onChange={(e) => set('pathwaySectionLabel')(e.target.value)}
                    className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={data?.pathwayHeading || ''}
                    onChange={(e) => set('pathwayHeading')(e.target.value)}
                    className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                  />
                </div>
              </div>
              <ImageUpload
                label="Centre Graduate Image"
                value={data?.pathwayCenterImage || ''}
                onChange={set('pathwayCenterImage')}
                aspectHint="Portrait image recommended"
                maxWidth="220px"
                previewHeight="260px"
                objectFit="contain"
              />
            </div>

            {/* Cards */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Feature Cards</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Drag to reorder. First 5 appear on the left, next 5 on the right.
              </p>
              <SortableList
                items={data?.pathwayCards || []}
                onChange={(pathwayCards) => setData({ ...data, pathwayCards })}
                renderItem={PathwayCardItem}
                onAdd={() => ({ icon: '', title: '', color: '#FF6B00', order: 0 })}
                addLabel="Add Card"
              />
            </div>
          </>
        );
      }}
    </SectionEditorShell>
  );
}

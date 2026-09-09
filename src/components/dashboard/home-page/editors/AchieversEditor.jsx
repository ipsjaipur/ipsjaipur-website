'use client';

import SectionEditorShell from '../SectionEditorShell';
import SortableList from '../SortableList';
import ImageUpload from '../ImageUpload';

function AchieverItem(item, index, update) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImageUpload
        label="Achiever Image"
        value={item.image || ''}
        onChange={(url) => update({ image: url })}
        aspectHint="Landscape/square image"
        maxWidth="300px"
        previewHeight="160px"
        objectFit="cover"
      />
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Name / Alt Text
        </label>
        <input
          type="text"
          value={item.name || ''}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="e.g. Ayushi Kabra - IPS Achiever"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
    </div>
  );
}

export default function AchieversEditor() {
  return (
    <SectionEditorShell
      sectionKey="achievers"
      title="Our Achievers"
      description="Manage the achiever images shown in the slider section."
    >
      {(data, setData) => (
        <>
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={data?.achieversHeading || ''}
                onChange={(e) => setData({ ...data, achieversHeading: e.target.value })}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Achiever Images</h2>
            <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder. Each image appears as a slide.</p>
            <SortableList
              items={data?.achievers || []}
              onChange={(achievers) => setData({ ...data, achievers })}
              renderItem={AchieverItem}
              onAdd={() => ({ name: '', image: '', order: 0 })}
              addLabel="Add Achiever"
            />
          </div>
        </>
      )}
    </SectionEditorShell>
  );
}

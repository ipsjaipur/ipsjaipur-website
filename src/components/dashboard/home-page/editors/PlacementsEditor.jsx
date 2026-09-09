'use client';

import SectionEditorShell from '../SectionEditorShell';
import SortableList from '../SortableList';
import ImageUpload from '../ImageUpload';

function StatItem(item, index, update) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Value</label>
        <input
          type="text"
          value={item.value || ''}
          onChange={(e) => update({ value: e.target.value })}
          placeholder="26 LPA+"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Label</label>
        <input
          type="text"
          value={item.label || ''}
          onChange={(e) => update({ label: e.target.value })}
          placeholder="Highest Package Offered"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
    </div>
  );
}

function LogoItem(item, index, update) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <ImageUpload
        label="Logo"
        value={item.logo || ''}
        onChange={(url) => update({ logo: url })}
        aspectHint="Transparent PNG recommended"
        maxWidth="220px"
        previewHeight="100px"
        objectFit="contain"
      />
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Company Name
        </label>
        <input
          type="text"
          value={item.name || ''}
          onChange={(e) => update({ name: e.target.value })}
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
    </div>
  );
}

function StudentItem(item, index, update) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <ImageUpload
        label="Placement Image"
        value={item.image || ''}
        onChange={(url) => update({ image: url })}
        aspectHint="Landscape recommended"
        maxWidth="300px"
        previewHeight="140px"
        objectFit="cover"
      />
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Label / Name
        </label>
        <input
          type="text"
          value={item.name || ''}
          onChange={(e) => update({ name: e.target.value })}
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
    </div>
  );
}

export default function PlacementsEditor() {
  return (
    <SectionEditorShell
      sectionKey="placements"
      title="Placements"
      description="Stats, company logos marquee, and placement student slider."
    >
      {(data, setData) => (
        <>
          {/* Heading */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Section Text</h2>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Heading
              </label>
              <input
                type="text"
                value={data?.placementsHeading || ''}
                onChange={(e) => setData({ ...data, placementsHeading: e.target.value })}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Sub-text
              </label>
              <textarea
                rows={2}
                value={data?.placementsSubText || ''}
                onChange={(e) => setData({ ...data, placementsSubText: e.target.value })}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Stats</h2>
            <p className="text-[12px] text-[#77838f] mb-4">The 3 stat boxes (26 LPA+, 5.5 LPA+, 100+).</p>
            <SortableList
              items={data?.placementsStats || []}
              onChange={(placementsStats) => setData({ ...data, placementsStats })}
              renderItem={StatItem}
              onAdd={() => ({ value: '', label: '', order: 0 })}
              addLabel="Add Stat"
            />
          </div>

          {/* Company Logos */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Company Logos (Marquee)</h2>
            <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder. Logos scroll in a marquee strip.</p>
            <SortableList
              items={data?.companyLogos || []}
              onChange={(companyLogos) => setData({ ...data, companyLogos })}
              renderItem={LogoItem}
              onAdd={() => ({ name: '', logo: '', order: 0 })}
              addLabel="Add Company Logo"
            />
          </div>

          {/* Placement Students */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Placement Student Images (Slider)</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              Drag to reorder. Displayed in the slider below company logos.
            </p>
            <SortableList
              items={data?.placementStudents || []}
              onChange={(placementStudents) => setData({ ...data, placementStudents })}
              renderItem={StudentItem}
              onAdd={() => ({ name: '', image: '', order: 0 })}
              addLabel="Add Placement Image"
            />
          </div>
        </>
      )}
    </SectionEditorShell>
  );
}

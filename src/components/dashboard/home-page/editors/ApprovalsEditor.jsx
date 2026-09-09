'use client';

import SectionEditorShell from '../SectionEditorShell';
import SortableList from '../SortableList';
import ImageUpload from '../ImageUpload';

function AffiliationItem(item, index, update) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImageUpload
        label="Logo"
        value={item.logo || ''}
        onChange={(url) => update({ logo: url })}
        aspectHint="Square logo recommended"
        maxWidth="260px"
        previewHeight="140px"
        objectFit="contain"
      />
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Label (e.g. "Approved by")
          </label>
          <input
            type="text"
            value={item.label || ''}
            onChange={(e) => update({ label: e.target.value })}
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={item.name || ''}
            onChange={(e) => update({ name: e.target.value })}
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Logo Alt Text
          </label>
          <input
            type="text"
            value={item.alt || ''}
            onChange={(e) => update({ alt: e.target.value })}
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
      </div>
    </div>
  );
}

export default function ApprovalsEditor() {
  return (
    <SectionEditorShell
      sectionKey="approvals"
      title="Approvals & Affiliations"
      description="Manage the approval/affiliation logos displayed below the banner."
    >
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <h2 className="text-[14px] font-bold text-[#222] mb-1">Affiliation Cards</h2>
          <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder.</p>
          <SortableList
            items={data?.affiliations || []}
            onChange={(affiliations) => setData({ ...data, affiliations })}
            renderItem={AffiliationItem}
            onAdd={() => ({ label: '', name: '', logo: '', alt: '', order: 0 })}
            addLabel="Add Affiliation"
          />
        </div>
      )}
    </SectionEditorShell>
  );
}

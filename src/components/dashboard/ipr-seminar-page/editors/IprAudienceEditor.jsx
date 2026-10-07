'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';
import SortableList from '../../home-page/SortableList';

const inputCls = 'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';

const ICON_OPTIONS = [
  'GraduationCap', 'Microscope', 'Briefcase', 'PenTool', 'Users',
  'Building2', 'Rocket', 'Globe', 'Lightbulb', 'Heart', 'Star',
  'BookOpen', 'Scale', 'Cpu', 'FlaskConical',
];

function AudienceItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Icon</label>
          <select value={item.iconName || 'GraduationCap'} onChange={(e) => update({ iconName: e.target.value })} className={inputCls}>
            {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Accent Colour</label>
          <div className="flex items-center gap-2">
            <input type="color" value={item.color || '#60a5fa'} onChange={(e) => update({ color: e.target.value })} className="w-10 h-9 rounded border border-[#e2e8f0] cursor-pointer p-0.5" />
            <input type="text" value={item.color || '#60a5fa'} onChange={(e) => update({ color: e.target.value })} className={inputCls} placeholder="#60a5fa" />
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Label</label>
          <input type="text" value={item.label || ''} onChange={(e) => update({ label: e.target.value })} placeholder="e.g. Students" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Sub-label</label>
          <input type="text" value={item.sub || ''} onChange={(e) => update({ sub: e.target.value })} placeholder="e.g. UG, PG & Research" className={inputCls} />
        </div>
      </div>
    </div>
  );
}

export default function IprAudienceEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="audience"
      title="Who Should Attend"
      description="The dark audience section with 6 cards showing who the seminar is for."
    >
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Super Text</label>
              <input type="text" value={data?.audienceSuperText || ''} onChange={(e) => setData({ ...data, audienceSuperText: e.target.value })} placeholder="Open For All" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Heading</label>
              <input type="text" value={data?.audienceHeading || ''} onChange={(e) => setData({ ...data, audienceHeading: e.target.value })} placeholder="This Seminar Is For You If You Are…" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Description</label>
              <input type="text" value={data?.audienceDescription || ''} onChange={(e) => setData({ ...data, audienceDescription: e.target.value })} placeholder="The IPR Seminar welcomes everyone…" className={inputCls} />
            </div>
          </div>
          <h3 className="text-[13px] font-bold text-[#222] mb-3">Audience Cards</h3>
          <SortableList
            items={data?.audience || []}
            onChange={(audience) => setData({ ...data, audience })}
            renderItem={AudienceItem}
            onAdd={() => ({ iconName: 'GraduationCap', label: '', sub: '', color: '#60a5fa', order: 0 })}
            addLabel="Add Audience Card"
          />
        </div>
      )}
    </IprSectionEditorShell>
  );
}

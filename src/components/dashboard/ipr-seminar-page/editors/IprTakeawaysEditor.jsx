'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';
import SortableList from '../../home-page/SortableList';

const inputCls = 'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';

const ICON_OPTIONS = [
  'ShieldCheck', 'BookOpen', 'TrendingUp', 'Globe', 'Users', 'Star',
  'Lightbulb', 'Lock', 'FileText', 'Target', 'Zap', 'Rocket',
  'Briefcase', 'GraduationCap', 'Scale', 'BadgeCheck',
];

function TakeawayItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Icon</label>
          <select value={item.iconName || 'ShieldCheck'} onChange={(e) => update({ iconName: e.target.value })} className={inputCls}>
            {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Accent Colour</label>
          <div className="flex items-center gap-2">
            <input type="color" value={item.color || '#eb5905'} onChange={(e) => update({ color: e.target.value })} className="w-10 h-9 rounded border border-[#e2e8f0] cursor-pointer p-0.5" />
            <input type="text" value={item.color || '#eb5905'} onChange={(e) => update({ color: e.target.value })} className={inputCls} placeholder="#eb5905" />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Title</label>
        <input type="text" value={item.title || ''} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Protect What You Create" className={inputCls} />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Description</label>
        <input type="text" value={item.desc || ''} onChange={(e) => update({ desc: e.target.value })} placeholder="Short takeaway description…" className={inputCls} />
      </div>
    </div>
  );
}

export default function IprTakeawaysEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="takeaways"
      title="Key Takeaways"
      description="The 2×3 card grid highlighting what attendees will learn."
    >
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Super Text</label>
              <input type="text" value={data?.takeawaysSuperText || ''} onChange={(e) => setData({ ...data, takeawaysSuperText: e.target.value })} placeholder="What You Will Take Away" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Heading</label>
              <input type="text" value={data?.takeawaysHeading || ''} onChange={(e) => setData({ ...data, takeawaysHeading: e.target.value })} placeholder="Turn Your Ideas Into Protected Assets." className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Description</label>
              <input type="text" value={data?.takeawaysDescription || ''} onChange={(e) => setData({ ...data, takeawaysDescription: e.target.value })} placeholder="Leave the seminar with actionable knowledge…" className={inputCls} />
            </div>
          </div>
          <h3 className="text-[13px] font-bold text-[#222] mb-3">Takeaway Cards</h3>
          <SortableList
            items={data?.takeaways || []}
            onChange={(takeaways) => setData({ ...data, takeaways })}
            renderItem={TakeawayItem}
            onAdd={() => ({ iconName: 'ShieldCheck', title: '', desc: '', color: '#eb5905', order: 0 })}
            addLabel="Add Takeaway Card"
          />
        </div>
      )}
    </IprSectionEditorShell>
  );
}

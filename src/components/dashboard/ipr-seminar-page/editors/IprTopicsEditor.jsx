'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';
import SortableList from '../../home-page/SortableList';

const inputCls =
  'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';

const ICON_OPTIONS = [
  'Lightbulb',
  'Copyright',
  'BadgeCheck',
  'Palette',
  'ShieldCheck',
  'BookOpen',
  'Globe',
  'Lock',
  'FileText',
  'TrendingUp',
  'Star',
  'Zap',
  'Target',
  'Scale',
  'Briefcase',
];

function TopicItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Icon</label>
          <select
            value={item.iconName || 'Lightbulb'}
            onChange={(e) => update({ iconName: e.target.value })}
            className={inputCls}
          >
            {ICON_OPTIONS.map((ic) => (
              <option key={ic} value={ic}>
                {ic}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Accent Colour
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={item.color || '#f5c518'}
              onChange={(e) => update({ color: e.target.value })}
              className="w-10 h-9 rounded border border-[#e2e8f0] cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={item.color || '#f5c518'}
              onChange={(e) => update({ color: e.target.value })}
              className={inputCls}
              placeholder="#f5c518"
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Title</label>
        <input
          type="text"
          value={item.title || ''}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="e.g. Patents"
          className={inputCls}
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Description
        </label>
        <input
          type="text"
          value={item.desc || ''}
          onChange={(e) => update({ desc: e.target.value })}
          placeholder="e.g. Protect inventions & innovation."
          className={inputCls}
        />
      </div>
    </div>
  );
}

export default function IprTopicsEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="topics"
      title="Seminar Topics Strip"
      description="The 5-card topic grid shown below the hero. Each card has an icon, colour, title, and short description."
    >
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Section Sub-heading
              </label>
              <input
                type="text"
                value={data?.topicsSubheading || ''}
                onChange={(e) => setData({ ...data, topicsSubheading: e.target.value })}
                placeholder="Topics Covered"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={data?.topicsHeading || ''}
                onChange={(e) => setData({ ...data, topicsHeading: e.target.value })}
                placeholder="Know What You Can Protect."
                className={inputCls}
              />
            </div>
          </div>
          <h3 className="text-[13px] font-bold text-[#222] mb-3">Topic Cards</h3>
          <SortableList
            items={data?.topics || []}
            onChange={(topics) => setData({ ...data, topics })}
            renderItem={TopicItem}
            onAdd={() => ({ iconName: 'Lightbulb', title: '', desc: '', color: '#f5c518', order: 0 })}
            addLabel="Add Topic Card"
          />
        </div>
      )}
    </IprSectionEditorShell>
  );
}

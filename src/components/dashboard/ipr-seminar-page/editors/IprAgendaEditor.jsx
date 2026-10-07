'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';
import SortableList from '../../home-page/SortableList';

const inputCls =
  'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';

const ICON_OPTIONS = [
  'Globe',
  'Lightbulb',
  'ShieldCheck',
  'TrendingUp',
  'Star',
  'Users',
  'BookOpen',
  'FileText',
  'Zap',
  'Target',
  'Briefcase',
  'Scale',
];

// ── Event highlights (the "What to Expect" card grid) ───────────────────────
function HighlightItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Icon</label>
          <select
            value={item.iconName || 'Globe'}
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
              value={item.color || '#60a5fa'}
              onChange={(e) => update({ color: e.target.value })}
              className="w-10 h-9 rounded border border-[#e2e8f0] cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={item.color || '#60a5fa'}
              onChange={(e) => update({ color: e.target.value })}
              className={inputCls}
              placeholder="#60a5fa"
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Text</label>
        <input
          type="text"
          value={item.text || ''}
          onChange={(e) => update({ text: e.target.value })}
          placeholder="International perspective on Intellectual Property Rights"
          className={inputCls}
        />
      </div>
    </div>
  );
}

// ── Event detail row ────────────────────────────────────────────────────────
function DetailRowItem(item, index, update) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Label</label>
        <input
          type="text"
          value={item.label || ''}
          onChange={(e) => update({ label: e.target.value })}
          placeholder="e.g. Date"
          className={inputCls}
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Value</label>
        <input
          type="text"
          value={item.value || ''}
          onChange={(e) => update({ value: e.target.value })}
          placeholder="e.g. 9 October 2026, Friday"
          className={inputCls}
        />
      </div>
    </div>
  );
}

export default function IprAgendaEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="agenda"
      title="Highlights & Event Details"
      description="Event highlight cards and the event details table."
    >
      {(data, setData) => (
        <div className="space-y-5">
          {/* Section headings */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-4">Section Headings</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Super Text
                </label>
                <input
                  type="text"
                  value={data?.agendaSuperText || ''}
                  onChange={(e) => setData({ ...data, agendaSuperText: e.target.value })}
                  placeholder="What to Expect"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={data?.agendaHeading || ''}
                  onChange={(e) => setData({ ...data, agendaHeading: e.target.value })}
                  placeholder="One Seminar. Multiple Perspectives."
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Mid-section Register Button Text
                </label>
                <input
                  type="text"
                  value={data?.agendaRegisterButtonText || ''}
                  onChange={(e) => setData({ ...data, agendaRegisterButtonText: e.target.value })}
                  placeholder="Register now →"
                  className={inputCls}
                />
              </div>
            </div>
          </div>

          {/* Event highlights cards */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Event Highlight Cards</h2>
            <p className="text-[12px] text-[#77838f] mb-4">The 2×3 icon-text cards in the "What to Expect" section.</p>
            <SortableList
              items={data?.highlights || []}
              onChange={(highlights) => setData({ ...data, highlights })}
              renderItem={HighlightItem}
              onAdd={() => ({ iconName: 'Globe', text: '', color: '#60a5fa', order: 0 })}
              addLabel="Add Highlight Card"
            />
          </div>

          {/* Event details table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Event Details Table</h2>
            <p className="text-[12px] text-[#77838f] mb-3">Label / value rows in the "Mark Your Calendar" panel.</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Super Text
                </label>
                <input
                  type="text"
                  value={data?.eventDetailsSuperText || ''}
                  onChange={(e) => setData({ ...data, eventDetailsSuperText: e.target.value })}
                  placeholder="Mark Your Calendar"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={data?.eventDetailsHeading || ''}
                  onChange={(e) => setData({ ...data, eventDetailsHeading: e.target.value })}
                  placeholder="Event Details"
                  className={inputCls}
                />
              </div>
            </div>
            <SortableList
              items={data?.eventDetailRows || []}
              onChange={(eventDetailRows) => setData({ ...data, eventDetailRows })}
              renderItem={DetailRowItem}
              onAdd={() => ({ label: '', value: '', order: 0 })}
              addLabel="Add Row"
            />
          </div>
        </div>
      )}
    </IprSectionEditorShell>
  );
}

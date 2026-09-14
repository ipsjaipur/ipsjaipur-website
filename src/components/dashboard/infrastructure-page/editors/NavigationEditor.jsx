'use client';

import { useState } from 'react';
import InfrastructureSectionEditorShell from '../InfrastructureSectionEditorShell';
import { GripVertical, Trash2, Plus } from 'lucide-react';

function NavItemRow({ item, index, onUpdate, onRemove, isDragOver, onDragStart, onDragOver, onDrop, onDragEnd }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-3 bg-[#f9fafb] border rounded-xl px-3 py-2.5 transition-all ${
        isDragOver ? 'border-[#eb5905] shadow-md' : 'border-[#e2e8f0]'
      }`}
    >
      <GripVertical className="w-4 h-4 text-[#aab4bf] shrink-0 cursor-grab" />
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-semibold text-[#4a5568] uppercase tracking-wide mb-0.5">
            Anchor ID
          </label>
          <input
            type="text"
            value={item.id || ''}
            onChange={(e) => onUpdate({ id: e.target.value })}
            placeholder="e.g. classrooms"
            className="w-full border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-[#4a5568] uppercase tracking-wide mb-0.5">
            Label
          </label>
          <input
            type="text"
            value={item.label || ''}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="e.g. AC Classrooms"
            className="w-full border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="p-1.5 rounded-lg text-[#aab4bf] hover:text-red-500 hover:bg-red-50 transition cursor-pointer shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function NavigationEditor() {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);

  return (
    <InfrastructureSectionEditorShell
      sectionKey="navigation"
      title="Sidebar Navigation"
      description="The anchor-link nav items shown in the left sidebar. Drag to reorder."
    >
      {(data, setData) => {
        const items = data?.navItems || [];

        function updateItem(i, patch) {
          const next = items.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
          setData({ ...data, navItems: next });
        }
        function removeItem(i) {
          setData({ ...data, navItems: items.filter((_, idx) => idx !== i) });
        }
        function addItem() {
          setData({ ...data, navItems: [...items, { id: '', label: '', order: items.length }] });
        }
        function handleDragStart(e, i) { setDragIdx(i); e.dataTransfer.effectAllowed = 'move'; }
        function handleDragOver(e, i)  { e.preventDefault(); if (i !== overIdx) setOverIdx(i); }
        function handleDrop(e, dropI) {
          e.preventDefault();
          if (dragIdx === null || dragIdx === dropI) { setDragIdx(null); setOverIdx(null); return; }
          const next = [...items];
          const [moved] = next.splice(dragIdx, 1);
          next.splice(dropI, 0, moved);
          setData({ ...data, navItems: next.map((item, i) => ({ ...item, order: i })) });
          setDragIdx(null);
          setOverIdx(null);
        }
        function handleDragEnd() { setDragIdx(null); setOverIdx(null); }

        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Navigation Items</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              The <strong>Anchor ID</strong> must match the <code className="bg-[#f4f6f9] px-1 rounded text-[11px]">id</code> of the corresponding section card on the page.
              The <strong>Label</strong> is what visitors see in the sidebar.
            </p>
            <div className="space-y-2">
              {items.map((item, i) => (
                <NavItemRow
                  key={i}
                  item={item}
                  index={i}
                  onUpdate={(patch) => updateItem(i, patch)}
                  onRemove={() => removeItem(i)}
                  isDragOver={overIdx === i && dragIdx !== i}
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDrop={(e) => handleDrop(e, i)}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-2 hover:bg-[#eb5905]/5 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Nav Item
            </button>
          </div>
        );
      }}
    </InfrastructureSectionEditorShell>
  );
}

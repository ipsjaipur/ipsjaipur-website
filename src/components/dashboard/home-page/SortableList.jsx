'use client';

import { useState } from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';

/**
 * Generic sortable list with drag-and-drop reordering.
 *
 * Props:
 *  - items: array of objects
 *  - onChange: (newItems) => void
 *  - renderItem: (item, index, updateItem, removeItem) => ReactNode
 *  - onAdd: () => object  — factory that returns a new blank item
 *  - addLabel: string
 *  - disabled: boolean
 */
export default function SortableList({
  items = [],
  onChange,
  renderItem,
  onAdd,
  addLabel = 'Add Item',
  disabled = false,
}) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  function updateItem(index, patch) {
    const next = items.map((item, i) => (i === index ? { ...item, ...patch } : item));
    onChange(next);
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    if (!onAdd) return;
    onChange([...items, onAdd()]);
  }

  // ── Drag handlers ───────────────────────────────────────────────────────────
  function handleDragStart(e, index) {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e, index) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (index !== overIndex) setOverIndex(index);
  }

  function handleDrop(e, dropIndex) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(dropIndex, 0, moved);
    // Re-assign order values
    onChange(next.map((item, i) => ({ ...item, order: i })));
    setDragIndex(null);
    setOverIndex(null);
  }

  function handleDragEnd() {
    setDragIndex(null);
    setOverIndex(null);
  }

  return (
    <div className="space-y-2 max-h-[700px] overflow-auto pr-4">
      {items.map((item, index) => (
        <div
          key={item._id || item.id || index}
          draggable={!disabled}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`
            relative bg-white border rounded-xl transition-all duration-150
            ${overIndex === index && dragIndex !== index ? 'border-[#eb5905] shadow-md' : 'border-[#e2e8f0]'}
            ${dragIndex === index ? 'opacity-40' : 'opacity-100'}
          `}
        >
          <div className="flex items-start gap-2 p-3">
            {/* Drag handle */}
            {!disabled && (
              <div className="mt-1 cursor-grab active:cursor-grabbing text-[#aab4bf] hover:text-[#eb5905] transition shrink-0">
                <GripVertical className="w-4 h-4" />
              </div>
            )}

            {/* Item content */}
            <div className="flex-1 min-w-0">
              {renderItem(
                item,
                index,
                (patch) => updateItem(index, patch),
                () => removeItem(index),
              )}
            </div>

            {/* Remove button */}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="mt-1 shrink-0 text-[#aab4bf] hover:text-red-500 transition cursor-pointer"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      {onAdd && !disabled && (
        <button
          type="button"
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#e2e8f0] rounded-xl py-2.5 text-[13px] font-medium text-[#77838f] hover:border-[#eb5905] hover:text-[#eb5905] transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}

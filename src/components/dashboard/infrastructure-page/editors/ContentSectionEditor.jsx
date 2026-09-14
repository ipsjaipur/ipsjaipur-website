'use client';

/**
 * Reusable editor for all infrastructure content sections that share the same
 * shape: title, subtitle, description, and optionally images[] / image (single).
 *
 * Used by: classrooms, auditorium, labs, library, sports, wifi, parking,
 *          hostels, location, transport, nearby, ecosystem
 *
 * Props:
 *  - sectionKey   : string
 *  - title        : string  (editor heading shown to admin)
 *  - description  : string  (editor sub-description shown to admin)
 *  - hasImages    : boolean — show drag-sortable images list (default true)
 *  - hasSingleImage: boolean — show a single image field instead of array
 *  - hasTitle     : boolean — show title/subtitle fields (default true)
 */

import InfrastructureSectionEditorShell from '../InfrastructureSectionEditorShell';
import ImageUpload from '../../home-page/ImageUpload';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState } from 'react';

function TextField({ label, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
      />
    </div>
  );
}

/** Inline drag-sortable images list */
function ImagesList({ images = [], onChange }) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);

  function handleDragStart(e, i) {
    setDragIdx(i);
    e.dataTransfer.effectAllowed = 'move';
  }
  function handleDragOver(e, i) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (i !== overIdx) setOverIdx(i);
  }
  function handleDrop(e, dropI) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === dropI) { setDragIdx(null); setOverIdx(null); return; }
    const next = [...images];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(dropI, 0, moved);
    onChange(next);
    setDragIdx(null);
    setOverIdx(null);
  }
  function handleDragEnd() { setDragIdx(null); setOverIdx(null); }

  function updateUrl(i, url) {
    const next = [...images];
    next[i] = url;
    onChange(next);
  }
  function remove(i) { onChange(images.filter((_, idx) => idx !== i)); }
  function add()     { onChange([...images, '']); }

  return (
    <div className="space-y-3">
      {images.map((url, i) => (
        <div
          key={i}
          draggable
          onDragStart={(e) => handleDragStart(e, i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={(e) => handleDrop(e, i)}
          onDragEnd={handleDragEnd}
          className={`flex items-start gap-3 bg-[#f9fafb] border rounded-xl p-3 transition-all ${
            overIdx === i && dragIdx !== i ? 'border-[#eb5905] shadow-md' : 'border-[#e2e8f0]'
          }`}
        >
          <GripVertical className="w-4 h-4 text-[#aab4bf] mt-2 shrink-0 cursor-grab" />
          <div className="flex-1">
            <ImageUpload
              value={url}
              onChange={(v) => updateUrl(i, v)}
              aspectHint="Any aspect ratio"
              maxWidth="100%"
              previewHeight="140px"
              objectFit="cover"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-1 p-1.5 rounded-lg text-[#aab4bf] hover:text-red-500 hover:bg-red-50 transition cursor-pointer shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-2 hover:bg-[#eb5905]/5 transition cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Image
      </button>
    </div>
  );
}

export default function ContentSectionEditor({
  sectionKey,
  title,
  description,
  hasImages       = true,
  hasSingleImage  = false,
  hasTitle        = true,
}) {
  return (
    <InfrastructureSectionEditorShell
      sectionKey={sectionKey}
      title={title}
      description={description}
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        return (
          <>
            {/* Title / Subtitle card */}
            {hasTitle && (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
                <h2 className="text-[14px] font-bold text-[#222]">Section Heading</h2>
                <TextField
                  label="Title (orange, uppercase)"
                  value={data?.title}
                  onChange={set('title')}
                  placeholder="Section title…"
                />
                <TextField
                  label="Subtitle"
                  value={data?.subtitle}
                  onChange={set('subtitle')}
                  placeholder="Subtitle / tagline…"
                />
              </div>
            )}

            {/* Description card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-3">
              <h2 className="text-[14px] font-bold text-[#222]">Description</h2>
              <p className="text-[12px] text-[#77838f]">
                Supports line breaks — press Enter for a new line. Displayed with whitespace preserved.
              </p>
              <textarea
                rows={6}
                value={data?.description || ''}
                onChange={(e) => set('description')(e.target.value)}
                placeholder="Section description…"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
              />
            </div>

            {/* Images carousel list */}
            {hasImages && !hasSingleImage && (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
                <h2 className="text-[14px] font-bold text-[#222] mb-1">Carousel Images</h2>
                <p className="text-[12px] text-[#77838f] mb-4">
                  Images shown in the Swiper carousel. Drag to reorder. Leave empty to hide the carousel.
                </p>
                <ImagesList
                  images={data?.images || []}
                  onChange={(imgs) => setData({ ...data, images: imgs })}
                />
              </div>
            )}

            {/* Single image (location section) */}
            {hasSingleImage && (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-3">
                <h2 className="text-[14px] font-bold text-[#222]">Section Image</h2>
                <ImageUpload
                  label="Image"
                  value={data?.image || ''}
                  onChange={set('image')}
                  aspectHint="Any aspect ratio"
                  maxWidth="100%"
                  previewHeight="200px"
                  objectFit="cover"
                />
              </div>
            )}
          </>
        );
      }}
    </InfrastructureSectionEditorShell>
  );
}

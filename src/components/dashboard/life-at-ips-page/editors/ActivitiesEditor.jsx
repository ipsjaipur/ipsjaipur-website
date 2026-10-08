'use client';

import { useRef, useState } from 'react';
import { GripVertical, Trash2, Plus, ChevronDown, ChevronUp, ImageIcon, X, Upload, Loader2 } from 'lucide-react';
import LifeAtIpsSectionEditorShell from '../LifeAtIpsSectionEditorShell';
import toast from 'react-hot-toast';

// ─── Tiny inline image uploader (thumbnail + hover overlay) ──────────────────
// Avoids using the shared ImageUpload component which shows its own preview,
// causing a double-preview problem when the URL is already populated.

const ALLOWED_TYPES = ['image/webp', 'image/png', 'image/jpeg', 'image/jpg'];

function isAllowedType(file) {
  if (ALLOWED_TYPES.includes(file.type)) return true;
  const ext = file.name.split('.').pop()?.toLowerCase();
  return ['webp', 'png', 'jpg', 'jpeg'].includes(ext);
}

function InlineImageRow({ src, index, onUpdate, onRemove }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file) {
    if (!isAllowedType(file)) {
      toast.error('Only WebP, PNG, JPG images are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10 MB');
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', credentials: 'include', body: fd });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Upload failed');
      onUpdate(data.data.url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-3 border border-[#e2e8f0] rounded-xl p-3 bg-[#fafafa]">
      {/* Index badge */}
      <span className="text-[10px] font-bold text-[#aab4bf] w-5 shrink-0 text-center">{index + 1}</span>

      {/* Thumbnail with hover overlay for Replace / Remove */}
      <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0 border border-[#e2e8f0] bg-[#f0f0f0] group">
        {src ? (
          <>
            <img src={src} alt={`slide-${index + 1}`} className="w-full h-full object-cover" />
            {/* Hover overlay — shown on desktop hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-1">
              <button
                type="button"
                title="Replace image"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex-1 h-full flex items-center justify-center text-white hover:text-[#eb5905] transition cursor-pointer"
              >
                {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              </button>
              <div className="w-px h-4 bg-white/30" />
              <button
                type="button"
                title="Remove image"
                onClick={onRemove}
                className="flex-1 h-full flex items-center justify-center text-white hover:text-red-400 transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-[#e2e8f0] transition"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 text-[#eb5905] animate-spin" />
            ) : (
              <ImageIcon className="w-4 h-4 text-[#d1d5db]" />
            )}
          </button>
        )}
      </div>

      {/* URL text input */}
      <input
        type="text"
        value={src}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Paste image URL, or click thumbnail to upload…"
        className="flex-1 min-w-0 border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-[#eb5905] transition"
      />

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        title="Upload image"
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] text-[#77838f] hover:border-[#eb5905] hover:text-[#eb5905] transition cursor-pointer disabled:opacity-50"
      >
        {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
      </button>

      {/* Remove row button */}
      <button
        type="button"
        onClick={onRemove}
        title="Remove this image"
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] text-[#aab4bf] hover:border-red-300 hover:text-red-500 transition cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/webp,image/png,image/jpeg"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f);
          e.target.value = '';
        }}
      />
    </div>
  );
}

// ─── Single activity card ─────────────────────────────────────────────────────

function ActivityCard({ item, index, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const [collapsed, setCollapsed] = useState(false);

  function setField(key, val) {
    onChange({ ...item, [key]: val });
  }

  function addImage() {
    onChange({ ...item, images: [...(item.images || []), ''] });
  }

  function updateImage(imgIdx, val) {
    const next = [...(item.images || [])];
    next[imgIdx] = val;
    onChange({ ...item, images: next });
  }

  function removeImage(imgIdx) {
    onChange({ ...item, images: (item.images || []).filter((_, i) => i !== imgIdx) });
  }

  function addAndUpload() {
    // adds a blank slot; the InlineImageRow will handle the upload
    addImage();
  }

  return (
    <div className="border border-[#e2e8f0] rounded-xl bg-white overflow-hidden">
      {/* Card header ── click to collapse */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none hover:bg-[#f4f6f9] transition"
        onClick={() => setCollapsed((v) => !v)}
      >
        <span className="text-[11px] font-bold text-[#eb5905] bg-[#eb5905]/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
          {index + 1}
        </span>
        <p className="flex-1 text-[13px] font-semibold text-[#222] truncate">
          {item.title || <span className="text-[#aab4bf] font-normal">Untitled activity</span>}
        </p>
        <span className="text-[11px] text-[#77838f] shrink-0">
          {(item.images || []).length} image{(item.images || []).length !== 1 ? 's' : ''}
        </span>
        {collapsed ? (
          <ChevronDown className="w-4 h-4 text-[#aab4bf] shrink-0" />
        ) : (
          <ChevronUp className="w-4 h-4 text-[#aab4bf] shrink-0" />
        )}
      </div>

      {/* Card body */}
      {!collapsed && (
        <div className="px-4 pb-4 space-y-4 border-t border-[#e2e8f0] pt-4">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={item.title || ''}
              onChange={(e) => setField('title', e.target.value)}
              placeholder="e.g. ZEPHYR Hosted by IPS COLLEGE"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
            />
          </div>

          {/* Paragraph */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
              Description Paragraph
            </label>
            <textarea
              rows={4}
              value={item.paragraph || ''}
              onChange={(e) => setField('paragraph', e.target.value)}
              placeholder="Descriptive text shown beside the image slider…"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
            />
          </div>

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide">
                Slider Images ({(item.images || []).length})
              </label>
              <button
                type="button"
                onClick={addImage}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#eb5905] hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Image
              </button>
            </div>
            <p className="text-[11px] text-[#77838f] mb-3">
              Upload images or paste URLs. Images appear in the Swiper carousel. Drag the cards below to reorder.
            </p>

            {(item.images || []).length === 0 ? (
              <div className="border-2 border-dashed border-[#e2e8f0] rounded-xl py-6 flex flex-col items-center gap-2 text-[#aab4bf]">
                <ImageIcon className="w-6 h-6" />
                <p className="text-[12px]">No images yet — click Add Image above</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {(item.images || []).map((src, imgIdx) => (
                  <InlineImageRow
                    key={imgIdx}
                    src={src}
                    index={imgIdx}
                    onUpdate={(val) => updateImage(imgIdx, val)}
                    onRemove={() => removeImage(imgIdx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Reorder / remove row */}
          <div className="flex items-center justify-between pt-2 border-t border-[#f0f0f0]">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onMoveUp}
                disabled={index === 0}
                className="p-1.5 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:border-[#eb5905] hover:text-[#eb5905] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Move up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onMoveDown}
                disabled={index === total - 1}
                className="p-1.5 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:border-[#eb5905] hover:text-[#eb5905] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Move down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-red-400 hover:text-red-600 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove Section
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main editor ─────────────────────────────────────────────────────────────

export default function ActivitiesEditor() {
  return (
    <LifeAtIpsSectionEditorShell
      sectionKey="activities"
      title="Activity Sections"
      description="Manage each activity section that appears on the Life@IPS page — title, description, and slider images."
    >
      {(data, setData) => {
        const activities = data?.activities || [];

        function updateActivity(idx, updated) {
          const next = activities.map((a, i) => (i === idx ? { ...updated, order: i } : a));
          setData({ ...data, activities: next });
        }

        function removeActivity(idx) {
          const next = activities.filter((_, i) => i !== idx).map((a, i) => ({ ...a, order: i }));
          setData({ ...data, activities: next });
        }

        function moveActivity(idx, direction) {
          const next = [...activities];
          const targetIdx = idx + direction;
          if (targetIdx < 0 || targetIdx >= next.length) return;
          [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
          setData({ ...data, activities: next.map((a, i) => ({ ...a, order: i })) });
        }

        function addActivity() {
          setData({
            ...data,
            activities: [...activities, { title: '', paragraph: '', images: [], order: activities.length }],
          });
        }

        return (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-[12px] text-amber-800">
                <strong>Tip:</strong> Each activity section is displayed as an alternating left/right block on the page
                — image carousel on one side, title + description on the other. Click a card header to collapse/expand
                it. Use the ↑ ↓ buttons to reorder sections.
              </p>
            </div>

            {activities.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-[#e2e8f0] rounded-2xl py-12 flex flex-col items-center gap-3">
                <GripVertical className="w-8 h-8 text-[#d1d5db]" />
                <p className="text-[14px] font-semibold text-[#4a5568]">No activity sections yet</p>
                <p className="text-[12px] text-[#77838f]">
                  Click <strong>Seed Missing</strong> on the sections page to load defaults, or add one below.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity, idx) => (
                  <ActivityCard
                    key={activity._id || idx}
                    item={activity}
                    index={idx}
                    total={activities.length}
                    onChange={(updated) => updateActivity(idx, updated)}
                    onRemove={() => removeActivity(idx)}
                    onMoveUp={() => moveActivity(idx, -1)}
                    onMoveDown={() => moveActivity(idx, 1)}
                  />
                ))}
              </div>
            )}

            {/* Add new section button */}
            <button
              type="button"
              onClick={addActivity}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#e2e8f0] rounded-xl py-3 text-[13px] font-medium text-[#77838f] hover:border-[#eb5905] hover:text-[#eb5905] transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Activity Section
            </button>
          </div>
        );
      }}
    </LifeAtIpsSectionEditorShell>
  );
}

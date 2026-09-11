'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Allowed formats ────────────────────────────────────────────────────────────
const ALLOWED_TYPES = ['image/webp', 'image/png', 'image/jpeg', 'image/jpg'];
const ALLOWED_ACCEPT = 'image/webp,image/png,image/jpeg';

function isAllowedType(file) {
  if (ALLOWED_TYPES.includes(file.type)) return true;
  // Some browsers mis-report MIME for webp — fall back to extension check
  const ext = file.name.split('.').pop()?.toLowerCase();
  return ['webp', 'png', 'jpg', 'jpeg'].includes(ext);
}

/**
 * Reusable image upload component — uploads to Cloudinary via /api/upload.
 *
 * Props:
 *  value         — current image URL (shown as preview)
 *  onChange      — called with new Cloudinary URL after upload
 *  label         — optional label text
 *  aspectHint    — optional hint e.g. "16:9 recommended"
 *  maxWidth      — max width of preview box, default '300px'
 *  previewHeight — height of preview box, default '160px'
 *  objectFit     — 'cover' | 'contain', default 'contain'
 *  disabled      — boolean
 */
export default function ImageUpload({
  value,
  onChange,
  label,
  aspectHint,
  maxWidth = '300px',
  previewHeight = '160px',
  objectFit = 'contain',
  disabled = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  async function uploadFile(file) {
    if (!file) return;

    if (!isAllowedType(file)) {
      toast.error('Only WebP, PNG, JPG, JPEG images are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10 MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Upload failed');

      onChange(data.data.url);
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = '';
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (disabled || uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div className="w-full">
      {label && <p className="text-[12px] font-semibold text-[#4a5568] mb-1.5 uppercase tracking-wide">{label}</p>}

      {/* Preview / drop zone — capped at maxWidth */}
      <div style={{ maxWidth }}>
        {value ? (
          /* ── Preview ──────────────────────────────────────────────── */
          <div
            className="relative group rounded-xl border border-[#e2e8f0] bg-[#f8f8f8]"
            style={{ height: previewHeight }}
          >
            <img src={value} alt="Preview" style={{ objectFit }} className="w-full h-full rounded-xl" />
            {!disabled && (
              <div className="absolute inset-0 rounded-xl bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col items-center justify-center gap-2 p-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="w-full flex items-center max-w-[200px] w-full justify-center gap-1.5 bg-white text-[#222] text-[11px] font-semibold px-3 py-2 rounded-lg hover:bg-[#f4f6f9] transition cursor-pointer shadow"
                >
                  {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  disabled={uploading}
                  className="w-full flex items-center max-w-[200px] w-full justify-center gap-1.5 bg-red-500 text-white text-[11px] font-semibold px-3 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer shadow"
                >
                  <X className="w-3 h-3" />
                  Remove
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ── Drop zone ────────────────────────────────────────────── */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              if (!disabled) setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !disabled && !uploading && inputRef.current?.click()}
            style={{ height: previewHeight }}
            className={`
              flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl
              cursor-pointer transition-all duration-200
              ${dragOver ? 'border-[#eb5905] bg-[#eb5905]/5' : 'border-[#e2e8f0] bg-[#f4f6f9] hover:border-[#eb5905]/50 hover:bg-[#eb5905]/5'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {uploading ? (
              <>
                <Loader2 className="w-6 h-6 text-[#eb5905] animate-spin" />
                <p className="text-[11px] text-[#77838f]">Uploading…</p>
              </>
            ) : (
              <>
                <div className="w-9 h-9 rounded-full bg-[#eb5905]/10 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-[#eb5905]" />
                </div>
                <p className="text-[12px] font-medium text-[#4a5568] text-center px-2">Click or drag & drop</p>
                {aspectHint && <p className="text-[10px] text-[#77838f] text-center px-2">{aspectHint}</p>}
                <p className="text-[10px] text-[#77838f]">WebP, PNG, JPG · max 10 MB</p>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_ACCEPT}
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />

      {/* URL paste fallback */}
      <div className="mt-2" style={{ maxWidth }}>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL…"
          disabled={disabled}
          className="w-full text-[11px] border border-[#e2e8f0] rounded-lg px-3 py-1.5 text-[#4a5568] placeholder-[#aab4bf] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
    </div>
  );
}

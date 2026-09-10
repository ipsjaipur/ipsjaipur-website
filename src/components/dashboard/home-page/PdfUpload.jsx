'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, FileText, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Reusable PDF upload component.
 * Uploads to /api/upload-pdf which saves the file to public/pdfs/.
 * The returned URL is a plain /pdfs/<name>.pdf path served by Next.js.
 *
 * Props:
 *  value    — current PDF path/URL
 *  onChange — called with new path after upload or manual paste
 *  label    — optional label text
 *  disabled — boolean
 */
export default function PdfUpload({ value, onChange, label, disabled = false }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  // Always produce a proper href (local paths without leading slash get one)
  const previewHref = value ? (value.startsWith('http') || value.startsWith('/') ? value : `/${value}`) : null;

  const displayName = value ? decodeURIComponent(value.split('/').pop().split('?')[0]) || 'PDF File' : null;

  async function uploadFile(file) {
    if (!file) return;
    const ext = file.name?.split('.').pop()?.toLowerCase();
    if (file.type !== 'application/pdf' && ext !== 'pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error('PDF must be under 20 MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload-pdf', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Upload failed');

      onChange(data.data.url);
      toast.success('PDF uploaded successfully');
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
    <div className="w-full space-y-2">
      {label && <p className="text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide">{label}</p>}

      {value ? (
        /* ── Filled state ───────────────────────────────────────── */
        <div className="flex items-center gap-3 bg-[#f4f6f9] border border-[#e2e8f0] rounded-xl px-4 py-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-red-500" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[#222] truncate" title={displayName}>
              {displayName}
            </p>
            {previewHref && (
              <a
                href={previewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#eb5905] hover:underline mt-0.5"
              >
                <ExternalLink className="w-3 h-3" />
                Preview PDF
              </a>
            )}
          </div>

          {!disabled && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-1.5 bg-white border border-[#e2e8f0] text-[#4a5568] text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:border-[#eb5905] hover:text-[#eb5905] transition cursor-pointer"
              >
                {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                disabled={uploading}
                className="flex items-center gap-1 bg-white border border-[#e2e8f0] text-red-500 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg hover:border-red-300 hover:bg-red-50 transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ── Drop zone ──────────────────────────────────────────── */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && !uploading && inputRef.current?.click()}
          className={`
            flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl
            py-5 cursor-pointer transition-all duration-200
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
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <FileText className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-[12px] font-medium text-[#4a5568]">Click or drag & drop a PDF</p>
              <p className="text-[10px] text-[#77838f]">PDF only · max 20 MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />

      {/* Manual URL / path input */}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste a PDF path / URL…"
        disabled={disabled}
        className="w-full text-[11px] border border-[#e2e8f0] rounded-lg px-3 py-1.5 text-[#4a5568] placeholder-[#aab4bf] focus:outline-none focus:border-[#eb5905] transition"
      />
    </div>
  );
}

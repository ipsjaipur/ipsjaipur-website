'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Save,
  Eye,
  Send,
  Trash2,
  Upload,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Copy,
  Plus,
  GripVertical,
} from 'lucide-react';
import toast from 'react-hot-toast';
import slugify from 'slugify';
import { cn } from '@/lib/utils';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-[#e2e8f0] rounded-lg h-48 flex items-center justify-center bg-[#f8f9fa]">
      <Loader2 className="w-5 h-5 text-[#eb5905] animate-spin" />
    </div>
  ),
});

const AUTOSAVE_DELAY = 30000;

// ─── Shared Field components ──────────────────────────────────────────────────

function FormField({ label, required, error, hint, children }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#222222] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-[11px] text-[#77838f]">{hint}</p>}
      {error && (
        <p className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
}

function TextInput({ className, ...props }) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] text-[14px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#eb5905]/30 focus:border-[#eb5905] transition disabled:opacity-60',
        className,
      )}
    />
  );
}

function TextArea({ className, rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={cn(
        'w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] text-[14px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#eb5905]/30 focus:border-[#eb5905] transition resize-none disabled:opacity-60',
        className,
      )}
    />
  );
}

function Section({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f8f9fa] transition cursor-pointer"
      >
        <span className="text-[14px] font-bold text-[#222222]">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#77838f]" /> : <ChevronDown className="w-4 h-4 text-[#77838f]" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

// ─── Single image upload ──────────────────────────────────────────────────────
function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    const toastId = toast.loading('Uploading image...');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      onChange({ url: data.data.url, alt: value?.alt || '' });
      toast.success('Image uploaded', { id: toastId });
    } catch (err) {
      toast.error(err.message || 'Upload failed', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value?.url ? (
        <div className="relative rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#f4f6f9]">
          <div className="relative w-full h-48">
            <img src={value.url} alt={value.alt || 'Featured image'} className="w-full h-full object-cover" />
          </div>
          <div className="p-3 flex items-center justify-between gap-2 bg-white border-t border-[#e2e8f0]">
            <TextInput
              placeholder="Alt text (for SEO)"
              value={value.alt || ''}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
              className="text-[12px] py-1.5"
            />
            <button
              type="button"
              onClick={() => onChange({ url: '', alt: '' })}
              className="shrink-0 p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className={cn(
            'border-2 border-dashed border-[#e2e8f0] rounded-lg p-8 text-center cursor-pointer hover:border-[#eb5905]/50 hover:bg-[#eb5905]/5 transition',
            uploading && 'opacity-60 cursor-wait',
          )}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-[#eb5905] animate-spin mx-auto mb-2" />
          ) : (
            <Upload className="w-8 h-8 text-[#77838f] mx-auto mb-2" />
          )}
          <p className="text-[13px] font-medium text-[#222222]">
            {uploading ? 'Uploading...' : 'Click to upload featured image'}
          </p>
          <p className="text-[11px] text-[#77838f] mt-1">JPG, PNG, WebP · Max 5MB</p>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

// ─── Gallery Upload ───────────────────────────────────────────────────────────
function GalleryUpload({ value = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    const toastId = toast.loading(`Uploading ${files.length} image(s)...`);
    try {
      const uploaded = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.success) uploaded.push({ url: data.data.url, alt: '' });
      }
      onChange([...value, ...uploaded]);
      toast.success(`${uploaded.length} image(s) uploaded`, { id: toastId });
    } catch (err) {
      toast.error(err.message || 'Upload failed', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => onChange(value.filter((_, i) => i !== idx));

  const updateAlt = (idx, alt) => onChange(value.map((img, i) => (i === idx ? { ...img, alt } : img)));

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((img, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#f4f6f9]">
              <div className="relative w-full aspect-square">
                <img src={img.url} alt={img.alt || `Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
              <div className="p-2 bg-white border-t border-[#e2e8f0] flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="Alt text"
                  value={img.alt || ''}
                  onChange={(e) => updateAlt(idx, e.target.value)}
                  className="flex-1 min-w-0 text-[11px] px-2 py-1 rounded border border-[#e2e8f0] bg-[#f8f9fa] focus:outline-none focus:border-[#eb5905] transition"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="shrink-0 p-1 text-red-500 hover:bg-red-50 rounded transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => !uploading && fileRef.current?.click()}
        className={cn(
          'border-2 border-dashed border-[#e2e8f0] rounded-lg p-5 text-center cursor-pointer hover:border-[#eb5905]/50 hover:bg-[#eb5905]/5 transition',
          uploading && 'opacity-60 cursor-wait',
        )}
      >
        {uploading ? (
          <Loader2 className="w-6 h-6 text-[#eb5905] animate-spin mx-auto mb-1" />
        ) : (
          <Plus className="w-6 h-6 text-[#77838f] mx-auto mb-1" />
        )}
        <p className="text-[12px] text-[#77838f]">
          {uploading ? 'Uploading...' : 'Add gallery images (select multiple)'}
        </p>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

// ─── Main EventForm ───────────────────────────────────────────────────────────
export default function EventForm({ initialData = null, id = null }) {
  const router = useRouter();
  const isEdit = !!id;

  const defaultValues = {
    title: '',
    slug: '',
    shortDescription: '',
    content: '',
    featuredImage: { url: '', alt: '' },
    gallery: [],
    eventDate: '',
    eventEndDate: '',
    eventTime: '',
    location: '',
    organizer: 'IPS Business School',
    eventStatus: 'upcoming',
    registrationLink: '',
    tags: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogImage: '',
    status: 'draft',
  };

  const normalize = (data) => ({
    ...defaultValues,
    ...data,
    // Convert stored ISO dates back to local date strings for <input type="date">
    eventDate: data?.eventDate ? new Date(data.eventDate).toISOString().slice(0, 10) : '',
    eventEndDate: data?.eventEndDate ? new Date(data.eventEndDate).toISOString().slice(0, 10) : '',
    gallery: data?.gallery || [],
    tags: data?.tags || [],
    featuredImage: data?.featuredImage || { url: '', alt: '' },
  });

  const [formData, setFormData] = useState(initialData ? normalize(initialData) : defaultValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEdit);
  const autosaveTimerRef = useRef(null);
  const hasChangesRef = useRef(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && formData.title) {
      const generated = slugify(formData.title, { lower: true, strict: true, trim: true });
      setFormData((prev) => ({ ...prev, slug: generated }));
    }
  }, [formData.title, slugManuallyEdited]);

  // Auto-fill meta title
  useEffect(() => {
    if (!formData.metaTitle && formData.title) {
      setFormData((prev) => ({ ...prev, metaTitle: formData.title.slice(0, 70) }));
    }
  }, [formData.title]);

  // Auto-fill meta description
  useEffect(() => {
    if (!formData.metaDescription && formData.shortDescription) {
      setFormData((prev) => ({ ...prev, metaDescription: formData.shortDescription.slice(0, 160) }));
    }
  }, [formData.shortDescription]);

  const set = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    hasChangesRef.current = true;
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Autosave for edits
  const triggerAutosave = useCallback(() => {
    if (!isEdit || !hasChangesRef.current) return;
    clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(async () => {
      if (!hasChangesRef.current) return;
      try {
        const res = await fetch(`/api/events/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, status: 'draft' }),
        });
        if (res.ok) {
          setSaveStatus('saved');
          hasChangesRef.current = false;
          setTimeout(() => setSaveStatus(''), 3000);
        }
      } catch {
        /* silent */
      }
    }, AUTOSAVE_DELAY);
  }, [isEdit, id, formData]);

  useEffect(() => {
    triggerAutosave();
    return () => clearTimeout(autosaveTimerRef.current);
  }, [triggerAutosave]);

  const handleSubmit = async (statusOverride) => {
    setSaving(true);
    setFieldErrors({});

    const payload = { ...formData, status: statusOverride || formData.status };
    // Convert empty date strings to null
    if (!payload.eventDate) payload.eventDate = null;
    if (!payload.eventEndDate) payload.eventEndDate = null;

    try {
      const url = isEdit ? `/api/events/${id}` : '/api/events';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
          toast.error('Please fix the validation errors');
        } else {
          toast.error(data.message || 'Save failed');
        }
        return;
      }

      toast.success(isEdit ? 'Event updated successfully!' : 'Event created successfully!');
      hasChangesRef.current = false;
      if (!isEdit) {
        router.push(`/dashboard/events/${data.data._id}/edit`);
      } else {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this event? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Event deleted');
      router.push('/dashboard/events');
    } catch {
      toast.error('Failed to delete event');
    }
  };

  const handleDuplicate = async () => {
    if (!id) return;
    const newSlug = formData.slug + '-copy-' + Date.now().toString(36);
    const payload = { ...formData, title: formData.title + ' (Copy)', slug: newSlug, status: 'draft' };
    if (!payload.eventDate) payload.eventDate = null;
    if (!payload.eventEndDate) payload.eventEndDate = null;
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success('Event duplicated!');
      router.push(`/dashboard/events/${data.data._id}/edit`);
    } catch (err) {
      toast.error(err.message || 'Failed to duplicate');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-[20px] font-bold text-[#222222] font-rubik">{isEdit ? 'Edit Event' : 'New Event'}</h1>
          {saveStatus === 'saved' && (
            <span className="text-[12px] text-green-600 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Autosaved
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isEdit && (
            <>
              <button
                type="button"
                onClick={handleDuplicate}
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#77838f] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Duplicate
              </button>
              <a
                href={`/events/${formData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#77838f] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </a>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#222222] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition disabled:opacity-60 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#eb5905] hover:bg-[#d44f04] rounded-lg transition disabled:opacity-60 shadow-sm cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            {formData.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic details */}
          <Section title="Event Details">
            <FormField label="Title" required error={fieldErrors.title}>
              <TextInput
                placeholder="Enter event title..."
                value={formData.title}
                onChange={(e) => set('title', e.target.value)}
              />
            </FormField>

            <FormField
              label="Slug (URL)"
              required
              error={fieldErrors.slug}
              hint={`URL: /events/${formData.slug || 'your-event-slug'}`}
            >
              <div className="flex gap-2">
                <TextInput
                  placeholder="your-event-slug"
                  value={formData.slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    set(
                      'slug',
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, '-')
                        .replace(/-+/g, '-'),
                    );
                  }}
                  className={fieldErrors.slug ? 'border-red-400' : ''}
                />
                <button
                  type="button"
                  title="Re-generate slug from title"
                  onClick={() => {
                    const generated = slugify(formData.title || '', { lower: true, strict: true, trim: true });
                    set('slug', generated);
                    setSlugManuallyEdited(false);
                  }}
                  className="shrink-0 px-3 py-2 rounded-lg border border-[#e2e8f0] hover:bg-[#f4f6f9] text-[#77838f] transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </FormField>

            <FormField
              label="Short Description"
              error={fieldErrors.shortDescription}
              hint={`${formData.shortDescription?.length || 0}/500`}
            >
              <TextArea
                placeholder="A brief summary shown in event listing cards..."
                value={formData.shortDescription}
                onChange={(e) => set('shortDescription', e.target.value)}
                rows={3}
                maxLength={500}
              />
            </FormField>
          </Section>

          {/* Event-specific fields */}
          <Section title="Date, Time & Location">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Start Date" error={fieldErrors.eventDate}>
                <TextInput type="date" value={formData.eventDate} onChange={(e) => set('eventDate', e.target.value)} />
              </FormField>

              <FormField label="End Date" hint="Leave blank for single-day events" error={fieldErrors.eventEndDate}>
                <TextInput
                  type="date"
                  value={formData.eventEndDate}
                  onChange={(e) => set('eventEndDate', e.target.value)}
                />
              </FormField>

              <FormField label="Time" hint='e.g. "10:00 AM – 4:00 PM"' error={fieldErrors.eventTime}>
                <TextInput
                  type="text"
                  placeholder="e.g. 10:00 AM – 4:00 PM"
                  value={formData.eventTime}
                  onChange={(e) => set('eventTime', e.target.value)}
                />
              </FormField>

              <FormField label="Venue / Location" error={fieldErrors.location}>
                <TextInput
                  placeholder="e.g. IPS Seminar Hall, Jaipur"
                  value={formData.location}
                  onChange={(e) => set('location', e.target.value)}
                />
              </FormField>
            </div>

            <FormField label="Organizer" error={fieldErrors.organizer}>
              <TextInput
                placeholder="e.g. IPS Business School"
                value={formData.organizer}
                onChange={(e) => set('organizer', e.target.value)}
              />
            </FormField>

            <FormField
              label="Registration Link"
              hint="External URL where students can register (optional)"
              error={fieldErrors.registrationLink}
            >
              <TextInput
                type="url"
                placeholder="https://forms.google.com/..."
                value={formData.registrationLink}
                onChange={(e) => set('registrationLink', e.target.value)}
              />
            </FormField>
          </Section>

          {/* Content */}
          <Section title="Event Description / Recap">
            <FormField label="Body Content" error={fieldErrors.content}>
              <RichTextEditor
                value={formData.content}
                onChange={(val) => set('content', val)}
                placeholder="Describe the event — agenda, speakers, highlights..."
              />
            </FormField>
          </Section>

          {/* Gallery */}
          <Section title="Photo Gallery" defaultOpen={false}>
            <p className="text-[12px] text-[#77838f] -mt-1">
              Upload multiple event photos. Shown on the detail page after the event.
            </p>
            <GalleryUpload value={formData.gallery} onChange={(val) => set('gallery', val)} />
          </Section>

          {/* SEO */}
          <Section title="SEO & Meta" defaultOpen={false}>
            <FormField label="Meta Title" error={fieldErrors.metaTitle} hint={`${formData.metaTitle?.length || 0}/70`}>
              <TextInput
                placeholder="SEO page title"
                value={formData.metaTitle}
                onChange={(e) => set('metaTitle', e.target.value)}
                maxLength={70}
              />
            </FormField>

            <FormField
              label="Meta Description"
              error={fieldErrors.metaDescription}
              hint={`${formData.metaDescription?.length || 0}/160`}
            >
              <TextArea
                placeholder="SEO page description"
                value={formData.metaDescription}
                onChange={(e) => set('metaDescription', e.target.value)}
                rows={3}
                maxLength={160}
              />
            </FormField>

            <FormField label="Meta Keywords" error={fieldErrors.metaKeywords}>
              <TextInput
                placeholder="keyword1, keyword2"
                value={formData.metaKeywords}
                onChange={(e) => set('metaKeywords', e.target.value)}
              />
            </FormField>

            <FormField label="Canonical URL" hint="Leave blank to use the default URL">
              <TextInput
                placeholder={`https://www.ipsedu.in/events/${formData.slug}`}
                value={formData.canonicalUrl}
                onChange={(e) => set('canonicalUrl', e.target.value)}
              />
            </FormField>

            <FormField label="OG Image URL" hint="Leave blank to use the featured image">
              <TextInput
                placeholder="https://..."
                value={formData.ogImage}
                onChange={(e) => set('ogImage', e.target.value)}
              />
            </FormField>
          </Section>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-5">
          {/* Publish */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <h3 className="text-[14px] font-bold text-[#222222] mb-4">Publish</h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#77838f] mb-1.5 uppercase tracking-wide">
                  Visibility Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => set('status', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] text-[14px] text-[#222222] bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#eb5905]/30 focus:border-[#eb5905] transition"
                >
                  <option value="draft">Draft (hidden)</option>
                  <option value="published">Published (visible)</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#77838f] mb-1.5 uppercase tracking-wide">
                  Event Status
                </label>
                <select
                  value={formData.eventStatus}
                  onChange={(e) => set('eventStatus', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] text-[14px] text-[#222222] bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#eb5905]/30 focus:border-[#eb5905] transition"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
                <p className="text-[11px] text-[#77838f] mt-1">Change to "Completed" once the event has taken place.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleSubmit('published')}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-white bg-[#eb5905] hover:bg-[#d44f04] rounded-lg transition disabled:opacity-60 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {formData.status === 'published' ? 'Update' : 'Publish Now'}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-medium text-[#77838f] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save as Draft
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <h3 className="text-[14px] font-bold text-[#222222] mb-4">Featured Image</h3>
            <ImageUpload value={formData.featuredImage} onChange={(val) => set('featuredImage', val)} />
            {fieldErrors.featuredImage && <p className="mt-2 text-[12px] text-red-600">{fieldErrors.featuredImage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

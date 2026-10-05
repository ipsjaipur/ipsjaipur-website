'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Save, Send, Trash2, Loader2, AlertCircle, CheckCircle2, Copy, CalendarDays, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import slugify from 'slugify';
import { cn } from '@/lib/utils';
import { fixTableHtml } from '@/lib/fixTableHtml';

// SSR-safe editor import
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-[#e2e8f0] rounded-lg h-48 flex items-center justify-center bg-[#f8f9fa]">
      <Loader2 className="w-5 h-5 text-[#eb5905] animate-spin" />
    </div>
  ),
});

const AUTOSAVE_DELAY = 30000;

// ─── Shared field components ───────────────────────────────────────────────────

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

// ─── Main ScheduleForm ─────────────────────────────────────────────────────────

export default function ScheduleForm({ initialData = null, id = null }) {
  const router = useRouter();
  const isEdit = !!id;

  const defaultValues = { title: '', slug: '', content: '', metaTitle: '', status: 'draft' };

  const [formData, setFormData] = useState(initialData ? { ...defaultValues, ...initialData } : defaultValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // '' | 'saved' | 'error'
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

  // Auto-fill metaTitle from title (only if not manually set)
  useEffect(() => {
    if (!formData.metaTitle && formData.title) {
      setFormData((prev) => ({ ...prev, metaTitle: formData.title.slice(0, 70) }));
    }
  }, [formData.title]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    hasChangesRef.current = true;
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Autosave for edit mode
  const triggerAutosave = useCallback(() => {
    if (!isEdit || !hasChangesRef.current) return;
    clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(async () => {
      if (!hasChangesRef.current) return;
      try {
        const res = await fetch(`/api/schedules/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, content: fixTableHtml(formData.content), status: 'draft' }),
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

    const payload = {
      ...formData,
      content: fixTableHtml(formData.content),
      status: statusOverride || formData.status,
    };

    try {
      const url = isEdit ? `/api/schedules/${id}` : '/api/schedules';
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

      toast.success(isEdit ? 'Schedule updated!' : 'Schedule created!');
      hasChangesRef.current = false;

      if (!isEdit) {
        router.push(`/dashboard/schedules/${data.data._id}/edit`);
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
    if (!confirm('Delete this schedule permanently? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Schedule deleted');
      router.push('/dashboard/schedules');
    } catch {
      toast.error('Failed to delete schedule');
    }
  };

  const copyStudentLink = () => {
    if (!formData.slug) return;
    const url = `${window.location.origin}/schedule/${formData.slug}`;
    navigator.clipboard.writeText(url);
    toast.success('Student link copied!');
  };

  const isPublished = formData.status === 'published';

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[20px] font-bold text-[#222222] font-rubik flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#eb5905]" />
            {isEdit ? 'Edit Schedule' : 'Create Schedule'}
          </h1>
          {isEdit && (
            <p className="text-[12px] text-[#77838f] mt-0.5">
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-3 h-3" /> Auto-saved
                </span>
              )}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {isEdit && formData.slug && (
            <button
              type="button"
              onClick={copyStudentLink}
              title="Copy student link"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e2e8f0] text-[13px] text-[#4a5568] hover:bg-[#f4f6f9] transition cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Link
            </button>
          )}

          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-[13px] text-red-500 hover:bg-red-50 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e2e8f0] text-[13px] text-[#4a5568] hover:bg-[#f4f6f9] disabled:opacity-50 transition cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#eb5905] hover:bg-[#d44f04] text-white text-[13px] font-semibold disabled:opacity-50 transition shadow-sm cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : isPublished ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            {isPublished ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Status banner for published */}
      {isEdit && isPublished && formData.slug && (
        <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-[13px] text-green-700">
          <Eye className="w-4 h-4 shrink-0" />
          <span>
            This schedule is <strong>live</strong> at{' '}
            <code className="font-mono text-[12px] bg-green-100 px-1 rounded">/schedule/{formData.slug}</code>
          </span>
          <button
            onClick={() => handleSubmit('draft')}
            className="ml-auto flex items-center gap-1 text-[12px] text-green-600 hover:underline cursor-pointer"
          >
            <EyeOff className="w-3.5 h-3.5" /> Unpublish
          </button>
        </div>
      )}

      {/* Form card */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 md:p-7 space-y-6">
        {/* Title */}
        <FormField label="Schedule Title" required error={fieldErrors.title}>
          <TextInput
            placeholder="e.g. MBA Batch 2025 — Trimester 1 Schedule"
            value={formData.title}
            onChange={(e) => set('title', e.target.value)}
          />
        </FormField>

        {/* Slug */}
        <FormField
          label="URL Slug"
          required
          error={fieldErrors.slug}
          hint="Used in the student URL: /schedule/your-slug — auto-generated from title"
        >
          <div className="flex gap-2 items-center">
            <span className="text-[13px] text-[#77838f] shrink-0">/schedule/</span>
            <TextInput
              placeholder="mba-batch-2025-trimester-1"
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
              className="font-mono text-[13px]"
            />
          </div>
        </FormField>

        {/* Meta Title */}
        <FormField
          label="Meta Title"
          error={fieldErrors.metaTitle}
          hint={`${formData.metaTitle?.length || 0}/70 characters — shown in browser tab and search results. Auto-filled from title.`}
        >
          <TextInput
            placeholder="e.g. MBA Batch 2025 Trimester 1 Schedule | IPS Business School"
            value={formData.metaTitle || ''}
            onChange={(e) => set('metaTitle', e.target.value.slice(0, 70))}
            maxLength={70}
          />
        </FormField>

        {/* Content editor */}
        <FormField
          label="Schedule Content"
          hint="Use the Table button in the toolbar to insert a schedule table. Rows and columns can be added/removed inline."
          error={fieldErrors.content}
        >
          <RichTextEditor
            value={formData.content}
            onChange={(val) => set('content', val)}
            placeholder="Insert your schedule table here..."
          />
        </FormField>
      </div>
    </div>
  );
}

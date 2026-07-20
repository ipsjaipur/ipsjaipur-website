'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Save, Globe, Eye, AlertCircle, CheckCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipsedu.in';

const ROBOTS_OPTIONS = ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'];

const FIELD_LIMITS = { metaTitle: 70, metaDescription: 160 };

function CharCount({ value = '', max }) {
  const len = value.length;
  const pct = len / max;
  const color = pct > 1 ? 'text-red-500' : pct > 0.85 ? 'text-amber-500' : 'text-[#77838f]';
  return (
    <span className={cn('text-[11px] font-medium tabular-nums', color)}>
      {len}/{max}
    </span>
  );
}

// Live SERP preview
function SerpPreview({ title, description, slug }) {
  const url = slug === '/' || !slug ? SITE_URL : `${SITE_URL}/${slug}`;
  const displayUrl = url.replace(/^https?:\/\//, '');

  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-4">
      <p className="text-[11px] font-semibold text-[#77838f] uppercase tracking-wide mb-3 flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5" />
        SERP Preview
      </p>
      <div className="max-w-[600px]">
        {/* Breadcrumb */}
        <p className="text-[12px] text-[#202124] mb-0.5 truncate">{displayUrl}</p>
        {/* Title */}
        <p
          className={cn('text-[18px] leading-snug font-medium mb-1 truncate', title ? 'text-[#1a0dab]' : 'text-[#bbb]')}
        >
          {title || 'Page Title Will Appear Here'}
        </p>
        {/* Description */}
        <p className={cn('text-[13px] leading-snug line-clamp-2', description ? 'text-[#4d5156]' : 'text-[#bbb]')}>
          {description || 'Meta description will appear here. Keep it between 120–160 characters for best results.'}
        </p>
      </div>
    </div>
  );
}

export default function SeoEditPage({ id }) {
  const router = useRouter();
  const isNew = !id;

  const [form, setForm] = useState({
    pageName: '',
    pageSlug: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogImage: '',
    robots: 'index, follow',
    isActive: true,
    notes: '',
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // ── Load existing record ──────────────────────────────────────────────────
  useEffect(() => {
    if (isNew) return;
    (async () => {
      try {
        const res = await fetch(`/api/metadetails/${id}`);
        const data = await res.json();
        if (data.success) {
          setForm({
            pageName: data.data.pageName || '',
            pageSlug: data.data.pageSlug || '',
            metaTitle: data.data.metaTitle || '',
            metaDescription: data.data.metaDescription || '',
            metaKeywords: data.data.metaKeywords || '',
            canonicalUrl: data.data.canonicalUrl || '',
            ogImage: data.data.ogImage || '',
            robots: data.data.robots || 'index, follow',
            isActive: data.data.isActive ?? true,
            notes: data.data.notes || '',
          });
        } else {
          toast.error('Failed to load SEO record');
        }
      } catch {
        toast.error('Failed to load SEO record');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isNew]);

  // ── Field helpers ─────────────────────────────────────────────────────────
  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Auto-derive canonical URL when slug changes (only if canonical is blank)
  const handleSlugChange = (e) => {
    const slug = e.target.value;
    setForm((prev) => ({
      ...prev,
      pageSlug: slug,
      // auto-fill canonical only if admin hasn't manually typed one
      canonicalUrl:
        prev.canonicalUrl === '' || prev.canonicalUrl === buildCanonical(prev.pageSlug)
          ? buildCanonical(slug)
          : prev.canonicalUrl,
    }));
    if (errors.pageSlug) setErrors((prev) => ({ ...prev, pageSlug: undefined }));
  };

  function buildCanonical(slug) {
    if (!slug || slug === '/') return SITE_URL;
    return `${SITE_URL}/${slug}`.replace(/\/+$/, '');
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/metadetails' : `/api/metadetails/${id}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isNew ? 'SEO record created' : 'SEO record updated');
        router.push('/dashboard/seo');
      } else if (data.errors) {
        setErrors(data.errors);
        toast.error('Please fix the validation errors');
      } else {
        toast.error(data.message || 'Save failed');
      }
    } catch {
      toast.error('Save failed — please try again');
    } finally {
      setSaving(false);
    }
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="w-6 h-6 text-[#eb5905] animate-spin" />
        <p className="text-[13px] text-[#77838f]">Loading SEO record…</p>
      </div>
    );
  }

  // ── Field component ───────────────────────────────────────────────────────
  const Field = ({ label, name, required, hint, children }) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-semibold text-[#222222]">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {FIELD_LIMITS[name] && <CharCount value={form[name]} max={FIELD_LIMITS[name]} />}
      </div>
      {children}
      {hint && !errors[name] && (
        <p className="text-[11px] text-[#77838f] flex items-start gap-1">
          <Info className="w-3 h-3 shrink-0 mt-0.5" />
          {hint}
        </p>
      )}
      {errors[name] && (
        <p className="text-[11px] text-red-500 flex items-start gap-1">
          <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
          {errors[name][0]}
        </p>
      )}
    </div>
  );

  const inputCls = (name) =>
    cn(
      'w-full px-3 py-2 rounded-lg border text-[13px] text-[#222222] bg-white placeholder:text-[#bbb] focus:outline-none focus:ring-2 transition',
      errors[name]
        ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
        : 'border-[#e2e8f0] focus:ring-[#eb5905]/30 focus:border-[#eb5905]',
    );

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/dashboard/seo"
          className="p-2 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:bg-[#f4f6f9] transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-[20px] font-bold text-[#222222] font-rubik flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#eb5905]" />
            {isNew ? 'Add Page SEO' : `Edit SEO — ${form.pageName}`}
          </h1>
          <p className="text-[13px] text-[#77838f] mt-0.5">
            {isNew ? 'Add SEO metadata for a new page' : `Slug: /${form.pageSlug === '/' ? '' : form.pageSlug}`}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left column (main fields) ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Page Identity */}
            <section className="bg-white rounded-xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[13px] font-bold text-[#222222] uppercase tracking-wide border-b border-[#f4f6f9] pb-2">
                Page Identity
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Page Name"
                  name="pageName"
                  required
                  hint="Human-readable label shown in admin (e.g. About Us)"
                >
                  <input
                    type="text"
                    value={form.pageName}
                    onChange={set('pageName')}
                    placeholder="e.g. About Us"
                    className={inputCls('pageName')}
                  />
                </Field>

                <Field
                  label="Page Slug"
                  name="pageSlug"
                  required
                  hint='Use "/" for home, or "about", "mba/overview" etc.'
                >
                  <input
                    type="text"
                    value={form.pageSlug}
                    onChange={handleSlugChange}
                    placeholder="e.g. about"
                    className={inputCls('pageSlug')}
                  />
                </Field>
              </div>
            </section>

            {/* Core SEO */}
            <section className="bg-white rounded-xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[13px] font-bold text-[#222222] uppercase tracking-wide border-b border-[#f4f6f9] pb-2">
                Core SEO
              </h2>

              <Field
                label="Meta Title"
                name="metaTitle"
                required
                hint="Ideal length 50–60 characters. Shown as the clickable blue link in Google."
              >
                <input
                  type="text"
                  value={form.metaTitle}
                  onChange={set('metaTitle')}
                  placeholder="e.g. Best MBA College in Jaipur | IPS Business School"
                  className={inputCls('metaTitle')}
                />
              </Field>

              <Field
                label="Meta Description"
                name="metaDescription"
                required
                hint="Ideal length 120–158 characters. Shown as the snippet below the title in Google."
              >
                <textarea
                  value={form.metaDescription}
                  onChange={set('metaDescription')}
                  rows={3}
                  placeholder="e.g. Looking for the best MBA college in Jaipur? Explore industry-oriented programs…"
                  className={cn(inputCls('metaDescription'), 'resize-none')}
                />
              </Field>

              <Field
                label="Meta Keywords"
                name="metaKeywords"
                hint="Comma-separated. Minor ranking signal but helpful for internal categorisation."
              >
                <input
                  type="text"
                  value={form.metaKeywords}
                  onChange={set('metaKeywords')}
                  placeholder="e.g. MBA college Jaipur, best MBA Rajasthan"
                  className={inputCls('metaKeywords')}
                />
              </Field>
            </section>

            {/* Advanced SEO */}
            <section className="bg-white rounded-xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[13px] font-bold text-[#222222] uppercase tracking-wide border-b border-[#f4f6f9] pb-2">
                Advanced SEO
              </h2>

              <Field
                label="Canonical URL"
                name="canonicalUrl"
                hint="Leave blank to auto-derive from site URL + slug. Override only when needed."
              >
                <input
                  type="url"
                  value={form.canonicalUrl}
                  onChange={set('canonicalUrl')}
                  placeholder={buildCanonical(form.pageSlug)}
                  className={inputCls('canonicalUrl')}
                />
              </Field>

              <Field
                label="OG Image URL"
                name="ogImage"
                hint="Open Graph image shown when the page is shared on social media. Recommended: 1200×630px."
              >
                <input
                  type="url"
                  value={form.ogImage}
                  onChange={set('ogImage')}
                  placeholder={`${SITE_URL}/images/main-ips-logo.png`}
                  className={inputCls('ogImage')}
                />
              </Field>

              <Field label="Robots" name="robots" hint="Controls how search engines crawl and index this page.">
                <select value={form.robots} onChange={set('robots')} className={inputCls('robots')}>
                  {ROBOTS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Admin Notes" name="notes" hint="Internal notes — not rendered on the page.">
                <textarea
                  value={form.notes}
                  onChange={set('notes')}
                  rows={2}
                  placeholder="e.g. Reviewed on 2025-07-20 — update after redesign"
                  className={cn(inputCls('notes'), 'resize-none')}
                />
              </Field>
            </section>
          </div>

          {/* ── Right column (preview + settings) ────────────────────────── */}
          <div className="space-y-5">
            {/* Save card */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[13px] font-bold text-[#222222] uppercase tracking-wide border-b border-[#f4f6f9] pb-2">
                Settings
              </h2>

              {/* Active toggle */}
              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <p className="text-[13px] font-semibold text-[#222222]">Active</p>
                  <p className="text-[11px] text-[#77838f]">DB record used by this page's metadata</p>
                </div>
                <div
                  onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
                  className={cn(
                    'relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer shrink-0',
                    form.isActive ? 'bg-[#eb5905]' : 'bg-[#e2e8f0]',
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200',
                      form.isActive ? 'translate-x-5' : 'translate-x-0.5',
                    )}
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#eb5905] hover:bg-[#d44f04] text-white text-[13px] font-semibold rounded-lg transition shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving…' : isNew ? 'Create Record' : 'Save Changes'}
              </button>

              <Link
                href="/dashboard/seo"
                className="w-full flex items-center justify-center px-4 py-2.5 bg-white border border-[#e2e8f0] hover:bg-[#f4f6f9] text-[#4a5568] text-[13px] font-semibold rounded-lg transition"
              >
                Cancel
              </Link>
            </div>

            {/* SERP preview */}
            <SerpPreview title={form.metaTitle} description={form.metaDescription} slug={form.pageSlug} />

            {/* SEO health indicators */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
              <h2 className="text-[13px] font-bold text-[#222222] uppercase tracking-wide border-b border-[#f4f6f9] pb-2 mb-3">
                SEO Health
              </h2>
              <ul className="space-y-2">
                {[
                  {
                    label: 'Meta title length',
                    ok: form.metaTitle.length >= 30 && form.metaTitle.length <= 70,
                    warn: form.metaTitle.length > 0 && (form.metaTitle.length < 30 || form.metaTitle.length > 60),
                    hint: `${form.metaTitle.length} chars (ideal 50–60)`,
                  },
                  {
                    label: 'Meta description length',
                    ok: form.metaDescription.length >= 100 && form.metaDescription.length <= 160,
                    warn:
                      form.metaDescription.length > 0 &&
                      (form.metaDescription.length < 100 || form.metaDescription.length > 158),
                    hint: `${form.metaDescription.length} chars (ideal 120–158)`,
                  },
                  {
                    label: 'Keywords set',
                    ok: form.metaKeywords.trim().length > 0,
                    hint: form.metaKeywords ? 'Keywords defined' : 'Optional but recommended',
                  },
                  {
                    label: 'Canonical URL set',
                    ok: !!(form.canonicalUrl || form.pageSlug),
                    hint: form.canonicalUrl ? 'Custom canonical' : 'Will auto-derive from slug',
                  },
                  {
                    label: 'Robots directive',
                    ok: form.robots === 'index, follow',
                    warn: form.robots !== 'index, follow',
                    hint: form.robots,
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    {item.ok ? (
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    ) : item.warn ? (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-[#e2e8f0] shrink-0" />
                    )}
                    <div className="min-w-0">
                      <span className="text-[12px] font-medium text-[#222222]">{item.label}</span>
                      <span className="text-[11px] text-[#77838f] ml-1.5">{item.hint}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

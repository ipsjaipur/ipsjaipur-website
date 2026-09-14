'use client';

import MbaVsPgdmSectionEditorShell from '../MbaVsPgdmSectionEditorShell';
import SortableList from '../../home-page/SortableList';

// ── Reusable field ────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false, rows = 2, placeholder = '', hint = '' }) {
  const cls =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      {hint && <p className="text-[11px] text-[#77838f] mb-1">{hint}</p>}
      {multiline ? (
        <textarea
          rows={rows}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

// ── Comparison row render item ────────────────────────────────────────────────
function ComparisonRowItem(item, _index, update) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Evaluation Dimension"
          value={item.dimension}
          onChange={(v) => update({ dimension: v })}
          placeholder="Official Qualification"
          multiline
          rows={2}
        />
        <Field
          label="University MBA"
          value={item.universityMBA}
          onChange={(v) => update({ universityMBA: v })}
          placeholder="Postgraduate Master's Degree"
          multiline
          rows={2}
        />
        <Field
          label="Autonomous PGDM"
          value={item.autonomousPGDM}
          onChange={(v) => update({ autonomousPGDM: v })}
          placeholder="Postgraduate Diploma"
          multiline
          rows={2}
        />
        <Field
          label="IPS Hybrid MBA"
          value={item.ipsHybridMBA}
          onChange={(v) => update({ ipsHybridMBA: v })}
          placeholder="UGC Master's Degree (RTU Affiliated)"
          multiline
          rows={2}
        />
      </div>
    </div>
  );
}

// ── Feature card render item ──────────────────────────────────────────────────
const ICON_OPTIONS = ['GraduationCap', 'Briefcase', 'TrendingUp', 'Award', 'CheckCircle2', 'Star', 'Target', 'Zap'];

function FeatureCardItem(item, _index, update) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Icon</label>
        <select
          value={item.iconName || 'GraduationCap'}
          onChange={(e) => update({ iconName: e.target.value })}
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
        >
          {ICON_OPTIONS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <Field
        label="Card Title"
        value={item.title}
        onChange={(v) => update({ title: v })}
        placeholder="Academic Security"
      />
      <Field
        label="Description"
        value={item.description}
        onChange={(v) => update({ description: v })}
        multiline
        rows={3}
        placeholder="A University MBA degree ensures lifelong security…"
      />
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────
export default function MbaVsPgdmComparisonEditor() {
  return (
    <MbaVsPgdmSectionEditorShell
      sectionKey="comparison"
      title="Comparison Matrix & Features"
      description="Edit the comparison table rows, column headers, watermark text, and the three feature cards."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            {/* ── Section heading ───────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Heading</h2>
              <Field
                label="Background Watermark Text"
                value={data?.comparisonBackgroundWatermarkText}
                onChange={set('comparisonBackgroundWatermarkText')}
                placeholder="Comparison Matrix"
                hint="Large ghost text shown behind the section heading."
              />
              <Field
                label="Section Heading"
                value={data?.comparisonHeading}
                onChange={set('comparisonHeading')}
                placeholder="Key Differences at a Glance"
              />
            </div>

            {/* ── Column headers ────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Table Column Headers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Column 1 — Dimension Label"
                  value={data?.col1Header}
                  onChange={set('col1Header')}
                  placeholder="Evaluation Dimension"
                />
                <Field
                  label="Column 2 — University MBA"
                  value={data?.col2Header}
                  onChange={set('col2Header')}
                  placeholder="University MBA"
                />
                <Field
                  label="Column 3 — Autonomous PGDM"
                  value={data?.col3Header}
                  onChange={set('col3Header')}
                  placeholder="Autonomous PGDM"
                />
                <Field
                  label="Column 4 — IPS Hybrid (highlighted)"
                  value={data?.col4Header}
                  onChange={set('col4Header')}
                  placeholder="IPS Business School Hybrid MBA"
                />
              </div>
            </div>

            {/* ── Comparison rows ───────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Comparison Rows</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Each row compares one dimension across all three options. Drag to reorder.
              </p>
              <SortableList
                items={data?.comparisonRows || []}
                onChange={(comparisonRows) => setData({ ...data, comparisonRows })}
                renderItem={ComparisonRowItem}
                onAdd={() => ({
                  dimension: '',
                  universityMBA: '',
                  autonomousPGDM: '',
                  ipsHybridMBA: '',
                  order: data?.comparisonRows?.length || 0,
                })}
                addLabel="Add Row"
              />
            </div>

            {/* ── Feature cards ─────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Feature Cards</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                The three orange cards shown below the comparison table. Drag to reorder.
              </p>
              <SortableList
                items={data?.featureCards || []}
                onChange={(featureCards) => setData({ ...data, featureCards })}
                renderItem={FeatureCardItem}
                onAdd={() => ({
                  iconName: 'GraduationCap',
                  title: '',
                  description: '',
                  order: data?.featureCards?.length || 0,
                })}
                addLabel="Add Feature Card"
              />
            </div>
          </>
        );
      }}
    </MbaVsPgdmSectionEditorShell>
  );
}

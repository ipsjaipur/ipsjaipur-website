'use client';

import {
  CheckCircle2,
  School,
  GraduationCap,
  Briefcase,
  Bot,
  TrendingUp,
  Megaphone,
  Globe,
  Trophy,
  Users,
  Building2,
  Network,
  MessageSquare,
  Factory,
  DollarSign,
  BookOpen,
  Dumbbell,
  Lightbulb,
  Handshake,
  Star,
  Zap,
  Target,
  Award,
  Heart,
  Shield,
  Cpu,
  BarChart,
  FlaskConical,
  Rocket,
  Layers,
  Eye,
  Clock,
  MapPin,
  Phone,
  Mail,
  Tag,
  Flame,
  Leaf,
  Compass,
} from 'lucide-react';
import BBASectionEditorShell from '../BBASectionEditorShell';
import SortableList from '../../home-page/SortableList';
import ImageUpload from '../../home-page/ImageUpload';

const ICON_OPTIONS = [
  { name: 'CheckCircle2', Icon: CheckCircle2, label: 'Check Circle' },
  { name: 'School', Icon: School, label: 'School' },
  { name: 'GraduationCap', Icon: GraduationCap, label: 'Graduation Cap' },
  { name: 'Briefcase', Icon: Briefcase, label: 'Briefcase' },
  { name: 'Bot', Icon: Bot, label: 'Bot / AI' },
  { name: 'TrendingUp', Icon: TrendingUp, label: 'Trending Up' },
  { name: 'Megaphone', Icon: Megaphone, label: 'Megaphone' },
  { name: 'Globe', Icon: Globe, label: 'Globe' },
  { name: 'Trophy', Icon: Trophy, label: 'Trophy' },
  { name: 'Users', Icon: Users, label: 'Users / Team' },
  { name: 'Building2', Icon: Building2, label: 'Building' },
  { name: 'Network', Icon: Network, label: 'Network' },
  { name: 'MessageSquare', Icon: MessageSquare, label: 'Message' },
  { name: 'Factory', Icon: Factory, label: 'Factory' },
  { name: 'DollarSign', Icon: DollarSign, label: 'Dollar Sign' },
  { name: 'BookOpen', Icon: BookOpen, label: 'Book' },
  { name: 'Dumbbell', Icon: Dumbbell, label: 'Dumbbell / Sports' },
  { name: 'Lightbulb', Icon: Lightbulb, label: 'Lightbulb' },
  { name: 'Handshake', Icon: Handshake, label: 'Handshake' },
  { name: 'Star', Icon: Star, label: 'Star' },
  { name: 'Zap', Icon: Zap, label: 'Zap / Energy' },
  { name: 'Target', Icon: Target, label: 'Target' },
  { name: 'Award', Icon: Award, label: 'Award' },
  { name: 'Heart', Icon: Heart, label: 'Heart' },
  { name: 'Shield', Icon: Shield, label: 'Shield' },
  { name: 'Cpu', Icon: Cpu, label: 'CPU / Tech' },
  { name: 'BarChart', Icon: BarChart, label: 'Bar Chart' },
  { name: 'FlaskConical', Icon: FlaskConical, label: 'Flask / Research' },
  { name: 'Rocket', Icon: Rocket, label: 'Rocket' },
  { name: 'Layers', Icon: Layers, label: 'Layers' },
  { name: 'Eye', Icon: Eye, label: 'Eye / Vision' },
  { name: 'Clock', Icon: Clock, label: 'Clock' },
  { name: 'MapPin', Icon: MapPin, label: 'Map Pin' },
  { name: 'Phone', Icon: Phone, label: 'Phone' },
  { name: 'Mail', Icon: Mail, label: 'Mail' },
  { name: 'Tag', Icon: Tag, label: 'Tag' },
  { name: 'Flame', Icon: Flame, label: 'Flame' },
  { name: 'Leaf', Icon: Leaf, label: 'Leaf' },
  { name: 'Compass', Icon: Compass, label: 'Compass' },
];

function getIconEntry(name) {
  return ICON_OPTIONS.find((o) => o.name === name) || ICON_OPTIONS.find((o) => o.name === 'Lightbulb');
}

function IconPicker({ value, onChange }) {
  const selected = getIconEntry(value);
  const SelectedIcon = selected?.Icon || Lightbulb;
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Icon</label>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#ffa705]/10 flex items-center justify-center shrink-0 border border-[#e2e8f0]">
          <SelectedIcon className="w-5 h-5 text-[#ffa705]" />
        </div>
        <select
          value={value || 'Lightbulb'}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
        >
          {ICON_OPTIONS.map(({ name, label }) => (
            <option key={name} value={name}>
              {label} ({name})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function HighlightItem(item, index, update) {
  return (
    <div className="space-y-3">
      <IconPicker value={item.iconName || 'Lightbulb'} onChange={(iconName) => update({ iconName })} />
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          English Text
        </label>
        <textarea
          rows={2}
          value={item.text || ''}
          onChange={(e) => update({ text: e.target.value })}
          placeholder="Highlight text in English…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Hindi Text
        </label>
        <textarea
          rows={2}
          value={item.hindiText || ''}
          onChange={(e) => update({ hindiText: e.target.value })}
          placeholder="हिंदी अनुवाद…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
        />
      </div>
    </div>
  );
}

function DescParaItem(item, index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        Paragraph (HTML supported)
      </label>
      <textarea
        rows={3}
        value={item.value || ''}
        onChange={(e) => update({ value: e.target.value })}
        placeholder="Paragraph text… HTML tags like <b> are supported."
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none font-mono"
      />
    </div>
  );
}

function WhyIpsPointItem(item, index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        Point (HTML supported for bold)
      </label>
      <textarea
        rows={4}
        value={item.value || ''}
        onChange={(e) => update({ value: e.target.value })}
        placeholder="<b>Bold Lead:</b> Description text…"
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none font-mono"
      />
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, rows = 2, placeholder = '' }) {
  const cls =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
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

export default function BBAOverviewEditor() {
  return (
    <BBASectionEditorShell
      sectionKey="overview"
      title="Overview Section"
      description="Header, highlights (bilingual), description paragraphs, and Why IPS sub-section."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        const descParas = (data?.descriptionParagraphs || []).map((v) => ({ value: v }));
        const whyPoints = (data?.whyIpsPoints || []).map((v) => ({ value: v }));

        return (
          <>
            {/* Header fields */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Header</h2>
              <Field
                label="Degree Title"
                value={data?.overviewTitle}
                onChange={set('overviewTitle')}
                placeholder="BACHELOR OF BUSINESS ADMINISTRATION (BBA)"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Duration"
                  value={data?.overviewDuration}
                  onChange={set('overviewDuration')}
                  placeholder="3 Years (6 Semesters)"
                />
                <Field label="Caption below title" value={data?.overviewCaption} onChange={set('overviewCaption')} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUpload
                  label="RTU Logo"
                  value={data?.rtuLogoUrl || ''}
                  onChange={set('rtuLogoUrl')}
                  aspectHint="Square logo"
                  maxWidth="200px"
                  previewHeight="100px"
                  objectFit="contain"
                />
                <ImageUpload
                  label="AICTE Logo"
                  value={data?.aicteLogoUrl || ''}
                  onChange={set('aicteLogoUrl')}
                  aspectHint="Square logo"
                  maxWidth="200px"
                  previewHeight="100px"
                  objectFit="contain"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUpload
                  label="Approval Strip Image"
                  value={data?.approvalImageUrl || ''}
                  onChange={set('approvalImageUrl')}
                  aspectHint="Approval logos strip"
                  maxWidth="240px"
                  previewHeight="100px"
                  objectFit="contain"
                />
                <Field
                  label="Approval Caption"
                  value={data?.approvalImageCaption}
                  onChange={set('approvalImageCaption')}
                />
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Highlights</h2>
              <div className="mb-4">
                <Field
                  label="Highlights Section Heading"
                  value={data?.highlightsHeading}
                  onChange={set('highlightsHeading')}
                  placeholder="BBA HIGHLIGHTS:"
                />
              </div>
              <SortableList
                items={data?.highlights || []}
                onChange={(highlights) => setData({ ...data, highlights })}
                renderItem={HighlightItem}
                onAdd={() => ({ iconName: 'Lightbulb', text: '', hindiText: '', order: 0 })}
                addLabel="Add Highlight"
              />
            </div>

            {/* Description paragraphs */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Description Paragraphs</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                HTML tags like &lt;b&gt;bold&lt;/b&gt; are rendered on the page.
              </p>
              <SortableList
                items={descParas}
                onChange={(items) => setData({ ...data, descriptionParagraphs: items.map((i) => i.value) })}
                renderItem={DescParaItem}
                onAdd={() => ({ value: '' })}
                addLabel="Add Paragraph"
              />
            </div>

            {/* Why IPS */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Why IPS Sub-section</h2>
              <Field label="Sub-section Heading" value={data?.whyIpsHeading} onChange={set('whyIpsHeading')} />
              <Field
                label="Intro Paragraph"
                value={data?.whyIpsIntro}
                onChange={set('whyIpsIntro')}
                multiline
                rows={3}
              />
              <div>
                <p className="text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-2">
                  Bullet Points (HTML for bold)
                </p>
                <SortableList
                  items={whyPoints}
                  onChange={(items) => setData({ ...data, whyIpsPoints: items.map((i) => i.value) })}
                  renderItem={WhyIpsPointItem}
                  onAdd={() => ({ value: '' })}
                  addLabel="Add Point"
                />
              </div>
            </div>
          </>
        );
      }}
    </BBASectionEditorShell>
  );
}

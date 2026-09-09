'use client';

import { useState } from 'react';
import SectionEditorShell from '../SectionEditorShell';
import ImageUpload from '../ImageUpload';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

function FeatureListEditor({ features, onChange }) {
  return (
    <div className="space-y-2">
      {(features || []).map((f, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={f}
            onChange={(e) => {
              const next = [...features];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
            placeholder={`Feature ${i + 1}`}
          />
          <button
            type="button"
            onClick={() => onChange(features.filter((_, fi) => fi !== i))}
            className="text-[#aab4bf] hover:text-red-500 transition cursor-pointer shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...(features || []), ''])}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#e2e8f0] rounded-lg py-2 text-[12px] text-[#77838f] hover:border-[#eb5905] hover:text-[#eb5905] transition cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Feature
      </button>
    </div>
  );
}

function ProgramCard({ program, index, onChange, onRemove }) {
  const [open, setOpen] = useState(true);

  function set(key) {
    return (val) => onChange({ ...program, [key]: val });
  }

  return (
    <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden bg-white">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4  cursor-pointer" onClick={() => setOpen((v) => !v)}>
        <div className="flex items-center gap-3">
          <span className="bg-[#eb5905] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            {program.badge || `Program ${index + 1}`}
          </span>
          <span className="text-[14px] font-semibold text-[#222]">{program.title || 'Untitled'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-[#aab4bf] hover:text-red-500 transition cursor-pointer p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {open ? <ChevronUp className="w-4 h-4 text-[#77838f]" /> : <ChevronDown className="w-4 h-4 text-[#77838f]" />}
        </div>
      </div>

      {open && (
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Badge
              </label>
              <input
                type="text"
                value={program.badge || ''}
                onChange={(e) => set('badge')(e.target.value)}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Duration
              </label>
              <input
                type="text"
                value={program.duration || ''}
                onChange={(e) => set('duration')(e.target.value)}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Page Link
              </label>
              <input
                type="text"
                value={program.link || ''}
                onChange={(e) => set('link')(e.target.value)}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Title</label>
            <input
              type="text"
              value={program.title || ''}
              onChange={(e) => set('title')(e.target.value)}
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={program.description || ''}
              onChange={(e) => set('description')(e.target.value)}
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
            />
          </div>

          <ImageUpload
            label="Program Card Image"
            value={program.image || ''}
            onChange={set('image')}
            aspectHint="Landscape image recommended"
            maxWidth="300px"
            previewHeight="140px"
            objectFit="cover"
          />

          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-2">
              Features (shown on hover)
            </label>
            <FeatureListEditor features={program.features || []} onChange={set('features')} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProgramsEditor() {
  return (
    <SectionEditorShell
      sectionKey="programs"
      title="Programs Offered"
      description="Manage the MBA, BBA, BCA program cards."
    >
      {(data, setData) => {
        const programs = data?.programs || [];

        function updateProgram(index, updated) {
          const next = programs.map((p, i) => (i === index ? updated : p));
          setData({ ...data, programs: next });
        }
        function removeProgram(index) {
          setData({ ...data, programs: programs.filter((_, i) => i !== index) });
        }
        function addProgram() {
          setData({
            ...data,
            programs: [
              ...programs,
              {
                badge: 'NEW',
                title: '',
                image: '',
                description: '',
                hoverTitle: '',
                features: [],
                approvals: [
                  { name: 'AICTE', logo: '' },
                  { name: 'RTU', logo: '' },
                ],
                duration: '',
                eligibility: 'Check Eligibility',
                buttonText: 'Read More',
                link: '/',
                order: programs.length,
              },
            ],
          });
        }

        return (
          <>
            {/* Section header */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Header</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={data?.programsHeading || ''}
                    onChange={(e) => setData({ ...data, programsHeading: e.target.value })}
                    className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                    Sub-heading
                  </label>
                  <input
                    type="text"
                    value={data?.programsSubHeading || ''}
                    onChange={(e) => setData({ ...data, programsSubHeading: e.target.value })}
                    className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                  />
                </div>
              </div>
            </div>

            {/* Programs */}
            <div className="space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Programs</h2>
              {programs.map((program, i) => (
                <ProgramCard
                  key={program._id || i}
                  program={program}
                  index={i}
                  onChange={(updated) => updateProgram(i, updated)}
                  onRemove={() => removeProgram(i)}
                />
              ))}
              <button
                type="button"
                onClick={addProgram}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#e2e8f0] rounded-2xl py-4 text-[13px] font-medium text-[#77838f] hover:border-[#eb5905] hover:text-[#eb5905] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Program
              </button>
            </div>
          </>
        );
      }}
    </SectionEditorShell>
  );
}

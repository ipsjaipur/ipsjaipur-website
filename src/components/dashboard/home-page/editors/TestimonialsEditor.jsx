'use client';

import SectionEditorShell from '../SectionEditorShell';
import SortableList from '../SortableList';
import ImageUpload from '../ImageUpload';

function TestimonialItem(item, index, update) {
  return (
    <ImageUpload
      label={`Slide ${index + 1}`}
      value={item.image || ''}
      onChange={(url) => update({ image: url })}
      aspectHint="Portrait or landscape testimonial card"
      maxWidth="200px"
      previewHeight="160px"
      objectFit="cover"
    />
  );
}

export default function TestimonialsEditor() {
  return (
    <SectionEditorShell
      sectionKey="testimonials"
      title="Student Testimonials"
      description="Heading, description, and the student feedback slide images."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        return (
          <>
            {/* Text */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Text</h2>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Section Label (small caps)
                </label>
                <input
                  type="text"
                  value={data?.testimonialsLabel || ''}
                  onChange={(e) => set('testimonialsLabel')(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={data?.testimonialsHeading || ''}
                  onChange={(e) => set('testimonialsHeading')(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={data?.testimonialsDescription || ''}
                  onChange={(e) => set('testimonialsDescription')(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
                />
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Testimonial Slide Images</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Drag to reorder. All images scroll automatically in the slider.
              </p>
              <SortableList
                items={data?.testimonialImages || []}
                onChange={(testimonialImages) => setData({ ...data, testimonialImages })}
                renderItem={TestimonialItem}
                onAdd={() => ({ image: '', order: 0 })}
                addLabel="Add Testimonial Image"
              />
            </div>
          </>
        );
      }}
    </SectionEditorShell>
  );
}

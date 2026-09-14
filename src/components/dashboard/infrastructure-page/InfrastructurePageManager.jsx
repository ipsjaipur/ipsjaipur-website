'use client';

import BannerEditor        from './editors/BannerEditor';
import IntroEditor         from './editors/IntroEditor';
import ContentSectionEditor from './editors/ContentSectionEditor';
import NavigationEditor    from './editors/NavigationEditor';
import SidebarEditor       from './editors/SidebarEditor';
import InfrastructurePageSectionsPage from './InfrastructurePageSectionsPage';

// Map each section key to its editor component (or config for ContentSectionEditor)
const EDITOR_MAP = {
  banner:     () => <BannerEditor />,
  intro:      () => <IntroEditor />,

  classrooms: () => (
    <ContentSectionEditor
      sectionKey="classrooms"
      title="AC Classrooms"
      description="Title, subtitle, description, and carousel images."
      hasImages
    />
  ),
  auditorium: () => (
    <ContentSectionEditor
      sectionKey="auditorium"
      title="Auditorium"
      description="Title, subtitle, description, and carousel images."
      hasImages
    />
  ),
  labs: () => (
    <ContentSectionEditor
      sectionKey="labs"
      title="Computer Labs"
      description="Title, subtitle, description, and carousel images."
      hasImages
    />
  ),
  library: () => (
    <ContentSectionEditor
      sectionKey="library"
      title="Library"
      description="Title, subtitle, and description. No images."
      hasImages={false}
    />
  ),
  sports: () => (
    <ContentSectionEditor
      sectionKey="sports"
      title="Sports Activities"
      description="Title, subtitle, description, and carousel images."
      hasImages
    />
  ),
  wifi: () => (
    <ContentSectionEditor
      sectionKey="wifi"
      title="Wi-Fi Campus"
      description="Title, subtitle, and description. No images."
      hasImages={false}
    />
  ),
  parking: () => (
    <ContentSectionEditor
      sectionKey="parking"
      title="Parking Area"
      description="Title, subtitle, and description. No images."
      hasImages={false}
    />
  ),
  hostels: () => (
    <ContentSectionEditor
      sectionKey="hostels"
      title="Hostels + PGs"
      description="Title, subtitle, and description. No images."
      hasImages={false}
    />
  ),
  location: () => (
    <ContentSectionEditor
      sectionKey="location"
      title="Location"
      description="Title, subtitle, description, and a single map/location image."
      hasImages={false}
      hasSingleImage
    />
  ),
  transport: () => (
    <ContentSectionEditor
      sectionKey="transport"
      title="Public Transport"
      description="Title, subtitle, and description (supports line breaks). No images."
      hasImages={false}
    />
  ),
  nearby: () => (
    <ContentSectionEditor
      sectionKey="nearby"
      title="Nearby Destinations"
      description="Title, subtitle, description, and carousel images."
      hasImages
    />
  ),
  ecosystem: () => (
    <ContentSectionEditor
      sectionKey="ecosystem"
      title="Ecosystem Closing"
      description="Closing description paragraph shown at the bottom. No title/subtitle displayed on the page."
      hasImages={false}
      hasTitle={false}
    />
  ),
  navigation: () => <NavigationEditor />,
  sidebar:    () => <SidebarEditor />,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * Receives `section` as a prop from the server page (read from searchParams).
 */
export default function InfrastructurePageManager({ section }) {
  if (!section) {
    return <InfrastructurePageSectionsPage />;
  }

  const renderEditor = EDITOR_MAP[section];

  if (!renderEditor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">
            Unknown section: &quot;{section}&quot;
          </p>
          <a
            href="/dashboard/page-content/infrastructure"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Infrastructure Page sections
          </a>
        </div>
      </div>
    );
  }

  return renderEditor();
}

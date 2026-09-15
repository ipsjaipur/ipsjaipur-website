import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactPageContent from '@/models/ContactPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * GET /api/contact-content
 * Public — returns all section documents as { [section]: data }
 * Optional query: ?section=banner  → returns only that section
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const doc = await ContactPageContent.findOne({ section }).lean();
      return NextResponse.json({ success: true, data: doc });
    }

    const docs = await ContactPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return NextResponse.json({ success: true, data: map });
  } catch (error) {
    console.error('[CONTACT-CONTENT GET]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact content' },
      { status: 500 }
    );
  }
}

/**
 * Strip legacy SVG fields that existed in the old schema.
 * These should never reach the DB now that icons are static.
 */
function sanitizeSocialLinks(links) {
  if (!Array.isArray(links)) return links;
  return links.map(({ svgPath, svgViewBox, hoverBgClass, ...rest }) => rest);
}

/**
 * PUT /api/contact-content
 * Admin protected — upsert one section document
 * Body: { section: 'banner' | 'info', ...fields }
 */
export async function PUT(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { section, ...fields } = body;

    if (!section) {
      return NextResponse.json(
        { success: false, message: 'section field is required' },
        { status: 400 }
      );
    }

    // Strip any legacy SVG fields from socialLinks before saving
    if (fields.socialLinks) {
      fields.socialLinks = sanitizeSocialLinks(fields.socialLinks);
    }

    await connectDB();

    const updated = await ContactPageContent.findOneAndUpdate(
      { section },
      { $set: { section, ...fields } },
      { upsert: true, new: true, runValidators: false }
    ).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[CONTACT-CONTENT PUT]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update contact content' },
      { status: 500 }
    );
  }
}

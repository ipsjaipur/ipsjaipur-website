import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AboutPageContent from '@/models/AboutPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * GET /api/about-content
 * Public — returns all section documents as { [section]: data }
 * Optional query: ?section=content  → returns only that section
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const doc = await AboutPageContent.findOne({ section }).lean();
      return NextResponse.json({ success: true, data: doc });
    }

    const docs = await AboutPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return NextResponse.json({ success: true, data: map });
  } catch (error) {
    console.error('[ABOUT-CONTENT GET]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch About page content' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/about-content
 * Admin protected — upsert one section document
 * Body: { section: 'content' | 'sidebar', ...fields }
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

    await connectDB();

    const updated = await AboutPageContent.findOneAndUpdate(
      { section },
      { $set: { section, ...fields } },
      { upsert: true, new: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[ABOUT-CONTENT PUT]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update About page content' },
      { status: 500 }
    );
  }
}

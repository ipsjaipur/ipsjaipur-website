import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FacultyPageContent from '@/models/FacultyPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * GET /api/faculty-content
 * Public — returns all section documents as { [section]: data }
 * Optional query: ?section=faculty  → returns only that section
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const doc = await FacultyPageContent.findOne({ section }).lean();
      return NextResponse.json({ success: true, data: doc });
    }

    const docs = await FacultyPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return NextResponse.json({ success: true, data: map });
  } catch (error) {
    console.error('[FACULTY-CONTENT GET]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch Faculty content' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/faculty-content
 * Admin protected — upsert one section document
 * Body: { section: 'banner' | 'faculty' | 'mentors', ...fields }
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

    const updated = await FacultyPageContent.findOneAndUpdate(
      { section },
      { $set: { section, ...fields } },
      { upsert: true, new: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[FACULTY-CONTENT PUT]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update Faculty content' },
      { status: 500 }
    );
  }
}

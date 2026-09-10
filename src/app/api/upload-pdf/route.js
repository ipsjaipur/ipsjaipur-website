import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getAuthFromCookies } from '@/lib/auth';

const MAX_PDF_SIZE = 20 * 1024 * 1024; // 20 MB

export async function POST(request) {
  try {
    // Auth check
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    // Validate
    const ext = file.name?.split('.').pop()?.toLowerCase();
    const isPdf = file.type === 'application/pdf' || ext === 'pdf';
    if (!isPdf) {
      return NextResponse.json({ success: false, message: 'Only PDF files are allowed' }, { status: 400 });
    }
    if (file.size > MAX_PDF_SIZE) {
      return NextResponse.json({ success: false, message: 'PDF size cannot exceed 20 MB' }, { status: 400 });
    }

    // Sanitise original filename
    // e.g. "MBA Syllabus (1st Sem).pdf" → "mba-syllabus-1st-sem.pdf"
    const originalName = file.name || 'document.pdf';
    const cleanName =
      originalName
        .replace(/\.pdf$/i, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') + '.pdf';

    // Save to public/pdfs/  (created if it doesn't exist)
    const uploadDir = join(process.cwd(), 'public', 'pdfs');
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(join(uploadDir, cleanName), buffer);

    // Public URL — Next.js serves public/ at root
    const publicUrl = `/pdfs/${cleanName}`;

    return NextResponse.json(
      {
        success: true,
        message: 'PDF uploaded successfully',
        data: {
          url: publicUrl,
          name: cleanName,
          size: file.size,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[PDF UPLOAD ERROR]', error);
    return NextResponse.json({ success: false, message: 'Failed to upload PDF' }, { status: 500 });
  }
}

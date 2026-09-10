import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getAuthFromCookies } from '@/lib/auth';
import { validateImageFile } from '@/lib/validations';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.errors[0], errors: validation.errors },
        { status: 400 }
      );
    }

    // Convert file to base64 data URI for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Sanitise original filename → use as public_id so the URL is readable.
    // Spaces → hyphens, special chars removed, extension stripped.
    // e.g. "About Us Banner.webp" → "about-us-banner"
    const originalName = file.name || 'image';
    const cleanName = originalName
      .replace(/\.[^/.]+$/, '')          // strip extension
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')              // spaces → hyphens
      .replace(/[^a-z0-9-]/g, '')        // remove any remaining special chars
      .replace(/-{2,}/g, '-')            // collapse multiple hyphens
      .replace(/^-+|-+$/g, '');          // trim leading/trailing hyphens

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'ips-edu',
      resource_type: 'image',
      public_id: cleanName,
      use_filename: false,
      unique_filename: false,
      overwrite: true,                   // overwrite if same name re-uploaded
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          size: file.size,
          type: file.type,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[UPLOAD ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

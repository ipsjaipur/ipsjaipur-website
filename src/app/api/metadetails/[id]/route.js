import connectDB from '@/lib/mongodb';
import PageSeo from '@/models/PageSeo';
import { getAuthFromCookies } from '@/lib/auth';
import { seoUpdateSchema } from '@/lib/validations';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
  validationError,
} from '@/lib/apiResponse';

// ─── GET /api/metadetails/[id] — Single record by MongoDB _id ─────────────────
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const record = await PageSeo.findById(id).lean();
    if (!record) return notFoundResponse('SEO record not found');

    return successResponse(record);
  } catch (error) {
    console.error('[SEO GET ERROR]', error);
    return errorResponse('Failed to fetch SEO record', 500);
  }
}

// ─── PUT /api/metadetails/[id] — Full update (protected) ─────────────────────
export async function PUT(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body   = await request.json();

    const parsed = seoUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const record = await PageSeo.findById(id);
    if (!record) return notFoundResponse('SEO record not found');

    // If slug is being changed, check uniqueness against other docs
    if (parsed.data.pageSlug && parsed.data.pageSlug !== record.pageSlug) {
      const existing = await PageSeo.findOne({
        pageSlug: parsed.data.pageSlug,
        _id: { $ne: id },
      });
      if (existing) {
        return validationError({ pageSlug: ['An SEO record for this slug already exists.'] });
      }
    }

    const updated = await PageSeo.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    return successResponse(updated, 'SEO record updated successfully');
  } catch (error) {
    console.error('[SEO UPDATE ERROR]', error);
    if (error.code === 11000) {
      return validationError({ pageSlug: ['An SEO record for this slug already exists.'] });
    }
    return errorResponse('Failed to update SEO record', 500);
  }
}

// ─── PATCH /api/metadetails/[id] — Partial update e.g. toggle isActive ───────
export async function PATCH(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body   = await request.json();

    await connectDB();

    const record = await PageSeo.findById(id);
    if (!record) return notFoundResponse('SEO record not found');

    const updated = await PageSeo.findByIdAndUpdate(id, body, { new: true });
    return successResponse(updated, 'SEO record updated successfully');
  } catch (error) {
    console.error('[SEO PATCH ERROR]', error);
    return errorResponse('Failed to update SEO record', 500);
  }
}

// ─── DELETE /api/metadetails/[id] — Delete (protected) ───────────────────────
export async function DELETE(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    await connectDB();

    const record = await PageSeo.findByIdAndDelete(id);
    if (!record) return notFoundResponse('SEO record not found');

    return successResponse({ id }, 'SEO record deleted successfully');
  } catch (error) {
    console.error('[SEO DELETE ERROR]', error);
    return errorResponse('Failed to delete SEO record', 500);
  }
}

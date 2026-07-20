import connectDB from '@/lib/mongodb';
import PageSeo from '@/models/PageSeo';
import { getAuthFromCookies } from '@/lib/auth';
import { seoSchema } from '@/lib/validations';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
  validationError,
} from '@/lib/apiResponse';

// ─── GET /api/metadetails ─────────────────────────────────────────────────────
// Public endpoint.
// With ?slug=<pageSlug>  → returns the single SEO record for that page.
// Without ?slug           → returns all records (paginated, for admin list).
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // ── Single lookup by slug (used by generateMetadata on every page) ─────
    if (slug !== null) {
      const record = await PageSeo.findOne({ pageSlug: slug, isActive: true }).lean();
      if (!record) return notFoundResponse('SEO record not found for this page');
      return successResponse(record);
    }

    // ── Admin list (paginated) ─────────────────────────────────────────────
    const page  = Math.max(1, parseInt(searchParams.get('page')  || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50')));
    const search = searchParams.get('search') || '';

    const filter = {};
    if (search) {
      filter.$or = [
        { pageName:        { $regex: search, $options: 'i' } },
        { pageSlug:        { $regex: search, $options: 'i' } },
        { metaTitle:       { $regex: search, $options: 'i' } },
        { metaDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [docs, totalDocs] = await Promise.all([
      PageSeo.find(filter).sort({ pageName: 1 }).skip(skip).limit(limit).lean(),
      PageSeo.countDocuments(filter),
    ]);

    return successResponse({
      docs,
      totalDocs,
      page,
      limit,
      totalPages: Math.ceil(totalDocs / limit),
      hasNextPage: page < Math.ceil(totalDocs / limit),
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error('[SEO LIST ERROR]', error);
    return errorResponse('Failed to fetch SEO records', 500);
  }
}

// ─── POST /api/metadetails — Create new SEO record (protected) ───────────────
export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const body   = await request.json();
    const parsed = seoSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    // Enforce unique slug
    const existing = await PageSeo.findOne({ pageSlug: parsed.data.pageSlug });
    if (existing) {
      return validationError({ pageSlug: ['An SEO record for this slug already exists.'] });
    }

    const record = await PageSeo.create(parsed.data);
    return successResponse(record, 'SEO record created successfully', 201);
  } catch (error) {
    console.error('[SEO CREATE ERROR]', error);
    if (error.code === 11000) {
      return validationError({ pageSlug: ['An SEO record for this slug already exists.'] });
    }
    return errorResponse('Failed to create SEO record', 500);
  }
}

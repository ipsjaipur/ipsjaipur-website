import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { getAuthFromCookies } from '@/lib/auth';
import { postUpdateSchema } from '@/lib/validations';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
  validationError,
} from '@/lib/apiResponse';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const isObjectId = /^[a-f0-9]{24}$/i.test(id);
    const news = isObjectId
      ? await News.findById(id)
      : await News.findOne({ slug: id });

    if (!news) return notFoundResponse('News not found');

    if (!isObjectId || news.status === 'published') {
      News.findByIdAndUpdate(news._id, { $inc: { views: 1 } }).catch(() => {});
    }

    return successResponse(news);
  } catch (error) {
    console.error('[NEWS GET ERROR]', error);
    return errorResponse('Failed to fetch news', 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    const parsed = postUpdateSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

    await connectDB();

    const news = await News.findById(id);
    if (!news) return notFoundResponse('News not found');

    if (parsed.data.slug && parsed.data.slug !== news.slug) {
      const existing = await News.findOne({ slug: parsed.data.slug, _id: { $ne: id } });
      if (existing) return validationError({ slug: ['This slug is already taken.'] });
    }

    const updateData = { ...parsed.data };
    if (parsed.data.status === 'published' && news.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (parsed.data.status === 'draft') {
      updateData.publishedAt = null;
    }

    if (parsed.data.content !== undefined) {
      const wordCount = parsed.data.content
        ? parsed.data.content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
        : 0;
      updateData.readingTime = Math.max(1, Math.ceil(wordCount / 200));
    }

    const updated = await News.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    return successResponse(updated, 'News updated successfully');
  } catch (error) {
    console.error('[NEWS UPDATE ERROR]', error);
    if (error.code === 11000) return validationError({ slug: ['This slug is already taken.'] });
    return errorResponse('Failed to update news', 500);
  }
}

export async function PATCH(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const news = await News.findById(id);
    if (!news) return notFoundResponse('News not found');

    const updateData = { ...body };
    if (body.status === 'published' && news.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (body.status === 'draft') {
      updateData.publishedAt = null;
    }

    const updated = await News.findByIdAndUpdate(id, updateData, { new: true });
    return successResponse(updated, 'News updated successfully');
  } catch (error) {
    console.error('[NEWS PATCH ERROR]', error);
    return errorResponse('Failed to update news', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    await connectDB();

    const news = await News.findByIdAndDelete(id);
    if (!news) return notFoundResponse('News not found');

    return successResponse({ id }, 'News deleted successfully');
  } catch (error) {
    console.error('[NEWS DELETE ERROR]', error);
    return errorResponse('Failed to delete news', 500);
  }
}

import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import Blog from '@/models/Blog';
import HomePageContent from '@/models/HomePageContent';
import MBAPageContent from '@/models/MBAPageContent';
import BBAPageContent from '@/models/BBAPageContent';

export async function getNewsByCategory(category, limit = 10) {
  try {
    await connectDB();

    const news = await News.find({
      status: 'published',
      category: category,
    })
      .select('title slug shortDescription featuredImage author category publishedAt readingTime')
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    return news || [];
  } catch (error) {
    console.error(`[GET NEWS BY CATEGORY ERROR] ${category}:`, error);
    return [];
  }
}

export async function getLatestBlogs(limit = 4) {
  try {
    await connectDB();

    const blogs = await Blog.find({ status: 'published' })
      .select('title slug shortDescription featuredImage author category publishedAt readingTime')
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    return blogs || [];
  } catch (error) {
    console.error('[GET LATEST BLOGS ERROR]:', error);
    return [];
  }
}

export async function getBlogWithRelated(slug) {
  await connectDB();

  const blog = await Blog.findOne({ slug, status: 'published' }).lean();
  if (!blog) return null;

  const selectFields = 'title slug shortDescription featuredImage publishedAt author category readingTime';

  // Try to find related by same category or overlapping tags
  const orConditions = [{ category: blog.category }];
  if (blog.tags && blog.tags.length > 0) {
    orConditions.push({ tags: { $in: blog.tags } });
  }

  let related = await Blog.find({
    status: 'published',
    slug: { $ne: slug },
    $or: orConditions,
  })
    .sort('-publishedAt')
    .limit(3)
    .select(selectFields)
    .lean();

  // Fallback: if not enough related blogs found, fill up with latest blogs
  if (related.length < 3) {
    const existingSlugs = [slug, ...related.map((r) => r.slug)];
    const fallback = await Blog.find({
      status: 'published',
      slug: { $nin: existingSlugs },
    })
      .sort('-publishedAt')
      .limit(3 - related.length)
      .select(selectFields)
      .lean();

    related = [...related, ...fallback];
  }

  return {
    blog: JSON.parse(JSON.stringify(blog)),
    related: JSON.parse(JSON.stringify(related)),
  };
}

export async function getNewsWithRelated(slug) {
  await connectDB();

  const news = await News.findOne({ slug, status: 'published' }).lean();
  if (!news) return null;

  const related = await News.find({
    status: 'published',
    slug: { $ne: slug },
    category: news.category,
  })
    .sort('-publishedAt')
    .limit(3)
    .select('title slug shortDescription featuredImage publishedAt author category readingTime')
    .lean();

  return {
    news: JSON.parse(JSON.stringify(news)),
    related: JSON.parse(JSON.stringify(related)),
  };
}

/**
 * Fetch all home page section documents and return as a keyed object.
 * Falls back to an empty object so components use their static defaults.
 */
export async function getHomePageContent() {
  try {
    await connectDB();
    const docs = await HomePageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET HOME PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single home page section document.
 * @param {string} section - e.g. 'banner', 'approvals', etc.
 */
export async function getHomeSection(section) {
  try {
    await connectDB();
    const doc = await HomePageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET HOME SECTION ERROR] ${section}:`, error);
    return null;
  }
}

/**
 * Fetch all MBA page section documents and return as a keyed object.
 * Falls back to an empty object so components use their static defaults.
 */
export async function getMBAPageContent() {
  try {
    await connectDB();
    const docs = await MBAPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET MBA PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single MBA page section document.
 * @param {string} section - e.g. 'banner', 'overview', 'faq', etc.
 */
export async function getMBASection(section) {
  try {
    await connectDB();
    const doc = await MBAPageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET MBA SECTION ERROR] ${section}:`, error);
    return null;
  }
}

/**
 * Fetch all BBA page section documents and return as a keyed object.
 * Falls back to an empty object so the page calls notFound().
 */
export async function getBBAPageContent() {
  try {
    await connectDB();
    const docs = await BBAPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET BBA PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single BBA page section document.
 * @param {string} section - e.g. 'banner', 'overview', 'faq', etc.
 */
export async function getBBASection(section) {
  try {
    await connectDB();
    const doc = await BBAPageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET BBA SECTION ERROR] ${section}:`, error);
    return null;
  }
}

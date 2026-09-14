import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import Blog from '@/models/Blog';
import HomePageContent from '@/models/HomePageContent';
import MBAPageContent from '@/models/MBAPageContent';
import BBAPageContent from '@/models/BBAPageContent';
import BCAPageContent from '@/models/BCAPageContent';
import IpsSutraPageContent from '@/models/IpsSutraPageContent';
import AboutPageContent from '@/models/AboutPageContent';
import BoardOfAdvisorsPageContent from '@/models/BoardOfAdvisorsPageContent';
import PlacementsPageContent from '@/models/PlacementsPageContent';
import FacultyPageContent from '@/models/FacultyPageContent';
import StudentLifePageContent from '@/models/StudentLifePageContent';
import InfrastructurePageContent from '@/models/InfrastructurePageContent';

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

/**
 * Fetch all BCA page section documents and return as a keyed object.
 * Falls back to an empty object so the page calls notFound().
 */
export async function getBCAPageContent() {
  try {
    await connectDB();
    const docs = await BCAPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET BCA PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single BCA page section document.
 * @param {string} section - e.g. 'banner', 'overview', 'faq', etc.
 */
export async function getBCASection(section) {
  try {
    await connectDB();
    const doc = await BCAPageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET BCA SECTION ERROR] ${section}:`, error);
    return null;
  }
}

/**
 * Fetch all IPS Sutra page section documents and return as a keyed object.
 * Falls back to an empty object so the page calls notFound().
 */
export async function getIpsSutraPageContent() {
  try {
    await connectDB();
    const docs = await IpsSutraPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET IPS SUTRA PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single IPS Sutra page section document.
 * @param {string} section - 'content' | 'advantages'
 */
export async function getIpsSutraSection(section) {
  try {
    await connectDB();
    const doc = await IpsSutraPageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET IPS SUTRA SECTION ERROR] ${section}:`, error);
    return null;
  }
}

/**
 * Fetch all About page section documents and return as a keyed object.
 * Falls back to an empty object so the page calls notFound().
 */
export async function getAboutPageContent() {
  try {
    await connectDB();
    const docs = await AboutPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET ABOUT PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single About page section document.
 * @param {string} section - 'content' | 'sidebar'
 */
export async function getAboutSection(section) {
  try {
    await connectDB();
    const doc = await AboutPageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET ABOUT SECTION ERROR] ${section}:`, error);
    return null;
  }
}

/**
 * Fetch all Board of Advisors page section documents and return as a keyed object.
 * Falls back to an empty object so the page calls notFound().
 */
export async function getBoardOfAdvisorsPageContent() {
  try {
    await connectDB();
    const docs = await BoardOfAdvisorsPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET BOARD OF ADVISORS PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch all Placements page section documents and return as a keyed object.
 * Falls back to an empty object so components use their static defaults.
 */
export async function getPlacementsPageContent() {
  try {
    await connectDB();
    const docs = await PlacementsPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET PLACEMENTS PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single Placements page section document.
 * @param {string} section - 'stats' | 'updates' | 'resumeBook' | 'faq' | 'coordinator'
 */
export async function getPlacementsSection(section) {
  try {
    await connectDB();
    const doc = await PlacementsPageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET PLACEMENTS SECTION ERROR] ${section}:`, error);
    return null;
  }
}

/**
 * Fetch all Faculty page section documents and return as a keyed object.
 * Falls back to an empty object so components use their static defaults.
 */
export async function getFacultyPageContent() {
  try {
    await connectDB();
    const docs = await FacultyPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET FACULTY PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single Faculty page section document.
 * @param {string} section - 'banner' | 'faculty' | 'mentors'
 */
export async function getFacultySection(section) {
  try {
    await connectDB();
    const doc = await FacultyPageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET FACULTY SECTION ERROR] ${section}:`, error);
    return null;
  }
}

/**
 * Fetch all Student Life page section documents and return as a keyed object.
 * Falls back to an empty object so the page calls notFound().
 */
export async function getStudentLifePageContent() {
  try {
    await connectDB();
    const docs = await StudentLifePageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET STUDENT LIFE PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single Student Life page section document.
 * @param {string} section - 'banner' | 'campus' | 'student-club' | 'sports-club' | 'indoor-games' | 'committees' | 'sidebar'
 */
export async function getStudentLifeSection(section) {
  try {
    await connectDB();
    const doc = await StudentLifePageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET STUDENT LIFE SECTION ERROR] ${section}:`, error);
    return null;
  }
}

/**
 * Fetch all Infrastructure page section documents and return as a keyed object.
 * Returns {} on DB error — the page will call notFound() when it receives {}.
 */
export async function getInfrastructurePageContent() {
  try {
    await connectDB();
    const docs = await InfrastructurePageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return map;
  } catch (error) {
    console.error('[GET INFRASTRUCTURE PAGE CONTENT ERROR]:', error);
    return {};
  }
}

/**
 * Fetch a single Infrastructure page section document.
 * @param {string} section - e.g. 'banner' | 'intro' | 'classrooms' | etc.
 */
export async function getInfrastructureSection(section) {
  try {
    await connectDB();
    const doc = await InfrastructurePageContent.findOne({ section }).lean();
    return doc || null;
  } catch (error) {
    console.error(`[GET INFRASTRUCTURE SECTION ERROR] ${section}:`, error);
    return null;
  }
}

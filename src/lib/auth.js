import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'ips_admin_token';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day (default, without rememberMe)

// ─── Password Utilities ────────────────────────────────────────────────────────

/**
 * Hash a plain text password
 * @param {string} password
 * @returns {Promise<string>} hashed password
 */
export async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compare plain text password with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// ─── JWT Utilities ─────────────────────────────────────────────────────────────

/**
 * Sign a JWT token
 * @param {object} payload
 * @param {string} [expiresIn] - e.g. '7d', '24h'
 * @returns {string} signed token
 */
export function signToken(payload, expiresIn = '7d') {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify a JWT token
 * @param {string} token
 * @returns {object|null} decoded payload or null
 */
export function verifyToken(token) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// ─── Cookie Utilities (Server-side) ───────────────────────────────────────────

/**
 * Set the auth cookie (server-side, in Route Handler)
 * @param {object} response - NextResponse
 * @param {string} token
 * @param {boolean} rememberMe
 */
export function setAuthCookie(response, token, rememberMe = false) {
  // Always set maxAge so cookie survives redirects and page navigations.
  // rememberMe = 30 days, otherwise 1 day session
  const maxAge = rememberMe
    ? 60 * 60 * 24 * 30  // 30 days
    : 60 * 60 * 24;       // 1 day

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
}

/**
 * Clear the auth cookie (server-side, in Route Handler)
 * @param {object} response - NextResponse
 */
export function clearAuthCookie(response) {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

/**
 * Get and verify the token from cookies in a server component or route handler
 * Uses next/headers cookies()
 * @returns {object|null} decoded token payload or null
 */
export async function getAuthFromCookies() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Get token string from request cookies header
 * Used in middleware (no next/headers available)
 * @param {Request} request
 * @returns {string|null}
 */
export function getTokenFromRequest(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export { COOKIE_NAME };

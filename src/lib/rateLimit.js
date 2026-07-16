/**
 * Simple in-memory rate limiter for login endpoint.
 * In production with multiple Vercel instances, use Upstash Redis instead.
 * This is sufficient for single-instance deployments.
 */

const attempts = new Map();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Check if IP is rate limited
 * @param {string} ip
 * @returns {{ limited: boolean, remaining: number, resetAt: number }}
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const record = attempts.get(ip);

  // No previous attempts
  if (!record) {
    return { limited: false, remaining: MAX_ATTEMPTS - 1, resetAt: now + WINDOW_MS };
  }

  // Window expired — reset
  if (now > record.resetAt) {
    attempts.delete(ip);
    return { limited: false, remaining: MAX_ATTEMPTS - 1, resetAt: now + WINDOW_MS };
  }

  // Within window
  if (record.count >= MAX_ATTEMPTS) {
    return { limited: true, remaining: 0, resetAt: record.resetAt };
  }

  return {
    limited: false,
    remaining: MAX_ATTEMPTS - record.count - 1,
    resetAt: record.resetAt,
  };
}

/**
 * Record a failed attempt for an IP
 * @param {string} ip
 */
export function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    attempts.set(ip, { count: record.count + 1, resetAt: record.resetAt });
  }
}

/**
 * Clear attempts for an IP (on successful login)
 * @param {string} ip
 */
export function clearAttempts(ip) {
  attempts.delete(ip);
}

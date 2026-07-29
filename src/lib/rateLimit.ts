interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for IP addresses
const ipCache = new Map<string, RateLimitEntry>();

// Config: Limit requests per IP address
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
const MAX_LIMIT = 5; // Max 5 requests per window

/**
 * Basic in-memory rate limiter helper for Route Handlers.
 * Returns true if request is allowed, false if limit exceeded.
 */
export function rateLimiter(ip: string): { allowed: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const cached = ipCache.get(ip);

  // If IP isn't cached or its window has expired, reset/create entry
  if (!cached || now > cached.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };
    ipCache.set(ip, newEntry);
    return {
      allowed: true,
      remaining: MAX_LIMIT - 1,
      reset: newEntry.resetTime,
    };
  }

  // Increment requests
  cached.count += 1;

  if (cached.count > MAX_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      reset: cached.resetTime,
    };
  }

  return {
    allowed: true,
    remaining: MAX_LIMIT - cached.count,
    reset: cached.resetTime,
  };
}

// Memory leak prevention: Clean up expired cache entries every 10 minutes
if (typeof global !== "undefined") {
  const globalAny = global as any;
  if (!globalAny.rateLimitCleanupInterval) {
    globalAny.rateLimitCleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [ip, entry] of ipCache.entries()) {
        if (now > entry.resetTime) {
          ipCache.delete(ip);
        }
      }
    }, 10 * 60 * 1000);
  }
}

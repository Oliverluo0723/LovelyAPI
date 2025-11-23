import { Context, Next } from "hono";

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
  statusCode: number;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  statusCode: 429,
};

const ipRequestCounts = new Map<string, { count: number; startTime: number }>();

export const rateLimiter = (config: Partial<RateLimitConfig> = {}) => {
  const { windowMs, max, message, statusCode } = { ...defaultConfig, ...config };

  return async (c: Context, next: Next) => {
    const ip = c.req.header("CF-Connecting-IP") || "unknown";
    const now = Date.now();

    const record = ipRequestCounts.get(ip);

    if (!record) {
      ipRequestCounts.set(ip, { count: 1, startTime: now });
    } else {
      if (now - record.startTime > windowMs) {
        // Reset window
        record.count = 1;
        record.startTime = now;
      } else {
        record.count++;
        if (record.count > max) {
          return c.text(message, statusCode as any);
        }
      }
    }

    // Cleanup old entries periodically (simple optimization)
    // In a real worker environment, this map persists as long as the isolate is alive.
    // We might want to clear it if it gets too big, but for "basic" this is fine.
    
    await next();
  };
};

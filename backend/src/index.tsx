import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { basicAuth } from "hono/basic-auth";
import { secureHeaders } from "hono/secure-headers";
import { rateLimiter } from "./middlewares/rate-limiter";
import sweet from "./routes/sweet";

const app = new Hono();

app.use(secureHeaders());
app.use(cors());
app.use(logger());
app.use("/api/*", rateLimiter({ max: 20, windowMs: 30 * 1000 })); // app.use(basicAuth({ username: "admin", password: "123456" }));

app.route("", sweet);

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("錯誤", 500);
});

app.notFound((c) => {
  return c.text("沒有找到", 404);
});

export default app;

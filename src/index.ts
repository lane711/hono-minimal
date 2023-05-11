import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { poweredBy } from "hono/powered-by";
import { setupApi } from "./cms/api/api";

const app = new Hono();

app.use("*", poweredBy());

app.use("/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

setupApi(app);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;

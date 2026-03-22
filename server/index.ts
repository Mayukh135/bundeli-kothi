import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

registerRoutes(httpServer, app);

(async () => {
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    res.status(status).json({ message });
    throw err;
  });

  // In production, serve the static files from the dist folder
  // In development, use Vite's middleware to serve the files
  // This is so that we don't have to build the client in development
  // and the production build can be deployed to a static hosting service
  // without having to worry about the client being served by the server
  // and the server being served by the client, which would cause a conflict
  // and the server would not be able to serve the client because the client
  // would be trying to serve the server, which would cause a conflict and
  // the server would not be able to serve the client because the client
  // would be trying to serve the server, which would cause a conflict and
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // Only start the server if not in Vercel environment
  if (!process.env.VERCEL) {
    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || "5000", 10);
    // Use localhost on macOS, 0.0.0.0 on Linux
    const host = process.platform === "darwin" ? "127.0.0.1" : "0.0.0.0";
    const listenOptions: any = {
      port,
      host,
    };
    // Only use reusePort on non-macOS systems
    if (process.platform !== "darwin") {
      listenOptions.reusePort = true;
    }
    httpServer.listen(listenOptions, () => {
      log(`serving on http://${host}:${port}`);
    });
  }
})();

// Export for Vercel serverless
export default app;

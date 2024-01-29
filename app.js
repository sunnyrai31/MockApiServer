// app.js
import cors from "cors";
import express from "express";

const expressMiddleWare = (req, res, next) => {
  console.log("Middleware: This will be executed for every request.");
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  req.customProperty = "Custom Value";
  app.use(cors());
  app.use(errorHandlerMiddleware);
  next();
};
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
};

const app = express();
const port = 3000;

app.use(expressMiddleWare);

//Authentication handling in middle ware
const authenticateMiddleware = (req, res, next) => {
  // Check authentication token or session
  if (req.headers.authorization === "Bearer yourAuthToken") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Apply authentication middleware to specific routes
app.get("/protected-route", authenticateMiddleware, (req, res) => {
  res.json({ message: "Access granted!" });
});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export const stopServer = () => {
  app.close((err) => {
    if (err) {
      console.error("Error during server shutdown:", err);
      process.exit(1);
    }
    console.log("Server closed gracefully.");
    process.exit(0);
  });
};

// Handle shutdown signals
process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Closing server...");
  //   stopServer();
});

process.on("SIGTERM", () => {
  console.log("\nReceived SIGTERM. Closing server...");
  //   stopServer();
});

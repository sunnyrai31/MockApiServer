// app.js
const express = require("express");
export const app = express();
const port = 3000;

export const startServer = () => {
  app.get("/", (req, res) => {
    res.send("Hello, Express!");
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

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
  stopServer();
});

process.on("SIGTERM", () => {
  console.log("\nReceived SIGTERM. Closing server...");
  stopServer();
});

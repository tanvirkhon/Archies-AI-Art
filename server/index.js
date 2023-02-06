import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// Import MongoDB
import connectDB from "./mongodb/connect.js";

// Import Routes
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// Pull environment variable from .env file
dotenv.config();

// Initialize express application
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// First route
app.get("/", async (req, res) => {
  res.send("Hello from Archie-Ai");
});

// Run Server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server is running on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

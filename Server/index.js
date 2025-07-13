import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRouter from "./Routes/auth-router.js"
import contactRouter from "./Routes/contact-router.js"
import serviceRouter from "./Routes/service-router.js"
import salesRouter from "./Routes/sales-router.js"
import adminRouter from "./Routes/admin-router.js"
import errorMiddleware from "./middleware/error-middleware.js";
import cors from "cors"
import fetch from "node-fetch";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "https://trun-page-admin.vercel.app",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  method: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  credential: true,
};
// middlewares
app.use(cors(corsOptions))
app.options("*", cors(corsOptions)); // Enable preflight for all routes
app.use(express.json())


// routes middleware
app.use("/api/auth",authRouter)
app.use("/api/form",contactRouter)
app.use("/api/data",serviceRouter)
app.use("/api/sales",salesRouter)
app.use("/api/admin",adminRouter)

// custom middleware
app.use(errorMiddleware)

app.get("/api/download/image", async (req, res) => {
  const imageUrl = req.query.url;
  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("content-type");
    const buffer = await response.buffer();

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "attachment; filename=image.jpg");
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Failed to download image");
  }
});


app.get("/", (req, res) => {
  res.send("hello");
});

connectDB().then(() => {

  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });

});

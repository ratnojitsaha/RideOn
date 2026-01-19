import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import ratelimit   from "express-rate-limit";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";


// Initialize Express App
const app = express();

// Connect Database
await connectDB();

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 80, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})

// Middleware
app.use(cors());

app.use(express.json());
app.use("/api", limiter);

//Health route for uptime robot
app.use("/", healthRoutes);


// Routes
app.get("/", (req, res) => res.send("Server is running...🎆"));
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} => http://localhost:${PORT} 🚀`)
);

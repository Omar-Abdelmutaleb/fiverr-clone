import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import gigRoutes from "./routes/gig.route.js";
import messageRoutes from "./routes/message.route.js";
import orderRoutes from "./routes/order.route.js";
import reviewRoutes from "./routes/review.route.js";
import authRoutes from "./routes/auth.route.js";


const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true}));
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("DATABASE IS RUNNING");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/auths", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "SOMETHING WENT WRONG";
  return res.status(errorStatus).send(errorMessage); 
}) 


app.listen(3000, () => {
    connect();
  console.log("SERVER IS RUNNING");
});

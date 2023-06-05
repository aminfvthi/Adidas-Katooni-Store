import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { apiRouter } from "./routes/index.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

mongoose
  .connect("mongodb://localhost:27017/adidas-katooni-store")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("connection failed"));

app.listen(PORT, () => console.log("server started"));

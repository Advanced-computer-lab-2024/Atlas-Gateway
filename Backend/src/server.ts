import express from "express";
import { SERVER } from "./Config/config";
import connectDB from "./Database/db";
import { Types } from "mongoose";
import activityRouter from "./Routes/activity.route";

const app = express();

async function startServer() {
  app.use(express.json());
  app.use("/activity", activityRouter);
  app.listen(SERVER.port, () => {
    console.log(`Server is running on http://${SERVER.host}:${SERVER.port}`);
  });
}

connectDB();
startServer();

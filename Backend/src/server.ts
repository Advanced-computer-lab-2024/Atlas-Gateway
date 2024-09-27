import express, { Request, Response } from "express";
import { SERVER } from "./Config/config";
import connectDB from "./Database/db";
import activityRouter from "./Routes/activity.route";
import productRouter from "./Routes/product.route";

const app = express();

async function startServer() {
  {
    app.use(express.json()); // Used to parse the json dta in the body of any request

    app.listen(SERVER.port, () => {
      console.log(`Server is running on http://${SERVER.host}:${SERVER.port}`);
    });

    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(200).send("Hello");
      } catch (error) {
        res.status(400).send("How did you possibly mess this up?");
      }
    });
  }

  //Router calls
  {
    app.use("/activity", activityRouter);

    app.use("/product", productRouter);
  }
}

connectDB();
startServer();

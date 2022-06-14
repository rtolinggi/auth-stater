import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import type { CorsOptions } from "cors";
import type { Application, Request, Response } from "express";

dotenv.config();

const whiteList: string[] = ["http://localhost:3000"];
const options: CorsOptions = {
  credentials: true,
  origin(requestOrigin, callback) {
    if (whiteList.indexOf(requestOrigin as string) !== -1 || !requestOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  exposedHeaders: ["set-cookie"],
};

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});

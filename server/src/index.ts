import express from "express";
import cors from "cors";
import "dotenv/config";
import log from "./lib/log";
import { DBConnect } from "./lib/db.config";
import { AdminRouter, UserRouter, ModeratorRouter } from "./routes/routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/mod", ModeratorRouter);
app.use("/api/v1/admin", AdminRouter);

const main = async () => {
  try {
    const PORT = process.env.PORT || 8080;
    const DB_URL = process.env.MONGO_URI;
    if (!DB_URL) throw new Error("Require connection string in .env");

    await DBConnect(DB_URL).then(() => {
      log.info("DB Connected");
      app.listen(PORT, () => {
        log.info(`App Running on http://localhost:${PORT}`);
      });
    });
  } catch (error) {
    log.error(`${error}`);
  }
};

main();

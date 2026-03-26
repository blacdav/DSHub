import express, { urlencoded } from "express";
import router from "./routes";
import { dbConn } from "./db/conn";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", router);

dbConn();

export default app;
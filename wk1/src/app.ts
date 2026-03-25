import express, { urlencoded } from "express";
import router from "./routes";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", router);

export default app;
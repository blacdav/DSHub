import { configDotenv } from "dotenv";
import { DBConfig } from "../dto/db.dto";
configDotenv();

export const dbConfig: DBConfig = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    dialect: "mysql"
};
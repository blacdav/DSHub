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

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET || !process.env.JWT_RESET_SECRET) {
  throw new Error("JWT secrets are not set in environment variables.");
};

export const tokenConfig = {
    reset: process.env.JWT_RESET_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET,
    access: process.env.JWT_ACCESS_SECRET
};
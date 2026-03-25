import { configDotenv } from "dotenv";
configDotenv();

export const dbConfig = {
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    name: process.env.DB_NAME || "dshub_wk1",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
};
import { dbConfig } from "./index";

export default {
    // development: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    // }
}
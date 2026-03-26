import { Sequelize } from "sequelize";
import { dbConfig } from "../config";

export const sequelized: Sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: true
});
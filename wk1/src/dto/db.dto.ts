import { Dialect, Model, ModelStatic } from "sequelize";
import User from "../models/users.model";
import Feed from "../models/feed.model";
import MonitoringData from "../models/monitoring-data.model";
import RefreshToken from "../models/refresh-token.model";

export interface DBConfig {
  name: string;
  user: string;
  password: string;
  host: string;
  port: number;
  dialect: Dialect;
}

type ModelWithAssociate = ModelStatic<Model> & {
  associate?: (models: Models) => void;
};

export interface Models {
  User: typeof User,
  Feed: typeof Feed,
  MonitoringData: typeof MonitoringData,
  RefreshToken: typeof RefreshToken,
  // [key: string]: ModelWithAssociate;
}
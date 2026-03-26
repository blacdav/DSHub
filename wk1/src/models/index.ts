import { Models } from "../dto/db.dto";
import User from "../models/users.model";
import Feed from "../models/feed.model";
import MonitoringData from "../models/monitoring-data.model";

const models: Models = { User, Feed, MonitoringData };

Object.values(models).forEach(model => {
    if (typeof model.associate === "function") {
        model.associate(models);
    }
})

export default models;
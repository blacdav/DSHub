import { DataTypes, Model } from "sequelize";
import { Models } from "../dto/db.dto";
import { sequelized } from "../db";

class MonitoringData extends Model {
    static associate(models: Models) {
        this.belongsTo(models.Feed, {
            foreignKey: "feed_id",
            as: "feed"
        })

        this.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user"
        })
    }
}

MonitoringData.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    feed_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    humidity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    larvea_stage: {
        type: DataTypes.ENUM("egg", "larva", "pupa", "adult"),
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelized,
    modelName: "MonitoringData"
})

export default MonitoringData;
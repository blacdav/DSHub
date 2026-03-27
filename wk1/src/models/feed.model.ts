import { DataTypes, Model } from "sequelize";
import { Models } from "../dto/db.dto";
import { sequelized } from "../db";

class Feed extends Model {
    static associate(models: Models) {
        this.belongsTo(models.User, {
            foreignKey: "feed_id",
            as: "feed"
        })
    }
}

Feed.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    farmer_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    batch_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    feed_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    larvea_count: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('in-progress', 'completed'),
        allowNull: false,
        defaultValue: 'in-progress'
    }
}, {
    sequelize: sequelized
})

export default Feed;
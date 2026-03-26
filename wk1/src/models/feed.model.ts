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
    }
}, {
    sequelize: sequelized
})

export default Feed;
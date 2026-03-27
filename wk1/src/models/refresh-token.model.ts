import { DataTypes, Model } from "sequelize";
import { sequelized } from "../db/index";
import { Models } from "../dto/db.dto";

class RefreshToken extends Model {
    static associate(models: Models) {
        this.belongsTo(models.User, { foreignKey: "user_id" });
    }
}

RefreshToken.init({
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: sequelized,
    modelName: "RefreshToken",
    tableName: "refresh_tokens",
    timestamps: true
});

export default RefreshToken;
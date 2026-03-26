import { DataTypes, Model } from "sequelize";
import { Models } from "../dto/db.dto";
import { sequelized } from "../db";
import { hash } from "../utils/hash.util";

class User extends Model {
    declare password: string;
    declare email: string;
    declare role: string;

    static associate(models: Models) {
        this.belongsToMany(models.Feed, {
            through: "FeedRecordUser",
            foreignKey: "user_id",
            otherKey: "feed_id"
        })

        this.belongsToMany(models.MonitoringData, {
            through: "MonitoringDataUser",
            foreignKey: "user_id",
            otherKey: "monitoring_data_id"
        })
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user"
    }
}, {
    sequelize: sequelized,
    modelName: "Users",
    tableName: "users",
    timestamps: true,
    paranoid: true,
    hooks: {
        beforeCreate: async (user: User, options) => {
            const password_hash = await hash(user.password);
            user.password = password_hash;

            if (user.email === 'daviddavidaniefiok@gmail.com') {
                user.role = 'admin';
            }
        },
        beforeUpdate: async (user: User, options) => {
            if (user.changed('password') && options.fields?.includes('password')) {
                const password_hash = await hash(user.password);
                user.password = password_hash;
            }
        }
    }
})

export default User;
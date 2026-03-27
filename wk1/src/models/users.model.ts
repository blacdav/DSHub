import { DataTypes, Model } from "sequelize";
import { Models } from "../dto/db.dto";
import { sequelized } from "../db";
import { hash } from "../utils/hash.util";

class User extends Model {
    declare id: string;
    declare first_name: string;
    declare last_name: string;
    declare password: string;
    declare email: string;
    declare role: string;
    declare otp: string | null;
    declare token: string | null;
    declare otp_expires: Date | null;
    declare is_verified: boolean;

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
    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otp_expires: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    role: {
        type: DataTypes.ENUM("admin", "farmer"),
        allowNull: false,
        defaultValue: "farmer"
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

            const otp_hash = await hash(user.otp!);
            user.otp = otp_hash;

            if (user.email === 'daviddavidaniefiok@gmail.com') {
                user.role = 'admin';
            }
        },
        beforeUpdate: async (user: User, options) => {
            if (user.changed('password') && options.fields?.includes('password')) {
                const password_hash = await hash(user.password);
                user.password = password_hash;
            }

            if (user.changed('otp') && options.fields?.includes('otp')) {
                const otp_hash = await hash(user.otp!);
                user.otp = otp_hash;
            }
        }
    },
    defaultScope: {
        attributes: { exclude: ['password', 'token'] }
    },
    scopes: {
        withPassword: { attributes: { include: ['password'] } },
        withToken: { attributes: { include: ['token'] } }
    }
})

export default User;
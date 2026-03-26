import { sequelized } from ".";

export const dbConn = async () => {
    try {
        await sequelized.authenticate();
        console.log("Database connected successfully");
    } catch (err) {
        console.log(`Database connection failed: `, err)
        process.exit(1);
    }
}
import { RequestHandler } from "express";
import { VerifyAccessToken } from "../utils/token.util";
import { AuthUser } from "../dto/auth.dto";

export const CheckAuthUser: RequestHandler = async (req, res, next) => {
    try {
        let token;
        if (req.headers["x-client-type"] === "web") {
            token = req.cookies?.access_token;
        } else {
            token = req.headers.authorization?.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request"
            })
        }

        const decoded = await VerifyAccessToken(token);
        if (!decoded || typeof decoded !== "object") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        req.user = decoded as AuthUser;

        return next();
    } catch (err) {
        console.error(`Server Error: ${err}`);
        return res.status(500).json(`Server Error: ${err}`)
    }
}
// import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { tokenConfig } from "../config/index.js";

export const CheckAuthUser: RequestHandler = (req, res, next) => {
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

        const decoded = jwt.verify(token, tokenConfig.access);
        if (!decoded || typeof decoded !== "object") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        req.user = decoded;

        return next();
    } catch (err) {
        console.error(`Server Error: ${err}`);
        return res.status(500).json(`Server Error: ${err}`)
    }
}
import { RequestHandler } from "express";
import models from "../../models/index";
import { verifyHash } from "../../utils/hash.util";
import { GenAccessToken, GenRefreshToken } from "../../utils/token.util";

const { User } = models;

export const SignIn: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All input is required" })
    }

    try {
        let user = await User.scope("withPassword").findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const verifyPassword = await verifyHash(password, user.password);
        if (!verifyPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const refresh_token = await GenRefreshToken(user);

        user.token = refresh_token;
        await user.save()

        const access_token = GenAccessToken(user);

        if (req.headers["x-client-type"] === "web") {
            res.cookie("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: "lax"
            })

            res.cookie("refresh_token", refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: "lax"
            })

            return res.status(200).json({
                success: true,
                message: "Login Successful",
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Login Successful",
                data: {
                    access_token,
                    refresh_token
                }
            })
        }
    } catch (err) {
        console.error(`Server Error: ${err}`);
        return res.status(500).json({
            success: false,
            message: `Server Error: ${err}`
        })
    }
}
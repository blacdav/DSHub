import { RequestHandler } from "express";
import models from "../../models/index.js";

const { User } = models;

export const GetMe: RequestHandler = async (req, res) => {
    const { user_id } = req.user;

    try {
        const profile = await User.findByPk(user_id);
        if (!profile) {
            return res.status(404).json({ message: "User does not exist" });
        }

        return res.status(200).json({
            success: true,
            message: "Successful",
            data: profile
        });
    } catch (err) {
        console.error(`Server Error: ${err}`)
        return res.status(500).json({ message: `Server Error: ${err}` });
    }
}
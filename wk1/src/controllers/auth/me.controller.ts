import { RequestHandler } from "express";
import models from "../../models/index";

const { User, Feed } = models;

export const GetMe: RequestHandler = async (req, res) => {
    const { user_id } = req.user!;

    if (!user_id) {
        return res.status(401).json({
            success: false,
            message: "UnAuthorized Request"
        })
    }

    try {
        const profile = await User.findByPk(user_id, {
            include: {
                model: Feed,
                where: { user_id },
                as: "feed"
            }
        });
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
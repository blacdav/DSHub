import { RequestHandler } from "express";
import models from "../../models";

const { User } = models;

export const ResetPassword: RequestHandler = async (req, res) => {
    const { reset_token } = req.params;
    const { new_password } = req.body;

    try {
        if (!new_password || new_password.trim() === "") {
            return res.status(400).json({ message: "Please enter your new Password"})
        }

        let profile = await User.findOne({ where: { reset_token }});

        // const passwordHash = await Hash(new_password);

        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }

        profile.password = new_password;
        profile.save();

        return res.status(200).json({ message: "Password updated successfully" })
    } catch (err) {
        console.error(`Server Error: ${err}`);
        return res.status(500).json({ message: `Server Error: ${err}`})
    }
}
import { RequestHandler } from "express";
import models from "../../models/index";
import { hash } from "../../utils/hash.util";
import { Otp } from "../../utils/otp";

const { User } = models;

export const ForgottenPassword: RequestHandler = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email || email === "") {
            return res.status(400).json({ message: "Please enter your email"})
        }

        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User not found"})
        }

        const newOtp = Otp("forgotten_password");
        const newOtpHash = await hash(newOtp.code.toString());

        user.otp = newOtpHash;
        user.otp_expires = new Date(Date.now() + 5 * 60 * 1000);
        user.save();

        await otpEmail(
            user.first_name + " " + user.last_name,
            newOtp.code.toString(),
            email,
            "../emails/user_verification.html"
        );

        return res.status(200).json({
            success: true,
            message: "An OTP has been sent to your email",
        })
    } catch (err) {
        console.error(`Server Error: ${err}`);
        return res.status(500).json({ message: `Server Error: ${err}`})
    }
}
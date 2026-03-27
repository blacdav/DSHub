import { RequestHandler } from "express";
import models from "../../models";
import { Otp } from "../../utils/otp";
import { Email } from "../../utils/send-email.util";

const { User } = models;

export const ResendOtp: RequestHandler = async (req, res, next) => {
    const { email } = req.body;

    try {
        const otp = Otp("resend_otp");
        
        let user = await User.findOne({ where: { email }});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User was not found"
            })
        }

        user.otp = otp.code.toString();
        user.otp_expires = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        await Email(user, otp.code.toString(), email, "../emails/user_verification.html");

        return res.status(200).json({
            success: true,
            message: "An Otp has been sent to your email"
        });
    } catch (err) {
        return next(err)
    }
}
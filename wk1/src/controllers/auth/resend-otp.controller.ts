import { Otp } from "../../utils/otp.js";
import User from "../../models/users.model.js";
import { otpEmail } from "../../utils/otpEmail.util.js";
import { RequestHandler } from "express";

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
        await user.save()

        await otpEmail(
            user.first_name + " " + user.last_name,
            Number(otp.code),
            email,
            "../emails/user_verification.html"
        )

        return res.status(200).json({
            success: true,
            message: "An Otp has been sent to your email"
        })
    } catch (err) {
        return next(err)
    }
}
import { RequestHandler } from 'express';
import models from '../../models/index';
import { sequelized } from '../../db/index';
import { Otp } from '../../utils/otp';
import { Email } from '../../utils/send-email.util';
import { GenAccessToken } from '../../utils/token.util';

const { User } = models;

export const SignUp: RequestHandler = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    const t = await sequelized.transaction();
    
    try {
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Input field is required!"
            })
        }

        let user = await User.findOne({ where: { email }});
        const newOtp = Otp("account_verification");

        if (!user) {
            user = await User.create({
                first_name,
                last_name,
                email,
                password,
                otp: newOtp.code.toString(),
                otp_expires: new Date(Date.now() + 5 * 60 * 1000),
                is_verified: false
            }, { transaction: t });
        } else if (!user.is_verified) {
            user.first_name = first_name;
            user.last_name = last_name;
            user.password = password.toString();
            user.otp = newOtp.code.toString();
            user.otp_expires = new Date(Date.now() + 5 * 60 * 1000);
            await user.save();
        } else {
            return res.status(400).json({
                success: false,
                message: "Email has already been used"
            });
        }

        await Email(user, newOtp.code.toString(), email, "../emails/user_verification.html")

        const access_token = GenAccessToken(user);

        if (req.headers["x-client-type"] === "web") {
            res.cookie("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: "strict"
            });

            return res.status(200).json({
                success: true,
                message: "An OTP has been sent to your email",
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "An OTP has been sent to your email",
                // access_token,
                otp_type: newOtp.otp_type,
            });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({ message: `Internal Server Error: ${err}`})
    }
}
import { RequestHandler } from "express";
import models from "../../models";
import { verifyHash } from "../../utils/hash.util";
import { GenResetToken } from "../../utils/token.util";

const { User } = models;

export const VerifyOtp: RequestHandler = async (req, res) => {
    const { email, otp, otp_type } = req.body;

    try {
        if (!otp || otp === "" || !otp_type) {
            return res.status(400).json({
                success: false,
                message: "All Input field is required!"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required!"
            });
        }

        let profile = await User.findOne({ where: { email } });
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: "Email not found!"
            });
        }

        if (otp_type === "account_verification" && profile.is_verified === true) {
            return res.status(400).json({
                success: false,
                message: "Email has already been verified"
            })
        }

        if (!profile.otp_expires || profile.otp_expires < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        const verifyOtp = await verifyHash(otp, profile.otp!);
        if (!verifyOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (otp_type === "account_verification" && !profile.is_verified) {
            profile.is_verified = true;
            profile.otp = null;
            profile.otp_expires = null;
            await profile.save();
        }

        if (otp_type === "forgotten_password") {
            const reset_token = GenResetToken(profile);

            if (req.headers["x-client-type"] === "web") {
                res.cookie("reset_token", reset_token, {
                    httpOnly: true,
                    secure: false, // would change to true b4 prod
                    sameSite: "strict"
                });
    
                return res.status(200).json({
                    success: true,
                    message: "OTP Verified",
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "OTP Verified",
                    reset_token
                })
            }
        }

        return res.status(200).json({
            success: true,
            message: "OTP Verified",
            otp_type
        });
    } catch (err) {
        console.error(`Server Error: ${err}`)
        return res.status(500).json({ message: `Server Error: ${err}` });
    }
}
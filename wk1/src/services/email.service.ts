import nodemailer from "nodemailer"
import { emailConfig } from "../config";

export const SendEmail = async ({ email, title, html }: { email: string, title: string, html: string }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: emailConfig.email,
            pass: emailConfig.pass
        }
    });

    const mailOptions = {
        from: emailConfig.email,
        to: email,
        subject: title,
        html
    }

    try {
        await transporter.sendMail(mailOptions)
        return true;
    } catch (err) {
        console.error(err);
        return err
    }
}
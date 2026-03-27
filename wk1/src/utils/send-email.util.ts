import fs from "node:fs";
import * as path from "node:path";
// import { fileURLToPath } from "node:url"; // removed because of ESM errors
import { SendEmail } from "../services/email.service";
import User from "../models/users.model";

// const __dirname = path.dirname(fileURLToPath(import.meta.url)); // removed because of ESM errors

export const Email = async (user: User, code: string, email: string, template_path: string) => {
    const template = fs.readFileSync(
        path.join(__dirname, template_path),
        "utf-8"
    )
    const msg = template
                    .replace("{{user_name}}", user.first_name + " " + user.last_name)
                    .replace("{{otp}}", code.toString());

    const emailData = {
        email,
        title: "OTP Verification",
        html: msg
    }

    await SendEmail(emailData);
}
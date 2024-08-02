import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { signToken } from "@/src/domains/_app/utils/auth.js";
import {
    begin,
    commit,
    rollback,
    // release,
    // connect,
} from "@/src/application/db/db.js";
import { newUser, getUserByEmail } from "@/src/application/db/utils/user.js";
import { createNewUserSettings } from "@/src/application/db/utils/settings.js";

export default async function createUser(client, name, email, password) {
    try {
        await begin(client);

        // Check if email already exists
        const existingEmail = await getUserByEmail(client, email);
        if (emailCheckResult.rowCount > 0) {
            throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = signToken(email);

        // register new user
        const response = await newUser(
            client,
            name,
            email,
            hashedPassword,
            verificationToken
        );
        let user = response.rows[0];
        await createNewUserSettings(client, user.id);

        // Send verification email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your email",
            text: `Please verify your email by clicking the link: ${process.env.BASE_URL}/verify/${verificationToken}`,
        };

        await transporter.sendMail(mailOptions);

        await commit(client);
        return user;
    } catch (err) {
        await rollback(client);
        throw err;
    }
}

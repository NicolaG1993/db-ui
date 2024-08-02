import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { signTokenShort } from "@/src/domains/_app/utils/auth.js";
import nodemailer from "nodemailer";
import {
    getUserByEmail,
    setUserPasswordToken,
} from "@/src/application/db/utils/user.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;
        const client = await connect();

        try {
            await begin(client);
            let result = await getUserByEmail(client, email);

            if (result.rowCount === 0) {
                return res.status(400).json({ error: "Email not found" });
            }

            const token = signTokenShort(email);

            await setUserPasswordToken(
                client,
                token,
                new Date(Date.now() + 3600000),
                email
            );

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
                subject: "Password reset",
                text: `Please reset your password by clicking the link: ${process.env.BASE_URL}/reset/${token}`,
            };

            await transporter.sendMail(mailOptions);

            await commit(client);
            res.status(200).json({ message: "Password reset email sent" });
        } catch (error) {
            await rollback(client);
            res.status(500).json({ error: error.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

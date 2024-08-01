import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const { token } = req.query;
    const { psw } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const myQuery = `SELECT * FROM users WHERE email = $1 AND password_reset_token = $2 AND password_reset_expires > $3`;
        const result = await db.query(myQuery, [email, token, new Date()]);

        if (result.rowCount === 0) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(psw, 10);
        const updateQuery = `UPDATE users SET psw = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE email = $2`;
        await db.query(updateQuery, [hashedPassword, email]);

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
}

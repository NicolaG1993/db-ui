import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { selectUserToResetPsw } from "@/src/application/db/utils/user.js";

export default async function handler(req, res) {
    // METHOD CHECK MISSING 🔴
    const { token } = req.query;
    const { psw } = req.body; // rename to "password" ? 🧠
    const client = await connect();
    try {
        await begin(client);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const result = await selectUserToResetPsw(
            client,
            email,
            token,
            new Date()
        );

        if (result.rowCount === 0) {
            throw new Error("Invalid or expired token");
        }

        const hashedPassword = await bcrypt.hash(psw, 10);
        await resetUserPassword(client, hashedPassword, email);

        await commit(client);
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        await rollback(client);
        res.status(400).json({ error: "Invalid or expired token" });
    } finally {
        release(client);
    }
}

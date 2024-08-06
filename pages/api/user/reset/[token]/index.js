import bcrypt from "bcryptjs";
import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import {
    selectUserToResetPsw,
    resetUserPassword,
} from "@/src/application/db/utils/user.js";
import { verifyToken } from "@/src/domains/_app/utils/auth";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { token } = req.query;
        const { psw } = req.body;
        console.log("1. api/user/reset/: ", { token, psw });
        const client = await connect();
        try {
            await begin(client);

            const decoded = verifyToken(token);
            const { email } = decoded;

            const result = await selectUserToResetPsw(
                client,
                email,
                token,
                new Date()
            );
            // console.log("2. api/user/reset/: ", {
            //     decoded,
            //     result: result.rows[0],
            // });

            if (result.rowCount === 0) {
                // throw new Error("Invalid or expired token");
                // We need to report all this kind of errors in UI 🧠🔴
                res.status(400).json({
                    error: "Invalid or expired token",
                    code: "INVALID_TOKEN",
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(psw, 10);
            await resetUserPassword(client, hashedPassword, email);

            // console.log("3. api/user/reset/: ", {
            //     hashedPassword,
            //     result: result.rows[0],
            // });

            await commit(client);
            res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            await rollback(client);
            res.status(400).json({ error: "Invalid or expired token" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

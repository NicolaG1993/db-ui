import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { verifyToken } from "@/src/domains/_app/utils/auth.js";
import { verifyUserEmail } from "@/src/application/db/utils/user.js";

export default async function handler(req, res) {
    // METHOD CHECK MISSING 🔴
    const { token } = req.query;
    const client = await connect();
    try {
        await begin(client);

        const decoded = verifyToken(token);
        const { email } = decoded;

        const result = await verifyUserEmail(client, email);

        if (result.rowCount === 0) {
            throw new Error("Invalid token");
        }

        await commit(client);
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        await rollback(client);
        res.status(400).json({ error: "Invalid or expired token" });
    } finally {
        release(client);
    }
}

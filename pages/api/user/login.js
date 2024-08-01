import bcrypt from "bcryptjs";
import { signToken } from "@/src/domains/_app/utils/auth.js";
import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getUserByEmail } from "@/src/application/db/utils/user.js";

export default async function handler(req, res) {
    const { body, method } = req;

    if (method === "POST") {
        const { email, password } = body;
        const client = await connect();

        try {
            await begin(client);
            let result = await getUserByEmail(client, email);

            if (result.rowCount === 0) {
                throw new Error("Invalid email or password");
            }

            const user = result.rows[0];

            if (!user.email_verified) {
                throw new Error("Email not verified");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid email or password");
            }

            const token = signToken({ id: user.id, isAdmin: user.isAdmin });
            ///////

            await commit(client);
            res.status(200).json({ token });
        } catch (err) {
            await rollback(client);
            res.status(400).json({ error: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

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
            // console.log("api/user/login USER: ", result.rows[0]);

            if (result.rowCount === 0) {
                throw new Error("Invalid email or password");
            }

            const user = result.rows[0];

            if (!user.email_verified) {
                // throw new Error("Email not verified");
                res.status(400).json({
                    error: "Email not verified",
                    code: "EMAIL_NOT_VERIFIED",
                });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.psw);

            if (!isMatch) {
                throw new Error("Invalid email or password");
            }

            const token = signToken({
                id: user.id,
                isAdmin: user.is_admin,
            });

            await commit(client);

            // Remove sensitive information before sending the user data
            delete user.psw;

            res.status(200).json({ ...user, token });
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

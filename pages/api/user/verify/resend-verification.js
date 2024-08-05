import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import {
    checkUserByEmail,
    // getUserByVerificationToken,
    setUserNewVerificationToken,
} from "@/src/application/db/utils/user.js";
import { signToken, verifyToken } from "@/src/domains/_app/utils/auth";
import sendVerificationEmail from "@/src/domains/_app/components/Auth/utils/sendVerificationEmail";

export default async function handler(req, res) {
    if (req.method === "POST") {
        /*
         const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: "Invalid or missing token" });
        }
        */

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is missing" });
        }

        const client = await connect();
        try {
            await begin(client);

            const result = await checkUserByEmail(client, email);

            /*
            const decoded = verifyToken(token);
            const email = decoded.email;
            const id = decoded.id;
            const result = await getUserByVerificationToken(client, token);
            */

            if (result.rowCount === 0) {
                res.status(404).json({
                    error: "No user found for this email",
                    code: "EMAIL_NOT_FOUND",
                });

                throw new Error("No user found for this email");
            }
            const user = result.rows[0];

            // Create new token
            const newToken = signToken(email);

            // Update "verification_token" in db "users" table
            await setUserNewVerificationToken(client, newToken, user.id);

            // Re-send verification email
            await sendVerificationEmail(email, newToken);

            await commit(client);

            res.status(200).json({
                message: "Verification email resent successfully",
            });
        } catch (error) {
            await rollback(client);
            res.status(400).json({ error: error.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

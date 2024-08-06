import { release, connect } from "@/src/application/db/db.js";
import createUser from "@/src/domains/user/utils/createUser";
import mapUserRawToUser from "@/src/domains/user/utils/mapUserRawToUser";

export default async function handler(req, res) {
    const { body, method } = req;
    if (method === "POST") {
        const { name, email, password } = body;
        const client = await connect();
        try {
            const rawUser = await createUser(client, name, email, password);
            const mappedUser = mapUserRawToUser(rawUser);
            res.status(200).json({ user: mappedUser });
        } catch (err) {
            if (err.message === "Email already in use") {
                res.status(404).json({
                    error: err.message,
                    code: "EMAIL_NOT_AVAILABLE",
                });
            } else {
                res.status(500).json({ error: err.message });
            }
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

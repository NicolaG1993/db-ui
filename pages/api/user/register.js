import {
    // begin,
    // commit,
    // rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import createUser from "@/src/domains/user/utils/createUser";
import mapUserRawToUser from "@/src/domains/user/utils/mapUserRawToUser";

export default async function handler(req, res) {
    const { body, method } = req;
    if (method === "POST") {
        const { name, email, password } = body;
        const client = await connect();
        try {
            const user = await createUser(client, name, email, password);
            const mappedUser = mapUserRawToUser(user);
            res.status(200).json({ user: mappedUser });
        } catch (err) {
            res.status(500).json({ error: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
map;

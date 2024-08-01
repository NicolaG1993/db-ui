import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getUserSettings } from "@/src/application/db/utils/settings.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;
        const client = await connect();

        try {
            await begin(client);
            const result = await getUserSettings(client, id);
            console.log("result: ", result);
            await commit(client);
            res.status(200).json(result.rows[0]);
        } catch (err) {
            await rollback(client);
            res.status(500).json({ error: "Internal Server Error" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

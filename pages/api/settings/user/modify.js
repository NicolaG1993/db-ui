import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { updateUserSettings } from "@/src/application/db/utils/settings.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { userId, showScrollbars, theme } = req.body;
        const client = await connect();

        try {
            await begin(client);
            await updateUserSettings(client, userId, showScrollbars, theme);
            await commit(client);
            res.status(200).json({ message: "Settings updated successfully" });
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

import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { deleteColumn } from "@/src/application/db/utils/utils.js";

export default async function handler(req, res) {
    if (req.method === "DELETE") {
        const { id } = req.body;
        const client = await connect();
        try {
            await begin(client);
            await deleteColumn(
                client,
                Number(id),
                "movie_playlist",
                "playlistID"
            );
            const { rows } = await deleteColumn(
                client,
                Number(id),
                "playlist",
                "id"
            );
            await commit(client);
            res.status(200).json(rows[0]);
        } catch (err) {
            await rollback(client);
            console.log("ERROR!", err);
            return res.status(500).json({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

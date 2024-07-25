import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import { getAllPlaylistsWithInfos } from "@/src/application/db/utils/playlist.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            let { str, user } = req.query;
            const { rows } = await getAllPlaylistsWithInfos(client, str, user);
            await commit(client);
            res.status(200).send(rows);
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(401).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

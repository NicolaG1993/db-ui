import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getPlaylistWithInfos } from "@/src/application/db/utils/playlist.js";
import { mapPlaylistRawToPlaylist } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id, user } = req.query;
        const client = await connect();
        try {
            await begin(client);
            // GET PLAYLIST
            let { rows } = await getPlaylistWithInfos(
                client,
                Number(id),
                Number(user)
            );
            await commit(client);

            const mappedData = mapPlaylistRawToPlaylist(rows[0]);

            res.status(200).json(mappedData);
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

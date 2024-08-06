import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllPlaylistsWithInfos } from "@/src/application/db/utils/playlist.js";
import mapPlaylistsRawToPlaylists from "@/src/domains/playlists/utils/mapPlaylistsRawToPlaylists";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            let { str, user } = req.query;
            const { rows } = await getAllPlaylistsWithInfos(client, str, user);
            const mappedPlaylists = mapPlaylistsRawToPlaylists(rows);
            await commit(client);
            res.status(200).send(mappedPlaylists);
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(500).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

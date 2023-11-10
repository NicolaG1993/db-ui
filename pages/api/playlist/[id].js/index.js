import { getPlaylistWithInfos } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        // GET PLAYLIST
        let { rows } = await getPlaylistWithInfos(Number(id));
        console.log("rows: ", rows[0]);

        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

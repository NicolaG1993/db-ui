import { deleteRecord } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const { id } = req.body;
    try {
        await deleteRecord(Number(id), "movie_playlist", "playlistID");
        const { rows } = await deleteRecord(Number(id), "playlist", "id");
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

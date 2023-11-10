import { getAllPlaylistsWithInfos } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    try {
        const { rows } = await getAllPlaylistsWithInfos("");
        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

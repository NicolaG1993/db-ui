import { getStudioByID } from "@/src/application/db/db.js";
import { mapStudioRawToStudio } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        let { rows } = await getStudioByID(Number(id));
        let studio = mapStudioRawToStudio(rows[0]);
        res.status(200).json(studio);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

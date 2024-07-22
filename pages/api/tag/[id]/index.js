import { getTagByID } from "@/src/application/db/db.js";
import { mapTagRawToTag } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        let { rows } = await getTagByID(Number(id));
        let tag = mapTagRawToTag(rows[0]);
        res.status(200).json(tag);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

import { getCategoryByID } from "@/src/application/db/db.js";
import { mapCategoryRawToCategory } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        let { rows } = await getCategoryByID(Number(id));
        let category = mapCategoryRawToCategory(rows[0]);
        res.status(200).json(category);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

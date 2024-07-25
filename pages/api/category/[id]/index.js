import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import { getCategoryByID } from "@/src/application/db/utils/item.js";
import { mapCategoryRawToCategory } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        const { id } = req.query;
        try {
            await begin(client);
            let { rows } = await getCategoryByID(client, Number(id));
            await commit(client);
            let category = mapCategoryRawToCategory(rows[0]);
            res.status(200).json(category);
        } catch (err) {
            await rollback(client);
            return res.status(500).json({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

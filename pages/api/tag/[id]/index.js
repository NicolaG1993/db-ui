import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getTagByID } from "@/src/application/db/utils/item.js";
import { mapTagRawToTag } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;
        const client = await connect();
        try {
            await begin(client);
            let { rows } = await getTagByID(client, Number(id));
            await commit(client);
            let tag = mapTagRawToTag(rows[0]);
            res.status(200).json(tag);
        } catch (err) {
            await rollback(client);
            return res.status(500).send({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

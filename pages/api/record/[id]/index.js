import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getRecordByID } from "@/src/application/db/utils/record.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;
        const client = await connect();
        try {
            await begin(client);
            let { rows } = await getRecordByID(client, Number(id));
            await commit(client);
            // console.log("ROWS!", rows);
            res.status(200).json(rows);
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

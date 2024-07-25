import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { newRecord } from "@/src/application/db/utils/record.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        let { id } = req.body;
        const client = await connect();
        try {
            await begin(client);
            const { rows } = await newRecord(client, id);
            await commit(client);
            console.log("COMPLETED!!", rows[0]);
            res.status(200).json(rows[0]);
        } catch (err) {
            await rollback(client);
            console.log("ERROR!!", err);
            res.status(500).send({
                message: ["Error updating on the server"],
                error: err,
            });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

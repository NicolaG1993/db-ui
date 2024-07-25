import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getActorByID } from "@/src/application/db/utils/item.js";
import { mapActorRawToActor } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;
        const client = await connect();
        try {
            await begin(client);
            let { rows } = await getActorByID(client, Number(id));
            // if (rows?.length) {
            await commit(client);

            let actor = mapActorRawToActor(rows[0]);

            res.status(200).json(actor);
            // } else {
            //     res.status(404).json({ message: "Actor not found" });
            //     // 🧠 forse 404 ritorna lo stesso senza questa condition 🧠
            // }
        } catch (err) {
            await rollback(client);
            console.log("ERROR!!", err);
            return res.status(err.code).json({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

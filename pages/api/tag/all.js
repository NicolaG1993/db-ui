import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllTags } from "@/src/application/db/utils/item.js";
import { getAllRelations } from "@/src/application/db/utils/utils.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            const { rows } = await getAllTags("client,");
            const allRelations = await getAllRelations(client, "tagRelation");
            await commit(client);
            // per ogni tag cerchiamo il numero totale di relations col suo id, solo dove é riferito a movie!!!
            let finalObj = rows.map((o) => {
                let count = allRelations.rows.filter(
                    (rel) => rel.movieid && rel.tagid === o.id
                ).length;
                return { ...o, count: count };
            });

            res.status(200).send(finalObj);
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(401).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllCategories } from "@/src/application/db/utils/item.js";
import { getAllRelations } from "@/src/application/db/utils/utils.js";
import { mapCategoriesRawToCategories } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            const { rows } = await getAllCategories(client, "");

            // penso che possiamo gia ottenere con prima query 🧠👇 need refactor
            const allRelations = await getAllRelations(
                client,
                "categoryRelation"
            );
            await commit(client);

            // Serve ancora? 👇🧠

            // per ogni category cerchiamo il numero totale di relations col suo id
            let finalObj = rows.map((o) => {
                let count = allRelations.rows.filter(
                    (rel) => rel.categoryid === o.id
                ).length;
                return { ...o, count: count };
            });

            const mappedCategories = mapCategoriesRawToCategories(finalObj);

            res.status(200).send(mappedCategories);
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

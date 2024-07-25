import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import { getAllCategories } from "@/src/application/db/utils/item.js";
import { getAllRelations } from "@/src/application/db/utils/utils.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            const { rows } = await getAllCategories(client, "");
            const allRelations = await getAllRelations(
                client,
                "categoryRelation"
            );
            await commit(client);
            // per ogni category cerchiamo il numero totale di relations col suo id
            let finalObj = rows.map((o) => {
                let count = allRelations.rows.filter(
                    (rel) => rel.categoryid === o.id
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

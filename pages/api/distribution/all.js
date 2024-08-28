import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllDistributions } from "@/src/application/db/utils/item.js";
import { getAllRelations } from "@/src/application/db/utils/utils.js";
import { mapDistributionsRawToDistributions } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            const { rows } = await getAllDistributions(client, "");
            const allRelations = await getAllRelations(
                client,
                "movie_distribution"
            );

            let finalObj = rows.map((o) => {
                let count = allRelations.rows.filter(
                    (rel) => rel.studioid === o.id
                ).length;
                return { ...o, count: count };
            });
            await commit(client);

            const mappedDistributions =
                mapDistributionsRawToDistributions(finalObj);

            res.status(200).send(mappedDistributions);
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(401).send({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import {
    getCategoryMoviesPage,
    getTagMoviesPage,
    getActorMoviesPage,
    getStudioMoviesPage,
    getDistributionMoviesPage,
} from "@/src/application/db/utils/item.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            let {
                itemId,
                itemLabel,
                // relationsLabel,
                direction,
                order,
                limit,
                offset,
            } = req.query;

            if (itemLabel === "category") {
                const { rows } = await getCategoryMoviesPage(
                    client,
                    itemId,
                    direction,
                    order,
                    limit,
                    offset
                );
                res.status(200).send(rows);
            } else if (itemLabel === "tag") {
                const { rows } = await getTagMoviesPage(
                    client,
                    itemId,
                    direction,
                    order,
                    limit,
                    offset
                );
                res.status(200).send(rows);
            } else if (itemLabel === "studio") {
                const { rows } = await getStudioMoviesPage(
                    client,
                    itemId,
                    direction,
                    order,
                    limit,
                    offset
                );
                res.status(200).send(rows);
            } else if (itemLabel === "distribution") {
                const { rows } = await getDistributionMoviesPage(
                    client,
                    itemId,
                    direction,
                    order,
                    limit,
                    offset
                );
                res.status(200).send(rows);
            } else if (itemLabel === "actor") {
                const { rows } = await getActorMoviesPage(
                    client,
                    itemId,
                    direction,
                    order,
                    limit,
                    offset
                );
                await commit(client);
                res.status(200).send(rows);
            }
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(500).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

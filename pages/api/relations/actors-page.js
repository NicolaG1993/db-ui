import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getMovieActorsPage } from "@/src/application/db/utils/item.js";

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

            if (itemLabel === "movie") {
                const { rows } = await getMovieActorsPage(
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
            res.status(401).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

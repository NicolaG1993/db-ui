import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllActorsWithInfos } from "@/src/application/db/utils/item.js";
import { mapActorsRawToActors } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            let { str, page, step, order } = req.query;
            let offset = 0;
            let orderString = "actor.name ASC";

            if (!str) {
                str = "";
            }

            if ((page, step, order)) {
                offset = step * (page - 1);

                if (order === "name") {
                    orderString = "actor.name ASC";
                }
                if (order === "name_reversed") {
                    orderString = "actor.name DESC";
                }
                if (order === "rating") {
                    orderString = "actor.rating DESC";
                }
                if (order === "rating_reversed") {
                    orderString = "actor.rating ASC";
                }
                if (order === "birthday") {
                    orderString = "actor.birthday DESC";
                }
                if (order === "birthday_reversed") {
                    orderString = "actor.birthday ASC";
                }
                if (order === "movies") {
                    orderString = "actor.name ASC";
                }
                if (order === "movies_reversed") {
                    orderString = "actor.name ASC";
                }
                // questi valori si potrebbero settare in un file separato, sia valori che fn x if
            }

            const { rows } = await getAllActorsWithInfos(
                client,
                str,
                Number(step),
                Number(offset),
                orderString
            );
            await commit(client);
            const mappedActors = mapActorsRawToActors(rows);
            res.status(200).send(mappedActors);
        } catch (err) {
            await rollback(client);
            console.error(err);
            res.status(401).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

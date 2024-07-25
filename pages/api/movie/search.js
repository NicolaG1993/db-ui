// import { searchMovies } from "@/src/application/db/db.js";

import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { filterAllActorsWithInfos } from "@/src/application/db/utils/item.js";
import { deleteJSONEmptyArrays } from "@/src/application/utils/parsers";
// import { search } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            let { str, filters, page, step, order } = req.query;
            let offset = 0;
            let orderString = "movie.created_at DESC";

            if ((page, step, order, filters)) {
                offset = step * (page - 1);

                if (order === "latest") {
                    orderString = "movie.created_at DESC";
                }
                if (order === "olders") {
                    orderString = "movie.created_at ASC";
                }
                if (order === "rating") {
                    orderString = "movie.rating DESC";
                }
                if (order === "rating_reversed") {
                    orderString = "movie.rating ASC";
                }
                if (order === "title") {
                    orderString = "movie.title ASC";
                }
                if (order === "title_reversed") {
                    orderString = "movie.title DESC";
                }
                // ...
                // questi valori si potrebbero settare in un file separato, sia valori che fn x if

                if (!str) {
                    str = "";
                }

                // parse filters
                if (filters) {
                    filters = deleteJSONEmptyArrays(filters);
                }
                let { actors, categories, tags, studios, distribution } =
                    filters;

                // 🧠 🧠 🧠 questa fn nemmeno esiste?!?!?
                const { rows } = await filterAllActorsWithInfos(
                    client,
                    str,
                    Number(step),
                    Number(offset),
                    orderString,
                    tags
                );
                await commit(client);
                res.status(200).send(rows);
            }
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

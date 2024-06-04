// import { searchMovies } from "@/src/application/db/db.js";
import { getAllMoviesWithInfos } from "@/src/application/db/db.js";
import { deleteJSONEmptyArrays } from "@/src/application/utils/parsers";
// import { search } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    try {
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
            let { actors, categories, tags, studios, distribution } = filters;

            // 🧠 🧠 🧠 questa fn nemmeno esiste?!?!?
            const { rows } = await filterAllActorsWithInfos(
                str,
                Number(step),
                Number(offset),
                orderString,
                tags
            );

            res.status(200).send(rows);
        }
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err.message });
    }
}

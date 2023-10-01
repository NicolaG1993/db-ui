// import { searchMovies } from "@/utils/db/db";
import { getAllMoviesWithInfos } from "@/utils/db/db";
import { filtersParser } from "@/utils/parsers";
// import { search } from "@/utils/db/db";

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
                filters = filtersParser(filters);
            }
            let { actors, categories, tags, studios, distribution } = filters;

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

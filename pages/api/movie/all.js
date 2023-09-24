import { getAllMoviesWithInfos } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let { str, page, step, order } = req.query;
        let offset = 0;
        let orderString = "movie.created_at DESC";

        if (!str) {
            str = "";
        }

        if ((page, step, order)) {
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
        }

        const { rows } = await getAllMoviesWithInfos(
            str,
            Number(step),
            Number(offset),
            orderString
        );
        res.status(200).send(rows);
    } catch (err) {
        console.error(err);
        res.status(401).send({ message: "ERROR" });
    }
}

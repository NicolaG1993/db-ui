import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllMoviesWithInfos } from "@/src/application/db/utils/item.js";
import { mapMoviesRawToMovies } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();

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

            await begin(client);
            const { rows } = await getAllMoviesWithInfos(
                client,
                str,
                Number(step),
                Number(offset),
                orderString
            );
            console.log("🎃⛽👉 getAllMoviesWithInfos rows: ", rows);
            await commit(client);
            const mappedMovies = mapMoviesRawToMovies(rows);
            res.status(200).send(mappedMovies);
        } catch (err) {
            await rollback(client);
            console.error(err);
            res.status(500).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

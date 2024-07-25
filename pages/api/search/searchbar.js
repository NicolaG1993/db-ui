import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import {
    getAllActorsWithInfos,
    getAllMoviesWithInfos,
} from "@/src/application/db/utils/item.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        let { str } = req.query;
        console.log("QUERY: ", str);
        const client = await connect();
        try {
            await begin(client);
            const actors = await getAllActorsWithInfos(
                client,
                str,
                10,
                0,
                "actor.name ASC"
            );
            const movies = await getAllMoviesWithInfos(
                client,
                str,
                10,
                0,
                "movie.title ASC"
            );
            await commit(client);
            res.status(200).send({ groupA: actors.rows, groupB: movies.rows });
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

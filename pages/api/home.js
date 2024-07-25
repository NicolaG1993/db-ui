import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import {
    getAllActorsWithInfos,
    getAllMoviesWithInfos,
} from "@/src/application/db/utils/item.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            const actors = await getAllActorsWithInfos(
                client,
                "",
                6,
                0,
                "actor.created_at DESC"
            );
            const movies = await getAllMoviesWithInfos(
                client,
                "",
                6,
                0,
                "movie.created_at DESC"
            );
            await commit(client);
            res.status(200).send({ groupA: actors.rows, groupB: movies.rows });
        } catch (err) {
            await rollback(client);
            res.status(err.code).send({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

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
import {
    mapActorsRawToActors,
    mapMoviesRawToMovies,
} from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            // This part needs to become flexible 👇🧠
            // Also this response raw objects are not matching the ones from other requests 👇👇🧠
            const actors = await getAllActorsWithInfos(
                client,
                "",
                6,
                0,
                "actor.created_at DESC"
            );
            console.log("🧑‍🏭 actors: ", actors.rows);
            const mappedActors = mapActorsRawToActors(actors.rows);

            const movies = await getAllMoviesWithInfos(
                client,
                "",
                6,
                0,
                "movie.created_at DESC"
            );
            const mappedMovies = mapMoviesRawToMovies(movies.rows);

            await commit(client);
            res.status(200).send({
                groupA: mappedActors,
                groupB: mappedMovies,
            });
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

import {
    getAllActorsWithInfos,
    getAllMoviesWithInfos,
} from "@/src/application/db/db.js";

export default async function handler(req, res) {
    try {
        const actors = await getAllActorsWithInfos(
            "",
            6,
            0,
            "actor.created_at DESC"
        );
        const movies = await getAllMoviesWithInfos(
            "",
            6,
            0,
            "movie.created_at DESC"
        );
        res.status(200).send({ groupA: actors.rows, groupB: movies.rows });
    } catch (err) {
        res.status(err.code).send({ message: err.message });
    }
}

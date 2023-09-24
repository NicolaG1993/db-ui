import { getAllActorsWithInfos, getAllMoviesWithInfos } from "@/utils/db/db";

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
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

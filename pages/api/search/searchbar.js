import {
    getAllActorsWithInfos,
    getAllMoviesWithInfos,
} from "@src/application/db/db.js";

export default async function handler(req, res) {
    let { str } = req.query;
    console.log("QUERY: ", str);
    try {
        const actors = await getAllActorsWithInfos(
            str,
            10,
            0,
            "actor.name ASC"
        );
        const movies = await getAllMoviesWithInfos(
            str,
            10,
            0,
            "movie.title ASC"
        );
        res.status(200).send({ groupA: actors.rows, groupB: movies.rows });
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

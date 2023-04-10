import { getAllActorsWithInfos, getAllMoviesWithInfos } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        const actors = await getAllActorsWithInfos("");
        const movies = await getAllMoviesWithInfos("");
        res.status(200).send({ groupA: actors.rows, groupB: movies.rows });
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

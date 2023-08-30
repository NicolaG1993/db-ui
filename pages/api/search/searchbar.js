import { getAllActorsWithInfos, getAllMoviesWithInfos } from "@/utils/db/db";

export default async function handler(req, res) {
    let { str } = req.query;
    console.log("QUERY: ", str);
    try {
        const actors = await getAllActorsWithInfos(str);
        const movies = await getAllMoviesWithInfos(str);
        res.status(200).send({ groupA: actors.rows, groupB: movies.rows });
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

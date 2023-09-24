import { getAllMoviesWithInfos } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        const { rows } = await getAllMoviesWithInfos(
            "",
            500,
            0,
            "movie.title ASC"
        );
        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

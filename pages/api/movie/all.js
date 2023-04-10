import { getAllMoviesWithInfos } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        const { rows } = await getAllMoviesWithInfos("");
        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

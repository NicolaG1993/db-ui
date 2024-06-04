import { getAllMoviesWithInfosByIDS } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const { ids } = req.query; // we could add more filters to this - but only optional filters! - NO breaking changes
    try {
        const { rows } = await getAllMoviesWithInfosByIDS(JSON.parse(ids));
        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err.message });
    }
}

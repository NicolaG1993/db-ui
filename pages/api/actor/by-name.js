import { getAllActorsWithInfosByNames } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    let { items } = req.query;

    try {
        const { rows } = await getAllActorsWithInfosByNames(
            JSON.parse(req.query.items)
        );
        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err.message });
    }
}

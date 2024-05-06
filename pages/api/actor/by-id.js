import { getAllActorsWithInfosByIDS } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    let { items } = req.query;
    try {
        const { rows } = await getAllActorsWithInfosByIDS(
            // JSON.parse(req.query.items)
            JSON.parse(items)
        );
        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err.message });
    }
}

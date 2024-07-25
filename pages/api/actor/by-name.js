import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import { getAllActorsWithInfosByNames } from "@/src/application/db/utils/item.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        // let { items } = req.query;

        try {
            await begin(client);
            const { rows } = await getAllActorsWithInfosByNames(
                client,
                JSON.parse(req.query.items)
            );
            await commit(client);
            res.status(200).send(rows);
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(401).send({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

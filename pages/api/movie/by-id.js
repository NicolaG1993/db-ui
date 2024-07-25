import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import { getAllMoviesWithInfosByIDS } from "@/src/application/db/utils/item.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { ids } = req.query; // we could add more filters to this - but only optional filters! - NO breaking changes
        const client = await connect();
        try {
            await begin(client);
            const { rows } = await getAllMoviesWithInfosByIDS(
                client,
                JSON.parse(ids)
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

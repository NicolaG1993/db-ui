import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllMovies } from "@/src/application/db/utils/item.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);

            const { rows } = await getAllMovies(client); // REDO 🔴❌🔴❌🧠
            // we need the full lenght and pick a random number  ⚠️⚠️⚠️⚠️⚠️
            // then use that number to fetch the single item ⚠️⚠️⚠️⚠️⚠️

            await commit(client);
            let movie = rows[Math.floor(Math.random() * rows.length)];
            res.status(200).send(movie);
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(401).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

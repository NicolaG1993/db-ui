import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { newMoviesFromUrls } from "@/src/application/db/utils/item.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        let { newElements } = req.body;
        let parsedObj = JSON.stringify(newElements);
        // parsedObj = parsedObj.replaceAll('"', "'");

        console.log("🌶️ parsedObj: ", parsedObj);
        const client = await connect();
        try {
            await begin(client);
            // url deve essere una stringa, sql query la trasforma in text[] in automatico
            const { rows } = await newMoviesFromUrls(client, parsedObj);
            console.log("💚 rows: ", rows);
            await commit(client);
            res.status(200).json(rows);
        } catch (err) {
            await rollback(client);
            console.log("ERROR!!", err);
            res.status(500).send({
                message: ["Error updating on the server"],
                error: err,
            });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllTable, editPicURL } from "@/src/application/db/utils/utils.js";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const client = await connect();
        let { table } = req.body; // 🧠
        // let table = "actor"; // 🧠

        try {
            await begin(client);
            let { rows } = await getAllTable(client, table);
            rows.map(async (row) => {
                try {
                    let newPicURL = row.pic
                        ? `https://hot-bookmarks-bucket.s3.eu-central-1.amazonaws.com/movies/` +
                          row.pic.substring(
                              row.pic.indexOf("clips/") + "clips/".length
                          )
                        : null;
                    await editPicURL(client, newPicURL, row.id, table);
                    res.status(200).json(rows);
                } catch (error) {
                    console.log("ERROR!!", error);
                }
            });
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

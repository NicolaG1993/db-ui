import { getAllTable, editPicURL } from "@src/application/db/db.js";

async function handler(req, res) {
    let { table } = req.body; // 🧠
    // let table = "actor"; // 🧠

    try {
        let { rows } = await getAllTable(table);
        rows.map(async (row) => {
            try {
                let newPicURL = row.pic
                    ? `https://hot-bookmarks-bucket.s3.eu-central-1.amazonaws.com/movies/` +
                      row.pic.substring(
                          row.pic.indexOf("clips/") + "clips/".length
                      )
                    : null;
                await editPicURL(newPicURL, row.id, table);
                res.status(200).json(rows);
            } catch (error) {
                console.log("ERROR!!", error);
            }
        });
        res.status(200).json(rows);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

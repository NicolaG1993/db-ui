import { newRecord } from "@/utils/db/db";

async function handler(req, res) {
    let { id } = req.body;
    try {
        const { rows } = await newRecord(id);
        console.log("COMPLETED!!", rows[0]);
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

import { editRecord } from "@/utils/db/db";

async function handler(req, res) {
    let { id, date } = req.body;

    console.log("💛💛💛 modify record", id, date);

    if (!date) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }
    if (date) {
        date = new Date(date);
    }

    try {
        const record = await editRecord(id, date);

        console.log("COMPLETED!!", record.rows[0]);
        res.status(200).json(record.rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

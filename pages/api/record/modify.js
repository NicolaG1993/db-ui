import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { editRecord, editRecords } from "@/src/application/db/utils/record.js";

async function handler(req, res) {
    if (req.method === "PUT") {
        let { id, ids, date } = req.body;

        console.log("💛💛💛 modify record", id, ids, date);

        if (!date) {
            return res
                .status(422)
                .send({ error: ["Missing one or more fields"] });
        }
        if (date) {
            date = new Date(date);
        }

        let multipleSelection;
        if (ids && ids.length) {
            multipleSelection = true;
            id = false;
        }

        // /* MULTIPLE RECORDS */
        // if (ids && ids.length) {
        //     try {
        //         const records = await editRecords(client, ids, date);
        //         console.log("COMPLETED!!", records.rows);
        //         res.status(200).json(record.rows);
        //     } catch (err) {
        //         console.log("ERROR!!", err);
        //         res.status(500).send({
        //             message: ["Error updating on the server"],
        //             error: err,
        //         });
        //     }
        // }

        // /* SINGLE RECORD */
        // if (ids && ids.length) {
        //     try {
        //         const records = await editRecords(client, ids, date);
        //         console.log("COMPLETED!!", records.rows);
        //         res.status(200).json(record.rows);
        //     } catch (err) {
        //         console.log("ERROR!!", err);
        //         res.status(500).send({
        //             message: ["Error updating on the server"],
        //             error: err,
        //         });
        //     }
        // }

        const client = await connect();
        try {
            await begin(client);
            if (multipleSelection) {
                /* MULTIPLE RECORDS */
                const records = await editRecords(client, ids, date);
                await commit(client);
                console.log("COMPLETED!!", records.rows);
                res.status(200).json(records.rows);
            } else {
                /* SINGLE RECORD */
                const record = await editRecord(client, id, date);
                await commit(client);
                console.log("COMPLETED!!", record.rows[0]);
                res.status(200).json(record.rows[0]);
            }
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

export default handler;

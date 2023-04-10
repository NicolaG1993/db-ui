import { getRecordByID } from "@/utils/db/db";

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        let { rows } = await getRecordByID(Number(id));
        console.log("ROWS!", rows);
        res.status(200).json(rows);
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

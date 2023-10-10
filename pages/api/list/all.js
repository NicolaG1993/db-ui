import { getTable, getTableWithTypes } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    try {
        let { table } = req.query;
        if (table) {
            if (table === "tag" || table === "category") {
                const { rows } = await getTableWithTypes(table); // get simple data with type (name, id, type)
                res.status(200).send(rows);
            } else {
                const { rows } = await getTable(table); // get simple data (name, id)
                res.status(200).send(rows);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

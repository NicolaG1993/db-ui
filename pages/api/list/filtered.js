//NOT USED ? 🔴

/*
import { getRelationsByArr } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    try {
        let { arr, table, column } = req.query;
        if (table) {
            const { rows } = await getRelationsByArr(
                JSON.parse(arr),
                table,
                column
            );
            res.status(200).send(rows);
        }
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}
*/

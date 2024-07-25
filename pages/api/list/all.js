import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import {
    getTable,
    getTableWithTypes,
    getTableWithTags,
} from "@/src/application/db/utils/utils.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        let { table } = req.query;
        const client = await connect();
        try {
            await begin(client);
            if (table) {
                if (table === "tag" || table === "category") {
                    const { rows } = await getTableWithTypes(client, table); // get simple data with type (name, id, type)
                    await commit(client);
                    res.status(200).send(rows);
                } else if (table === "actor") {
                    const { rows } = await getTableWithTags(client, table); // get actors data (name, id, tags)
                    await commit(client);
                    res.status(200).send(rows);
                } else {
                    const { rows } = await getTable(client, table); // get simple data (name, id)
                    await commit(client);
                    res.status(200).send(rows);
                }
            }
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(500).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

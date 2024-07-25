import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { editTag } from "@/src/application/db/utils/item.js";

async function handler(req, res) {
    if (req.method === "PUT") {
        const client = await connect();
        let { id, name, pic, type } = req.body;

        if (!name) {
            return res
                .status(422)
                .send({ error: ["Missing one or more fields"] });
        }

        try {
            await begin(client);
            const tag = await editTag(client, id, name, pic, type);
            await commit(client);
            // ADD RELATIONS

            //REMOVE RELATIONS

            console.log("COMPLETED!!", tag.rows[0]);
            res.status(200).json(tag.rows[0]);
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

import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import { editCategory } from "@/src/application/db/utils/item.js";

async function handler(req, res) {
    if (req.method === "PUT") {
        let { id, name, pic, type } = req.body;

        if (!name) {
            return res
                .status(422)
                .send({ error: ["Missing one or more fields"] });
        }

        const client = await connect();
        try {
            await begin(client);

            const category = await editCategory(client, id, name, pic, type);
            await commit(client);

            // ADD RELATIONS  //REMOVE RELATIONS

            console.log("COMPLETED!!", category.rows[0]);
            res.status(200).json(category.rows[0]);
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

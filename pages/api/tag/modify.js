import { editTag } from "@/src/application/db/db.js";

async function handler(req, res) {
    let { id, name, pic, type } = req.body;

    if (!name) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    try {
        const tag = await editTag(id, name, pic, type);

        // ADD RELATIONS

        //REMOVE RELATIONS

        console.log("COMPLETED!!", tag.rows[0]);
        res.status(200).json(tag.rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

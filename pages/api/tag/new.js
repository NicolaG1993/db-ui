import { newTag } from "@/utils/db/db";

async function handler(req, res) {
    let { name, pic, type } = req.body;

    if (!name) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    try {
        const { rows } = await newTag(name, pic, type);

        // ADD RELATIONS

        // console.log("COMPLETED!!", clip.rows[0]);
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

import {
    editCategory,
    newRelations,
    newRelationsByStrings,
    deleteRelations,
} from "@/src/lib/db/db";

async function handler(req, res) {
    let { id, name, pic, type } = req.body;

    if (!name) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    try {
        const category = await editCategory(id, name, pic, type);

        // ADD RELATIONS

        //REMOVE RELATIONS

        console.log("COMPLETED!!", category.rows[0]);
        res.status(200).json(category.rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

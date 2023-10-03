import {
    editStudio,
    newRelationsByStrings,
    deleteRelations,
} from "@/src/lib/db/db";

async function handler(req, res) {
    let { id, name, pic, website, addedRelations, removedRelations } = req.body;

    if (!name) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    try {
        const studio = await editStudio(id, name, pic, website);

        // ADD RELATIONS
        addedRelations.nationalities.length &&
            (await newRelationsByStrings(
                id,
                addedRelations.nationalities,
                "nationalityRelation",
                "studioID",
                "nationality"
            ));

        //REMOVE RELATIONS
        removedRelations.nationalities.length &&
            (await deleteRelations(
                id,
                removedRelations.nationalities,
                "nationalityRelation",
                "studioID",
                "nationality"
            ));

        console.log("COMPLETED!!", studio.rows[0]);
        res.status(200).json(studio.rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

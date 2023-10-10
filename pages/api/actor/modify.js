import {
    editActor,
    newRelations,
    newRelationsByStrings,
    deleteRelations,
} from "@/src/application/db/db.js";

async function handler(req, res) {
    let {
        id,
        name,
        pic,
        rating,
        birthday,
        genre,
        addedRelations,
        removedRelations,
    } = req.body;

    if (!name) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }
    if (birthday) {
        birthday = new Date(birthday);
    }

    try {
        const actor = await editActor(
            id,
            name,
            pic,
            Number(rating),
            birthday,
            genre
        );

        // ADD RELATIONS
        addedRelations.tags.length &&
            (await newRelations(
                id,
                addedRelations.tags,
                "tagRelation",
                "actorID",
                "tagID"
            ));
        addedRelations.nationalities.length &&
            (await newRelationsByStrings(
                id,
                addedRelations.nationalities,
                "nationalityRelation",
                "actorID",
                "nationality"
            ));

        //REMOVE RELATIONS
        removedRelations.tags.length &&
            (await deleteRelations(
                id,
                removedRelations.tags,
                "tagRelation",
                "actorID",
                "tagID"
            ));
        removedRelations.nationalities.length &&
            (await deleteRelations(
                id,
                removedRelations.nationalities,
                "nationalityRelation",
                "actorID",
                "nationality"
            ));

        console.log("COMPLETED!!", actor.rows[0]);
        res.status(200).json(actor.rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

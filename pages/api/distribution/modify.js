import {
    editDistribution,
    newRelationsByStrings,
    deleteRelations,
} from "@/src/application/db/db.js";

async function handler(req, res) {
    let { id, name, pic, website, addedRelations, removedRelations } = req.body;

    if (!name) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    try {
        const distribution = await editDistribution(id, name, pic, website);

        // ADD RELATIONS
        addedRelations.nationalities.length &&
            (await newRelationsByStrings(
                id,
                addedRelations.nationalities,
                "nationalityRelation",
                "distributionID",
                "nationality"
            ));

        //REMOVE RELATIONS
        removedRelations.nationalities.length &&
            (await deleteRelations(
                id,
                removedRelations.nationalities,
                "nationalityRelation",
                "distributionID",
                "nationality"
            ));

        console.log("COMPLETED!!", distribution.rows[0]);
        res.status(200).json(distribution.rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

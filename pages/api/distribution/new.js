import {
    newDistribution,
    newRelationsByStrings,
} from "@/src/application/db/db.js";

async function handler(req, res) {
    let { name, pic, website, nationalities } = req.body;

    if (!name) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    try {
        const { rows } = await newDistribution(name, pic, website);

        // ADD RELATIONS
        nationalities &&
            nationalities.length &&
            (await newRelationsByStrings(
                rows[0].id,
                nationalities,
                "nationalityRelation",
                "distributionID",
                "nationality"
            ));

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

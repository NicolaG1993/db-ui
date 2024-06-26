import {
    newActor,
    newRelations,
    newRelationsByStrings,
} from "@/src/application/db/db.js";

export default async function handler(req, res) {
    console.log("new actor: ", req.body);

    let {
        name,
        pic,
        studios,
        distributions,
        rating,
        birthday,
        nationalities,
        categories,
        tags,
        genre,
        twitter,
        instagram,
        moreUrls,
    } = req.body;
    if (!name) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }
    if (birthday) {
        birthday = new Date(birthday);
    } else {
        birthday = null;
    }

    try {
        const { rows } = await newActor(
            name,
            pic,
            Number(rating),
            birthday,
            genre,
            twitter,
            instagram,
            moreUrls || []
        );
        tags &&
            tags.length &&
            (await newRelations(
                rows[0].id,
                tags,
                "tagRelation",
                "actorID",
                "tagID"
            ));
        nationalities &&
            nationalities.length &&
            (await newRelationsByStrings(
                rows[0].id,
                nationalities,
                "nationalityRelation",
                "actorID",
                "nationality"
            ));

        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

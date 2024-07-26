import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { newActor } from "@/src/application/db/utils/item.js";
import {
    newRelations,
    newRelationsByStrings,
} from "@/src/application/db/utils/utils.js";

export default async function handler(req, res) {
    console.log("new actor: ", req.body);
    if (req.method === "POST") {
        let {
            name,
            pic,
            // studios,
            // distributions,
            rating,
            birthday,
            nationalities,
            // categories,
            tags,
            genre,
            twitter,
            instagram,
            moreUrls,
        } = req.body;

        if (!name) {
            return res
                .status(422)
                .send({ error: ["Missing one or more fields"] });
        }

        if (birthday) {
            birthday = new Date(birthday);
        } else {
            birthday = null;
        }

        const client = await connect();

        try {
            await begin(client);
            const { rows } = await newActor(
                client,
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
                    client,
                    rows[0].id,
                    tags,
                    "tagRelation",
                    "actorID",
                    "tagID"
                ));
            nationalities &&
                nationalities.length &&
                (await newRelationsByStrings(
                    client,
                    rows[0].id,
                    nationalities,
                    "nationalityRelation",
                    "actorID",
                    "nationality"
                ));

            await commit(client);

            res.status(200).json(rows[0]);
        } catch (err) {
            await rollback(client);
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

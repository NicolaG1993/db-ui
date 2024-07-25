import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { editActor } from "@/src/application/db/utils/item.js";
import {
    newRelations,
    newRelationsByStrings,
    deleteRelations,
} from "@/src/application/db/utils/utils.js";

async function handler(req, res) {
    if (req.method === "PUT") {
        let {
            id,
            name,
            pic,
            rating,
            birthday,
            genre,
            twitter,
            instagram,
            moreUrls,
            addedRelations,
            removedRelations,
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
            const actor = await editActor(
                client,
                id,
                name,
                pic,
                Number(rating),
                birthday,
                genre,
                twitter,

                instagram,
                moreUrls || []
            );

            // ADD RELATIONS
            // TODO: ridurre request a ona sola 🧠
            addedRelations.tags.length &&
                (await newRelations(
                    client,
                    id,
                    addedRelations.tags,
                    "tagRelation",
                    "actorID",
                    "tagID"
                ));
            addedRelations.nationalities.length &&
                (await newRelationsByStrings(
                    client,
                    id,
                    addedRelations.nationalities,
                    "nationalityRelation",
                    "actorID",
                    "nationality"
                ));

            //REMOVE RELATIONS
            removedRelations.tags.length &&
                (await deleteRelations(
                    client,
                    id,
                    removedRelations.tags,
                    "tagRelation",
                    "actorID",
                    "tagID"
                ));
            removedRelations.nationalities.length &&
                (await deleteRelations(
                    client,
                    id,
                    removedRelations.nationalities,
                    "nationalityRelation",
                    "actorID",
                    "nationality"
                ));

            console.log("COMPLETED!!", actor.rows[0]);
            await commit(client);

            res.status(200).json(actor.rows[0]);
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

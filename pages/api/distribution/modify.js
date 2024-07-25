import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { editDistribution } from "@/src/application/db/utils/item.js";
import {
    newRelationsByStrings,
    deleteRelations,
} from "@/src/application/db/utils/utils.js";

async function handler(req, res) {
    if (req.method === "PUT") {
        let { id, name, pic, website, addedRelations, removedRelations } =
            req.body;

        if (!name) {
            return res
                .status(422)
                .send({ error: ["Missing one or more fields"] });
        }

        const client = await connect();
        try {
            await begin(client);
            const distribution = await editDistribution(
                client,
                id,
                name,
                pic,
                website
            );

            // ADD RELATIONS
            addedRelations.nationalities.length &&
                (await newRelationsByStrings(
                    client,
                    id,
                    addedRelations.nationalities,
                    "nationalityRelation",
                    "distributionID",
                    "nationality"
                ));

            //REMOVE RELATIONS
            removedRelations.nationalities.length &&
                (await deleteRelations(
                    client,
                    id,
                    removedRelations.nationalities,
                    "nationalityRelation",
                    "distributionID",
                    "nationality"
                ));

            console.log("COMPLETED!!", distribution.rows[0]);
            await commit(client);
            res.status(200).json(distribution.rows[0]);
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

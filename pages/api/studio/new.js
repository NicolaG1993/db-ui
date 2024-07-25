import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { newStudio } from "@/src/application/db/utils/item.js";
import { newRelationsByStrings } from "@/src/application/db/utils/utils.js";

async function handler(req, res) {
    if (req.method === "POST") {
        let { name, pic, website, nationalities } = req.body;

        if (!name) {
            return res
                .status(422)
                .send({ error: ["Missing one or more fields"] });
        }
        const client = await connect();

        try {
            await begin(client);

            const { rows } = await newStudio(client, name, pic, website);

            // ADD RELATIONS
            nationalities &&
                nationalities.length &&
                (await newRelationsByStrings(
                    client,
                    rows[0].id,
                    nationalities,
                    "nationalityRelation",
                    "studioID",
                    "nationality"
                ));
            await commit(client);

            // console.log("COMPLETED!!", rows[0]);
            res.status(200).json(rows[0]);
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

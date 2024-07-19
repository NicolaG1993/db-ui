import { getRelationsPage } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    try {
        let {
            itemId,
            itemLabel,
            relationsLabel,
            direction,
            order,
            page,
            limit,
        } = req.query;

        // console.log("🟡⚠️🟡⚠️⭐ movie-page: ", {
        //     itemId,
        //     itemLabel,
        //     relationsLabel,
        //     direction,
        //     order,
        //     page,
        // });

        const { rows } = await getRelationsPage(
            itemId,
            itemLabel,
            relationsLabel,
            direction,
            order,
            page,
            limit
        );
        console.log("rows: ", rows);

        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

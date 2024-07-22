import { getMovieActorsPage } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    try {
        let {
            itemId,
            itemLabel,
            // relationsLabel,
            direction,
            order,
            limit,
            offset,
        } = req.query;

        console.log("🟡⚠️🟡⚠️⭐ actor-page: ", {
            itemId,
            itemLabel,
            // relationsLabel,
            direction,
            order,
            limit,
            offset,
        });

        if (itemLabel === "movie") {
            const { rows } = await getMovieActorsPage(
                itemId,
                direction,
                order,
                limit,
                offset
            );
            res.status(200).send(rows);
        }
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

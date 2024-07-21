import {
    getCategoryMoviesPage,
    getTagMoviesPage,
    getActorMoviesPage,
    getStudioMoviesPage,
    getDistributionMoviesPage,
} from "@/src/application/db/db.js";

export default async function handler(req, res) {
    try {
        let {
            itemId,
            itemLabel,
            relationsLabel,
            direction,
            order,
            limit,
            offset,
        } = req.query;

        console.log("🟡⚠️🟡⚠️⭐ movie-page: ", {
            itemId,
            itemLabel,
            relationsLabel,
            direction,
            order,
            limit,
            offset,
        });

        if (itemLabel === "category") {
            const { rows } = await getCategoryMoviesPage(
                itemId,
                direction,
                order,
                limit,
                offset
            );
            res.status(200).send(rows);
        } else if (itemLabel === "tag") {
            const { rows } = await getTagMoviesPage(
                itemId,
                direction,
                order,
                limit,
                offset
            );
            res.status(200).send(rows);
        } else if (itemLabel === "studio") {
            const { rows } = await getStudioMoviesPage(
                itemId,
                direction,
                order,
                limit,
                offset
            );
            res.status(200).send(rows);
        } else if (itemLabel === "distribution") {
            const { rows } = await getDistributionMoviesPage(
                itemId,
                direction,
                order,
                limit,
                offset
            );
            res.status(200).send(rows);
        } else if (itemLabel === "actor") {
            const { rows } = await getActorMoviesPage(
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

import { deleteRecord } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const { id, table } = req.body;

    try {
        //elimino record
        let { rows } = await deleteRecord(Number(id), table);

        // elimino relations (es. movie_actor quando elimino una movie)
        if (table === "movies") {
            await deleteRecord(Number(id), "movie_actor", "movieID");
            await deleteRecord(Number(id), "movie_studio", "movieID");
            await deleteRecord(Number(id), "movie_distribution", "movieID");
            await deleteRecord(Number(id), "categoryRelation", "movieID");
            await deleteRecord(Number(id), "tagRelation", "movieID");
            await deleteRecord(Number(id), "counter", "movieID");
        }
        if (table === "actors") {
            await deleteRecord(Number(id), "movie_actor", "actorID");
            await deleteRecord(Number(id), "categoryRelation", "actorID");
            await deleteRecord(Number(id), "tagRelation", "actorID");
            await deleteRecord(Number(id), "nationalityRelation", "actorID");
        }
        if (table === "studios") {
            await deleteRecord(Number(id), "movie_studio", "studioID");
            await deleteRecord(Number(id), "nationalityRelation", "studioID");
        }
        if (table === "distribution") {
            await deleteRecord(
                Number(id),
                "movie_distribution",
                "distributionID"
            );
            await deleteRecord(
                Number(id),
                "nationalityRelation",
                "distributionID"
            );
        }
        if (table === "categories") {
            await deleteRecord(Number(id), "categoriesRelation", "categoryID");
        }
        if (table === "tags") {
            await deleteRecord(Number(id), "tagsRelation", "tagID");
        }
        if (table === "counter") {
            await deleteRecord(Number(id), "counter", "id");
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { deleteColumn } from "@/src/application/db/utils/utils.js";

// 🧠🧠🧠 check if it's really working for every case (relations foreign keys conflicts)
// tested only for counter // playlist not working
export default async function handler(req, res) {
    if (req.method === "DELETE") {
        const { id, table } = req.body;
        const client = await connect();

        try {
            await begin(client);
            //elimino record
            let { rows } = await deleteColumn(client, Number(id), table);

            // elimino relations (es. movie_actor quando elimino una movie)
            if (table === "movies") {
                await deleteColumn(
                    client,
                    Number(id),
                    "movie_actor",
                    "movieID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "movie_studio",
                    "movieID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "movie_distribution",
                    "movieID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "categoryRelation",
                    "movieID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "tagRelation",
                    "movieID"
                );
                await deleteColumn(client, Number(id), "counter", "movieID");
            }
            if (table === "actors") {
                await deleteColumn(
                    client,
                    Number(id),
                    "movie_actor",
                    "actorID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "categoryRelation",
                    "actorID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "tagRelation",
                    "actorID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "nationalityRelation",
                    "actorID"
                );
            }
            if (table === "studios") {
                await deleteColumn(
                    client,
                    Number(id),
                    "movie_studio",
                    "studioID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "nationalityRelation",
                    "studioID"
                );
            }
            if (table === "distribution") {
                await deleteColumn(
                    client,
                    Number(id),
                    "movie_distribution",
                    "distributionID"
                );
                await deleteColumn(
                    client,
                    Number(id),
                    "nationalityRelation",
                    "distributionID"
                );
            }
            if (table === "categories") {
                await deleteColumn(
                    client,
                    Number(id),
                    "categoriesRelation",
                    "categoryID"
                );
            }
            if (table === "tags") {
                await deleteColumn(client, Number(id), "tagsRelation", "tagID");
            }
            if (table === "counter") {
                await deleteColumn(client, Number(id), "counter", "id");
            }
            // if (table === "playlist") {
            // await deleteColumn(client,Number(id), "movie_playlist", "playlistID");
            // }
            await commit(client);
            res.status(200).json(rows[0]);
        } catch (err) {
            await rollback(client);
            console.log("ERROR!", err);
            return res.status(500).json({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

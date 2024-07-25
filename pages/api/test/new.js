import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import {
    newActor,
    newMovie,
    newStudio,
    newDistribution,
    newCategory,
    newTag,
} from "@/src/application/db/utils/item.js";
// import {
//     newRelations,
//     newRelationsByStrings,
// } from "@/src/application/db/utils/utils.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const client = await connect();
        try {
            await begin(client);
            const actor = await newActor(
                client,
                "Tom Cruise",
                null,
                Number("4.9"),
                new Date(),
                "male"
            );
            const movie = await newMovie(
                client,
                "Top Gun",
                null,
                Number("4.9"),
                null,
                new Date()
            );
            const studio = await newStudio(
                client,
                "ABC Studios",
                null,
                "www.abc-studios.com"
            );
            const distribution = await newDistribution(
                client,
                "Netflix",
                null,
                "www.netflix.com"
            );
            const category = await newCategory(client, "Action", "Genre");
            const tag = await newTag(client, "Large Production Cost", "Budget");
            await commit(client);
            res.status(200).send({
                actor: actor.rows[0],
                movie: movie.rows[0],
            });
        } catch (err) {
            await rollback(client);
            console.log("🧡🧡🧡 DB ACTION ERROR: ", err);
            res.status(401).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

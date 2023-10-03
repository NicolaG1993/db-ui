import {
    newActor,
    newMovie,
    newStudio,
    newDistribution,
    newCategory,
    newTag,
    newRelations,
    newRelationsByStrings,
} from "@src/application/db/db.js";

export default async function handler(req, res) {
    try {
        const actor = await newActor(
            "Tom Cruise",
            null,
            Number("4.9"),
            new Date(),
            "male"
        );
        const movie = await newMovie(
            "Top Gun",
            null,
            Number("4.9"),
            null,
            new Date()
        );
        const studio = await newStudio(
            "ABC Studios",
            null,
            "www.abc-studios.com"
        );
        const distribution = await newDistribution(
            "Netflix",
            null,
            "www.netflix.com"
        );
        const category = await newCategory("Action", "Genre");
        const tag = await newTag("Large Production Cost", "Budget");
        res.status(200).send({ actor: actor.rows[0], movie: movie.rows[0] });
    } catch (err) {
        console.log("🧡🧡🧡 DB ACTION ERROR: ", err);
        res.status(401).send({ message: "ERROR" });
    }
}

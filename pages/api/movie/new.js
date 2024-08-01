import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { newMovie, getMoviePreview } from "@/src/application/db/utils/item.js";
import { newRelations } from "@/src/application/db/utils/utils.js";

async function handler(req, res) {
    if (req.method === "POST") {
        let {
            title,
            pic,
            studios,
            distributions,
            rating,
            categories,
            tags,
            urls,
            actors,
        } = req.body;
        let movieRelease = req.body.release;

        if (!title) {
            return res
                .status(422)
                .send({ error: ["Missing one or more fields"] });
        }
        if (movieRelease) {
            movieRelease = new Date(movieRelease);
        } else {
            movieRelease = null;
        }

        const client = await connect();
        try {
            await begin(client);
            // CREATE CLIP
            const { rows } = await newMovie(
                client,
                title,
                pic,
                Number(rating),
                urls,
                movieRelease
            );
            console.log("categories: ", categories);
            console.log("tags: ", tags);

            // ADD RELATIONS
            actors &&
                actors.length &&
                (await newRelations(
                    client,
                    rows[0].id,
                    actors,
                    "movie_actor",
                    "movieID",
                    "actorID"
                ));
            studios &&
                studios.length &&
                (await newRelations(
                    client,
                    rows[0].id,
                    studios,
                    "movie_studio",
                    "movieID",
                    "studioID"
                ));
            distributions &&
                distributions.length &&
                (await newRelations(
                    client,
                    rows[0].id,
                    distributions,
                    "movie_distribution",
                    "movieID",
                    "distributionID"
                ));
            categories &&
                categories.length &&
                (await newRelations(
                    client,
                    rows[0].id,
                    categories,
                    "categoryRelation",
                    "movieID",
                    "categoryID"
                ));
            tags &&
                tags.length &&
                (await newRelations(
                    client,
                    rows[0].id,
                    tags,
                    "tagRelation",
                    "movieID",
                    "tagID"
                ));
            await commit(client);
            console.log("COMPLETED!!", rows[0]);

            const { rows: movieResult } = await getMoviePreview(
                client,
                rows[0].id
            ); // Used only to add to SessionPlaylist
            const movie = movieResult[0];
            res.status(200).json(movie);
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

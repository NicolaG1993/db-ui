import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { editMovie } from "@/src/application/db/utils/item.js";
import {
    newRelations,
    deleteRelations,
} from "@/src/application/db/utils/utils.js";
// import { extractMissingTagsIDs } from "@/src/domains/_app/utils/parsers";

async function handler(req, res) {
    if (req.method === "PUT") {
        let {
            id,
            title,
            pic,
            rating,
            urls,
            actors,
            release,
            addedRelations,
            removedRelations,
        } = req.body;
        console.log("💛💛💛 addedRelations", addedRelations);
        console.log("💛💛💛 removedRelations", removedRelations);
        if (!title) {
            return res
                .status(422)
                .send({ error: ["Missing one or more fields"] });
        }

        if (release) {
            release = new Date(release);
        } else {
            release = null;
        }

        //
        // if (addedRelations.tags.length) {
        //     addedRelations.tags = extractMissingTagsIDs(addedRelations.tags);
        // }

        // console.log("addedRelations.tags: ", addedRelations.tags);
        // console.log("actors: ", actors);

        //actor check
        /*
    if (actors.length) {
        try {
            let ids = await getIDsByNames(actors, "actor");
            // console.log("💛💛💛 ids", ids);
            const { rows } = await getRelationsByArr(
                ids.rows.map((el) => el.id),
                "tagRelation",
                "actorID"
            );
            const dinamicTags = [1, 2, 3, 5];

            const result = rows.filter((x) => !dinamicTags.includes(x.tagid));
            const actorTags = result.map((el) => el.tagid);
            addedRelations.tags = [...addedRelations.tags, ...actorTags];
        } catch (err) {
            console.log("ERROR getRelationsByArr!", err);
            return res.status(500).send({
                message: ["Error getting data from the server"],
                error: err,
            });
        }

        addedRelations.tags.filter(
            (el, i) => addedRelations.tags.indexOf(el) === i
        ); // delete all duplicates
    }
    */
        const client = await connect();
        try {
            await begin(client);
            // EDIT CLIP
            const movie = await editMovie(
                client,
                id,
                title,
                pic,
                Number(rating),
                urls,
                release
            );

            // ADD RELATIONS
            console.log("id", id);
            console.log("addedRelations", addedRelations);
            addedRelations.actors.length &&
                (await newRelations(
                    client,
                    id,
                    addedRelations.actors,
                    "movie_actor",
                    "movieID",
                    "actorID"
                ));
            addedRelations.studios.length &&
                (await newRelations(
                    client,
                    id,
                    addedRelations.studios,
                    "movie_studio",
                    "movieID",
                    "studioID"
                ));
            addedRelations.distributions.length &&
                (await newRelations(
                    client,
                    id,
                    addedRelations.distributions,
                    "movie_distribution",
                    "movieID",
                    "distributionID"
                ));
            addedRelations.categories.length &&
                (await newRelations(
                    client,
                    id,
                    addedRelations.categories,
                    "categoryRelation",
                    "movieID",
                    "categoryID"
                ));
            addedRelations.tags.length &&
                (await newRelations(
                    client,
                    id,
                    addedRelations.tags,
                    "tagRelation",
                    "movieID",
                    "tagID"
                ));

            //REMOVE RELATIONS
            console.log("removedRelations", removedRelations);
            removedRelations.actors.length &&
                (await deleteRelations(
                    client,
                    id,
                    removedRelations.actors,
                    "movie_actor",
                    "movieID",
                    "actorID"
                ));
            removedRelations.studios.length &&
                (await deleteRelations(
                    client,
                    id,
                    removedRelations.studios,
                    "movie_studio",
                    "movieID",
                    "studioID"
                ));
            removedRelations.distributions.length &&
                (await deleteRelations(
                    client,
                    id,
                    removedRelations.distributions,
                    "movie_distribution",
                    "movieID",
                    "distributionID"
                ));
            removedRelations.categories.length &&
                (await deleteRelations(
                    client,
                    id,
                    removedRelations.categories,
                    "categoryRelation",
                    "movieID",
                    "categoryID"
                ));
            removedRelations.tags.length &&
                (await deleteRelations(
                    client,
                    id,
                    removedRelations.tags,
                    "tagRelation",
                    "movieID",
                    "tagID"
                ));
            await commit(client);
            // console.log("COMPLETED!!", movie.rows[0]);
            res.status(200).json(movie.rows[0]);
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

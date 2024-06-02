import {
    editMovie,
    newRelations,
    deleteRelations,
    getRelationsByArr,
    getIDsByNames,
} from "@/src/application/db/db.js";
// import { extractMissingTagsIDs } from "@/src/domains/_app/utils/parsers";

async function handler(req, res) {
    let {
        id,
        title,
        pic,
        rating,
        // studios,
        // distributions,
        // categories,
        // tags,
        urls,
        actors,
        release,
        addedRelations,
        removedRelations,
    } = req.body;
    console.log("💛💛💛 addedRelations", addedRelations);
    console.log("💛💛💛 removedRelations", removedRelations);
    if (!title) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
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

    try {
        // EDIT CLIP
        const movie = await editMovie(
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
                id,
                addedRelations.actors,
                "movie_actor",
                "movieID",
                "actorID"
            ));
        addedRelations.studios.length &&
            (await newRelations(
                id,
                addedRelations.studios,
                "movie_studio",
                "movieID",
                "studioID"
            ));
        addedRelations.distributions.length &&
            (await newRelations(
                id,
                addedRelations.distributions,
                "movie_distribution",
                "movieID",
                "distributionID"
            ));
        addedRelations.categories.length &&
            (await newRelations(
                id,
                addedRelations.categories,
                "categoryRelation",
                "movieID",
                "categoryID"
            ));
        addedRelations.tags.length &&
            (await newRelations(
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
                id,
                removedRelations.actors,
                "movie_actor",
                "movieID",
                "actorID"
            ));
        removedRelations.studios.length &&
            (await deleteRelations(
                id,
                removedRelations.studios,
                "movie_studio",
                "movieID",
                "studioID"
            ));
        removedRelations.distributions.length &&
            (await deleteRelations(
                id,
                removedRelations.distributions,
                "movie_distribution",
                "movieID",
                "distributionID"
            ));
        removedRelations.categories.length &&
            (await deleteRelations(
                id,
                removedRelations.categories,
                "categoryRelation",
                "movieID",
                "categoryID"
            ));
        removedRelations.tags.length &&
            (await deleteRelations(
                id,
                removedRelations.tags,
                "tagRelation",
                "movieID",
                "tagID"
            ));

        // console.log("COMPLETED!!", movie.rows[0]);
        res.status(200).json(movie.rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

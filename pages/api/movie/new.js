import {
    newMovie,
    newRelations,
    getRelationsByArr,
} from "@/src/application/db/db.js";
// import { tagsCheck } from "@/src/domains/_app/utils/parsers";

async function handler(req, res) {
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
        release,
    } = req.body;

    if (!title) {
        return res.status(422).send({ error: ["Missing one or more fields"] });
    }
    if (release) {
        release = new Date(release);
    }
    if (categories.length) {
    }
    // if (tags.length) {
    //     tags = tagsCheck(tags);
    // }

    console.log("actors: ", actors);
    //actor check
    if (actors.length) {
        // prende tags di actor e li aggiunge
        // tranne quelli dinamici (colore capelli, etá)

        //arr viene mappata e per ogni row al suo interno si fa un filter
        // ogni valore che é diverso da quelli specificati, e se non é doppio, si aggiunge a tags
        try {
            const { rows } = await getRelationsByArr(
                actors,
                "tagRelation",
                "actorID"
            ); //rows from API
            const dinamicTags = [1, 2, 3, 5]; //tags da rimuovere [hair color, young age]
            // console.log("rows by getRelationsByArr", rows);
            // console.log("dinamicTags by getRelationsByArr", dinamicTags);

            const result = rows.filter((x) => !dinamicTags.includes(x.tagid)); //filtra solo tag validi, senza quelli da rimuovere
            const actorTags = result.map((el) => el.tagid); //extract all id to single int[]
            tags = [...tags, ...actorTags];
        } catch (err) {
            console.log("ERROR getRelationsByArr!", err);
            res.status(500).send({
                message: ["Error getting data from the server"],
                error: err,
            });
        }

        tags.filter((el, i) => tags.indexOf(el) === i); // delete all duplicates
        console.log("tags after getRelationsByArr", tags);
    }

    try {
        // CREATE CLIP
        const { rows } = await newMovie(
            title,
            pic,
            Number(rating),
            urls,
            release
        );
        console.log("categories: ", categories);
        console.log("tags: ", tags);

        // ADD RELATIONS
        actors &&
            actors.length &&
            (await newRelations(
                rows[0].id,
                actors,
                "movie_actor",
                "movieID",
                "actorID"
            ));
        studios &&
            studios.length &&
            (await newRelations(
                rows[0].id,
                studios,
                "movie_studio",
                "movieID",
                "studioID"
            ));
        distributions &&
            distributions.length &&
            (await newRelations(
                rows[0].id,
                distributions,
                "movie_distribution",
                "movieID",
                "distributionID"
            ));
        categories &&
            categories.length &&
            (await newRelations(
                rows[0].id,
                categories,
                "categoryRelation",
                "movieID",
                "categoryID"
            ));
        tags &&
            tags.length &&
            (await newRelations(
                rows[0].id,
                tags,
                "tagRelation",
                "movieID",
                "tagID"
            ));

        // console.log("COMPLETED!!", rows[0]);
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

export default handler;

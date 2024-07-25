import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getMovieByID } from "@/src/application/db/utils/item.js";
import { mapMovieRawToMovie } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;

        const client = await connect();

        try {
            await begin(client);
            // GET CLIP
            let { rows } = await getMovieByID(client, Number(id));
            // // console.log("rows: ", rows[0]);
            // // uso questo metodo per ricevere data perché innerjoin mi univa tutti i risultati in un unico oggetto (rows[0])

            // // GET MODELS
            // // all relations -> id[]
            // let actorRelations = await getRelations(
            //     Number(id),
            //     "movie_actor",
            //     "movieID"
            // );
            // if (actorRelations.rows.length) {
            //     // all relation parsed -> obj[]
            //     const resp = await getAllActorsWithInfosByIDS(
            //         actorRelations.rows.map((el) => el.actorid)
            //     );
            //     rows[0].actors = resp.rows;
            // } else {
            //     rows[0].actors = [];
            // }

            // // GET STUDIOS
            // let studioRelations = await getRelations(
            //     Number(id),
            //     "movie_studio",
            //     "movieID"
            // );
            // if (studioRelations.rows.length) {
            //     const resp = await getStudios(
            //         studioRelations.rows.map((el) => el.studioid)
            //     );
            //     rows[0].studios = resp.rows;
            // } else {
            //     rows[0].studios = [];
            // }

            // // GET DISTRIBUTION
            // let distributionRelations = await getRelations(
            //     Number(id),
            //     "movie_distribution",
            //     "movieID"
            // );
            // if (distributionRelations.rows.length) {
            //     const resp = await getDistributions(
            //         distributionRelations.rows.map((el) => el.distributionid)
            //     );
            //     rows[0].distributions = resp.rows;
            // } else {
            //     rows[0].distributions = [];
            // }

            // // GET CATEGORIES
            // let categoryRelations = await getRelations(
            //     Number(id),
            //     "categoryRelation",
            //     "movieID"
            // );
            // if (categoryRelations.rows.length) {
            //     const resp = await getCategories(
            //         categoryRelations.rows.map((el) => el.categoryid)
            //     );
            //     rows[0].categories = resp.rows;
            // } else {
            //     rows[0].categories = [];
            // }

            // // GET TAGS
            // let tagRelations = await getRelations(
            //     Number(id),
            //     "tagRelation",
            //     "movieID"
            // );
            // if (tagRelations.rows.length) {
            //     const resp = await getTags(tagRelations.rows.map((el) => el.tagid));
            //     rows[0].tags = resp.rows;
            // } else {
            //     rows[0].tags = [];
            // }

            // res.status(200).json(rows[0]);

            await commit(client);
            let movie = mapMovieRawToMovie(rows[0]);
            res.status(200).json(movie);
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

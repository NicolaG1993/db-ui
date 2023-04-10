import {
    getTagByID,
    getRelations,
    getRelationsByArr,
    getMovies,
    getActors,
} from "@/utils/db/db";
// import { sortByObjValue } from "../../../../utils/orderData";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        let { rows } = await getTagByID(Number(id)); // il mio tag obj
        let relations = await getRelations(Number(id), "tagRelation", "tagID"); // tutte le relations del tag obj[]

        let allMovies = relations.rows.map((el) => el.movieid).filter((x) => x);
        let allActors = relations.rows.map((el) => el.actorid).filter((x) => x);

        // GET MOVIES
        if (allMovies.length) {
            const resp = await getMovies(allMovies);
            console.log("resp!", resp.rows);
            rows[0].movies = resp.rows;
        } else {
            rows[0].movies = [];
        }

        // GET ACTORS
        if (allActors.length) {
            const resp = await getActors(allActors);
            rows[0].actors = resp.rows;
        } else {
            rows[0].actors = [];
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).send({ message: err.message });
    }
}

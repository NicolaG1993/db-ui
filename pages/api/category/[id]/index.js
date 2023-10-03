import {
    getCategoryByID,
    getRelations,
    getRelationsByArr,
    getMovies,
    getActors,
} from "@src/application/db/db.js";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        let { rows } = await getCategoryByID(Number(id));

        // GET CLIPS
        let movieRelations = await getRelations(
            Number(id),
            "categoryRelation",
            "categoryID"
        );

        let allMoviesIds;

        if (movieRelations.rows.length) {
            allMoviesIds = movieRelations.rows.map((el) => el.movieid);
            const resp = await getMovies(allMoviesIds);
            rows[0].movies = resp.rows;
        } else {
            rows[0].movies = [];
        }

        // GET ACTORS
        if (allMoviesIds) {
            let actorsRelations = await getRelationsByArr(
                allMoviesIds,
                "movie_actor",
                "movieID"
            );

            let allActorsIds;

            if (actorsRelations.rows.length) {
                allActorsIds = actorsRelations.rows.map((el) => el.actorid);

                const counts = {};
                allActorsIds.forEach(function (x) {
                    counts[x] = (counts[x] || 0) + 1;
                }); //count how many times a actorid is present in actorsRelations.rows
                // console.log("counts!", counts);

                const resp = await getActors(allActorsIds);

                resp.rows = resp.rows.map((el) => {
                    el.totalMovies = counts[Number(el.id)];
                    return el;
                }); // add matching counts[key] to resp.rows

                rows[0].actors = resp.rows;
            } else {
                rows[0].actors = [];
            }
        } else {
            rows[0].actors = [];
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        // console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

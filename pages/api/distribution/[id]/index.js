import { getDistributionByID } from "@/src/application/db/db.js";
import { mapDistributionRawToDistribution } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        /*
        let { rows } = await getDistributionByID(Number(id));
        // console.log("ROWS!", rows[0]);

        // GET CLIPS
        let movieRelations = await getRelations(
            Number(id),
            "movie_distribution",
            "distributionID"
        );

        let allMoviesIds;

        if (movieRelations.rows.length) {
            allMoviesIds = movieRelations.rows.map((el) => el.movieid);
            const resp = await getMovies(
                movieRelations.rows.map((el) => el.movieid)
            );
            rows[0].movies = resp.rows;
        } else {
            rows[0].movies = [];
        }

        // GET NATIONALITY
        let nationalityRelations = await getRelations(
            Number(id),
            "nationalityRelation",
            "distributionID"
        );
        if (nationalityRelations.rows.length) {
            // console.log("RESPONSE!!! :", nationalityRelations.rows.length);
            rows[0].nationalities = nationalityRelations.rows.map(
                (el) => el.nationality
            );
        } else {
            rows[0].nationalities = [];
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
        //
        res.status(200).json(rows[0]);
        */
        let { rows } = await getDistributionByID(Number(id));
        let distribution = mapDistributionRawToDistribution(rows[0]);
        console.log("rows: ", rows);
        res.status(200).json(distribution);
    } catch (err) {
        // console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

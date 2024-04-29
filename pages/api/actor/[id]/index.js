import {
    getActorByID,
    getRelations,
    getRelationsByArr,
    getAllMoviesWithInfosByIDS,
    getStudios,
    getDistributions,
    getCategories,
    getTags,
} from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        let { rows } = await getActorByID(Number(id));

        if (rows?.length) {
            // GET MOVIES
            let movieRelations = await getRelations(
                Number(id),
                "movie_actor",
                "actorid"
            );
            // console.log("💚💚💚 checkin in!!", movieRelations.rows);
            if (movieRelations.rows.length) {
                const resp = await getAllMoviesWithInfosByIDS(
                    movieRelations.rows.map((el) => el.movieid)
                );
                rows[0].movies = resp.rows;
            } else {
                rows[0].movies = [];
            }

            if (rows[0].movies.length) {
                // GET STUDIOS
                let studioRelations = await getRelationsByArr(
                    rows[0].movies.map((el) => Number(el.id)),
                    "movie_studio",
                    "movieID"
                );
                if (studioRelations.rows.length) {
                    const resp = await getStudios(
                        studioRelations.rows.map((el) => el.studioid)
                    );
                    rows[0].studios = resp.rows;
                } else {
                    rows[0].studios = [];
                }

                // GET DISTRIBUTION
                let distributionRelations = await getRelationsByArr(
                    rows[0].movies.map((el) => Number(el.id)),
                    "movie_distribution",
                    "movieID"
                );
                if (distributionRelations.rows.length) {
                    const resp = await getDistributions(
                        distributionRelations.rows.map(
                            (el) => el.distributionid
                        )
                    );
                    rows[0].distributions = resp.rows;
                } else {
                    rows[0].distributions = [];
                }

                // GET CATEGORIES
                let categoryRelations = await getRelationsByArr(
                    rows[0].movies.map((el) => Number(el.id)),
                    "categoryRelation",
                    "movieID"
                );
                if (categoryRelations.rows.length) {
                    const resp = await getCategories(
                        categoryRelations.rows.map((el) => el.categoryid)
                    );
                    rows[0].categories = resp.rows;
                } else {
                    rows[0].categories = [];
                }
            } else {
                rows[0].studios = [];
                rows[0].distributions = [];
                rows[0].categories = [];
            }

            // GET TAGS
            let tagRelations = await getRelations(
                Number(id),
                "tagRelation",
                "actorID"
            );
            if (tagRelations.rows.length) {
                const resp = await getTags(
                    tagRelations.rows.map((el) => el.tagid)
                );
                rows[0].tags = resp.rows;
            } else {
                rows[0].tags = [];
            }

            // GET NATIONALITY
            let nationalityRelations = await getRelations(
                Number(id),
                "nationalityRelation",
                "actorID"
            );
            if (nationalityRelations.rows.length) {
                rows[0].nationalities = nationalityRelations.rows.map(
                    (el) => el.nationality
                );
            } else {
                rows[0].nationalities = [];
            }

            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: "Actor not found" });
        }
    } catch (err) {
        console.log("ERROR!!", err);
        return res.status(err.code).json({ message: err.message });
    }
}

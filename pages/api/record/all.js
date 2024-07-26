import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllMoviesWithInfosByIDS } from "@/src/application/db/utils/item.js";
import { getAllRecords } from "@/src/application/db/utils/record.js";

import { sortByObjNumberValue } from "@/src/application/utils/orderData";
import { onlyUnique } from "@/src/application/utils/parsers";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            const { rows } = await getAllRecords(client);

            // extract all movieIDs from rows and reduce to unique values
            let onlyMovieIds = rows.map((el) => el.movieid);
            const unique = onlyUnique(onlyMovieIds);

            // for those values make db req to movies table
            // get movies with all infos about actors, categories and tags
            let allMovies = await getAllMoviesWithInfosByIDS(client, unique);

            await commit(client);

            // connect every el of rows to its movie
            let parsedRecords = rows.map((el) => {
                return {
                    ...el,
                    movie: allMovies.rows.filter((e) => e.id === el.movieid)[0],
                };
            });

            // count how many records exists for every movie
            const moviesCount = {};
            rows.forEach((el) => {
                moviesCount[el.movieid] = (moviesCount[el.movieid] || 0) + 1;
            });
            let moviesRecords = [];
            Object.entries(moviesCount).map(([key, val]) => {
                let relatedMovie = allMovies.rows.filter(
                    (el) => Number(el.id) === Number(key)
                );

                moviesRecords.push({ ...relatedMovie[0], totalRecords: val });
            });

            // count how many records every actor, category and tag has

            // sono sicuro che tutta questa parte sia abbreviabile in un unico loop per certi pezzi 🧠
            // forse si puo evitare anche la parte di creazione e loop di questi arrays qua sotto 🧠
            const allActors = [];
            const allCategories = [];
            const allTags = [];

            moviesRecords.map((movie) => {
                if (movie.actors) {
                    movie.actors.map((el) => {
                        allActors.push({
                            ...el,
                            totalRecords: movie.totalRecords,
                        });
                    });
                }
                if (movie.categories) {
                    movie.categories.map((el) => {
                        allCategories.push({
                            ...el,
                            totalRecords: movie.totalRecords,
                        });
                    });
                }
                if (movie.tags) {
                    movie.tags.map((el) => {
                        allTags.push({
                            ...el,
                            totalRecords: movie.totalRecords,
                        });
                    });
                }
            });

            // actors
            const actorsCount = {};
            allActors.forEach((el) => {
                actorsCount[el.id] =
                    (actorsCount[el.id] || 0) + el.totalRecords;
            });

            let actorsRecords = [];
            Object.entries(actorsCount).map(([key, val]) => {
                let relatedActor = allActors.filter(
                    (el) => Number(el.id) === Number(key)
                );

                actorsRecords.push({ ...relatedActor[0], totalRecords: val });
            });

            // categories
            const categoriesCount = {};
            allCategories.forEach((el) => {
                categoriesCount[el.id] =
                    (categoriesCount[el.id] || 0) + el.totalRecords;
            });

            let categoriesRecords = [];
            Object.entries(categoriesCount).map(([key, val]) => {
                let relatedCategory = allCategories.filter(
                    (el) => Number(el.id) === Number(key)
                );

                categoriesRecords.push({
                    ...relatedCategory[0],
                    totalRecords: val,
                });
            });

            // tags
            const tagsCount = {};
            allTags.forEach((el) => {
                tagsCount[el.id] = (tagsCount[el.id] || 0) + el.totalRecords;
            });

            let tagsRecords = [];
            Object.entries(tagsCount).map(([key, val]) => {
                let relatedTag = allTags.filter(
                    (el) => Number(el.id) === Number(key)
                );

                tagsRecords.push({
                    ...relatedTag[0],
                    totalRecords: val,
                });
            });

            // order by totalRecords desc
            moviesRecords = sortByObjNumberValue(
                moviesRecords,
                "totalRecords",
                "desc"
            );
            actorsRecords = sortByObjNumberValue(
                actorsRecords,
                "totalRecords",
                "desc"
            );
            categoriesRecords = sortByObjNumberValue(
                categoriesRecords,
                "totalRecords",
                "desc"
            );
            tagsRecords = sortByObjNumberValue(
                tagsRecords,
                "totalRecords",
                "desc"
            );

            res.status(200).send({
                records: parsedRecords,
                moviesRecords,
                actorsRecords,
                categoriesRecords,
                tagsRecords,
            });
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(401).send({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

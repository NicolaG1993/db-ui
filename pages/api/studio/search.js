import {
    getAllStudios,
    getAllMoviesWithInfos,
} from "@/src/application/db/db.js";
import { deleteJSONEmptyArrays } from "@/src/application/utils/parsers";

export default async function handler(req, res) {
    let { str, filters } = req.query;
    if (!str) {
        str = "";
    }

    // parse filters
    if (filters) {
        filters = deleteJSONEmptyArrays(filters);
    }

    function getUniqueListBy(arr, key) {
        if (arr) {
            return [...new Map(arr.map((item) => [item[key], item])).values()];
        } else {
            return [];
        }
    } // farne utils! 🧠

    try {
        // GET DATA AND PARSE WITH INFOS //
        const { rows } = await getAllStudios(str); // [{id: 1, movies: [{id:1}, {}]},  ..]
        const allMovies = await getAllMoviesWithInfos(
            str,
            500,
            0,
            "movie.title ASC"
        ); // [{id: 1, cast: [{}, {}, ..], ..}, {id: 2}, ..]

        // loopo attravers tutti gli studi
        let finalObj = rows.map((studio) => {
            // ottengo un array con tutti gli id delle movies di studio
            let stMoviesIDs = [];
            if (studio.movies) {
                studio.movies.map((stMovie) => stMoviesIDs.push(stMovie.id)); // [1,2,...]
                // studio.movies.map((stMovie) => stMovie.id === );
            }

            // ottengo solo le movie che hanno un id incluso in stMoviesIDs
            let relatedMovies = allMovies.rows.filter((movie) =>
                stMoviesIDs.includes(movie.id)
            );
            // da queste estraggo tutti i cast, per valori unici
            let allCasts = [];
            if (relatedMovies) {
                relatedMovies.map(
                    (movie) =>
                        movie.cast && movie.cast.map((mo) => allCasts.push(mo))
                ); // [[{id: 1}, {}], [{}, {}]]
            }
            let stActors = getUniqueListBy(allCasts, "id");

            // const stActors = [...new Set(allCasts.flat())];

            return { ...studio, actors: stActors };
        });

        // let finalObj = rows;
        // console.log("ROWS!", rows);

        // FILTER DATA //
        if (filters) {
            let { actors, nationalities } = filters;

            if (actors) {
                finalObj = finalObj.filter((studio) => {
                    if (studio.actors) {
                        const actorsNames = studio.actors.map(
                            (actor) => actor.name
                        ); // arr of actors names for studio
                        // console.log("🐟🐟 actorsNames: ", actorsNames);
                        if (actors.length > 1) {
                            return actors.every((el) =>
                                actorsNames.includes(el)
                            );
                        } else {
                            return actorsNames.some((el) =>
                                actors.includes(el)
                            );
                        }
                    }
                });
            }

            if (nationalities) {
                finalObj = finalObj.filter((studio) => {
                    if (nationalities.length > 1) {
                        return nationalities.every((el) => {
                            if (el === "N/A" && !studio.nationalities) {
                                return true;
                            } else if (studio.nationalities) {
                                return studio.nationalities.includes(el);
                            }
                        });
                    } else {
                        if (
                            !studio.nationalities &&
                            nationalities.includes("N/A")
                        ) {
                            return true;
                        } else if (studio.nationalities) {
                            return studio.nationalities.some(
                                (el) => nationalities[0] === el
                            );
                        }
                    }
                });
            }
        }

        res.status(200).send(finalObj);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err.message });
    }
}

/**
 * prendere tutti gli studios con nationality e movies ids
 * prendere tutte le movies con info relative a actors
 * abbinare movies a studio.movies.id
 * devo poi ottenere una lista di tutte actors presenti in studio.movies objects
 */

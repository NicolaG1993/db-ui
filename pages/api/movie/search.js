// import { searchMovies } from "@/utils/db/db";
import { getAllMoviesWithInfos } from "@/utils/db/db";
import { filtersParser } from "@/utils/parsers";
// import { search } from "@/utils/db/db";

export default async function handler(req, res) {
    let { str, filters } = req.query;
    if (!str) {
        str = "";
    }

    // parse filters
    if (filters) {
        filters = filtersParser(filters);
    }

    try {
        const { rows } = await getAllMoviesWithInfos(str);
        // const { rows } = await searchMovies(str, actors, ...);  // implement this instead of filtering here

        let finalObj = rows;
        if (filters) {
            let {
                actors,
                categories,
                tags,
                studios,
                distributions,
                // nationalities,
            } = filters;

            if (actors) {
                // actors = actors.map((el) => el.id);
                // console.log("actors filter: ", actors); // [1,2,3]
                // console.log("rows[0].cast: ", rows[0].cast); // [{id: 1, name, ""}, ...]
                finalObj = finalObj.filter((movie) => {
                    if (movie.cast) {
                        const castNames = movie.cast.map((model) => model.name); // arr of cast names for movie
                        if (actors.length > 1) {
                            return actors.every((el) => castNames.includes(el));
                        } else {
                            return castNames.some((el) => actors.includes(el));
                        }
                    }
                });
            }

            if (categories) {
                // categories = categories.map((el) => el.id);
                finalObj = finalObj.filter((movie) => {
                    if (movie.categories) {
                        const categoriesNames = movie.categories.map(
                            (cat) => cat.name
                        );
                        if (categories.length > 1) {
                            return categories.every((el) =>
                                categoriesNames.includes(el)
                            );
                        } else {
                            return categoriesNames.some((el) =>
                                categories.includes(el)
                            );
                        }
                    }
                });
            }

            if (tags) {
                //tags dovrebbe filtrare anche tags di actors ?
                // no perché vengono salvati gia in movie quelli necessari
                // tags = tags.map((el) => el.id);

                finalObj = finalObj.filter((movie) => {
                    if (movie.tags) {
                        const tagsNames = movie.tags.map((tag) => tag.name);
                        if (tags.length > 1) {
                            return tags.every((el) => tagsNames.includes(el));
                        } else {
                            return tagsNames.some((el) => tags.includes(el));
                        }
                    }
                });
            }

            if (studios) {
                // studios = studios.map((el) => el.id);
                finalObj = finalObj.filter((movie) => {
                    if (movie.studios) {
                        const studioNames = movie.studios.map(
                            (cat) => cat.name
                        );
                        if (studios.length > 1) {
                            return studios.every((el) =>
                                studioNames.includes(el)
                            );
                        } else {
                            return studioNames.some((el) =>
                                studios.includes(el)
                            );
                        }
                    }
                });
            }

            if (distributions) {
                // distributions = distributions.map((el) => el.id);
                finalObj = finalObj.filter((movie) => {
                    if (movie.distributions) {
                        const distributionNames = movie.distributions.map(
                            (dist) => dist.name
                        );
                        if (distributions.length > 1) {
                            return distributions.every((el) =>
                                distributionNames.includes(el)
                            );
                        } else {
                            return distributionNames.some((el) =>
                                distributions.includes(el)
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

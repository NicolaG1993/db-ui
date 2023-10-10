import { filterAllActorsWithInfos } from "@/src/application/db/db.js";
import { deleteJSONEmptyArrays } from "@/src/application/utils/parsers";

export default async function handler(req, res) {
    try {
        let { str, filters, page, step, order } = req.query;
        let offset = 0;
        let orderString = "actor.name ASC";

        if ((page, step, order, filters)) {
            offset = step * (page - 1);

            if (order === "name") {
                orderString = "actor.name ASC";
            }
            if (order === "name_reversed") {
                orderString = "actor.name DESC";
            }
            if (order === "rating") {
                orderString = "actor.rating DESC";
            }
            if (order === "rating_reversed") {
                orderString = "actor.rating ASC";
            }
            if (order === "birthday") {
                orderString = "actor.birthday DESC";
            }
            if (order === "birthday_reversed") {
                orderString = "actor.birthday ASC";
            }
            if (order === "movies") {
                orderString = "actor.name ASC";
            }
            if (order === "movies_reversed") {
                orderString = "actor.name ASC";
            }
            // questi valori si potrebbero settare in un file separato, sia valori che fn x if

            if (!str) {
                str = "";
            }

            if (filters) {
                // parse filters
                filters = deleteJSONEmptyArrays(filters);
            }
            let { categories, tags, studios, distribution, nationalities } =
                filters;

            const { rows } = await filterAllActorsWithInfos(
                str,
                Number(step),
                Number(offset),
                orderString,
                tags,
                nationalities
            );
            res.status(200).send(rows);
        }
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }

    /*
    try {
        let { str, filters, page, step, order } = req.query;

        if (!str) {
            str = "";
        }
        if (filters) {
            // parse filters
            filters = deleteJSONEmptyArrays(filters);
        }

        const { rows } = await getAllActorsWithInfos(str);
        let finalObj = rows;

        if (filters) {
            let { categories, tags, studios, distribution, nationalities } =
                filters;

            if (categories) {
                // ... search categories from movies array in actor
            }

            if (tags) {
                //tags dovrebbe filtrare anche tags di movies ?
                // penso di si

                // tags = tags.map((el) => el.id);
                finalObj = finalObj.filter((actor) => {
                    if (actor.tags) {
                        const tagsNames = actor.tags.map((tag) => tag.name);
                        if (tags.length > 1) {
                            return tags.every((el) => tagsNames.includes(el));
                        } else {
                            return tagsNames.some((el) => tags.includes(el));
                        }
                    }
                });
            }

            if (studios) {
                // ... search studios from movies array in actor
            }

            if (distribution) {
                // ... search distribution from movies array in actor
            }

            if (nationalities) {
                // ... search nationalities from actor
                finalObj = finalObj.filter((actor) => {
                    if (nationalities.length > 1) {
                        return nationalities.every((el) => {
                            if (el === "N/A" && !actor.nationalities) {
                                return true;
                            } else if (actor.nationalities) {
                                return actor.nationalities.includes(el);
                            }
                        });
                    } else {
                        if (
                            !actor.nationalities &&
                            nationalities.includes("N/A")
                        ) {
                            return true;
                        } else if (actor.nationalities) {
                            return actor.nationalities.some(
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
    */
}

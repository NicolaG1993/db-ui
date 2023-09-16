import { getAllActorsWithInfos } from "@/utils/db/db";
import { filtersParser } from "@/utils/parsers";

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
}

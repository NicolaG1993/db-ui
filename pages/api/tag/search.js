import { getAllTags } from "@/src/lib/db/db";
import { deleteJSONEmptyArrays } from "@/src/lib/domains/_app/actions/parsers";

export default async function handler(req, res) {
    let { str, filters } = req.query;
    if (!str) {
        str = "";
    }

    // parse filters
    if (filters) {
        filters = deleteJSONEmptyArrays(filters);
    }

    try {
        const { rows } = await getAllTags(str);
        let finalObj = rows;
        // console.log("ROWS!", rows);

        if (filters) {
            let { type } = filters;
            // si possono selezionare piú tags per allargare la ricerca

            if (type) {
                finalObj = finalObj.filter((tag) => {
                    return type.some((el) =>
                        el === "No Type" ? !tag.type : el === tag.type
                    );
                    // se type é "No Type" torniamo i tag che non hanno type definito
                    // altrimenti torniamo solo tag che hanno tag.type uguale a type
                });
            }
        }
        // .....
        res.status(200).send(finalObj);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err.message });
    }
}

import { getAllCategories } from "@src/application/db/db.js";
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
        const { rows } = await getAllCategories(str);
        let finalObj = rows;
        // console.log("ROWS!", rows);

        if (filters) {
            let { type } = filters;
            // si possono selezionare piú categories per allargare la ricerca

            if (type) {
                finalObj = finalObj.filter((cat) => {
                    return type.some((el) =>
                        el === "No Type" ? !cat.type : el === cat.type
                    );
                    // se type é "No Type" torniamo cat che non hanno type definito
                    // altrimenti torniamo solo cat che hanno cat.type uguale a type
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

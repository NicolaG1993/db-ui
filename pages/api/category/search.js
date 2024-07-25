import { begin, commit, rollback, release } from "@/src/application/db/db.js";
import { getAllCategories } from "@/src/application/db/utils/item.js";
import { deleteJSONEmptyArrays } from "@/src/application/utils/parsers";

export default async function handler(req, res) {
    if (req.method === "GET") {
        let { str, filters } = req.query;
        if (!str) {
            str = "";
        }

        // parse filters
        if (filters) {
            filters = deleteJSONEmptyArrays(filters);
        }

        const client = await connect();
        try {
            await begin(client);
            const { rows } = await getAllCategories(client, str);
            await commit(client);
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

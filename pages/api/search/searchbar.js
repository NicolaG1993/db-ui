import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import {
    getAllActorsWithInfos,
    getAllMoviesWithInfos,
    searchStudios,
} from "@/src/application/db/utils/item.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        let { str, table } = req.query;
        console.log("QUERY: ", str);
        const client = await connect();
        try {
            await begin(client);
            let response;
            if (table === "movie") {
                response = await getAllMoviesWithInfos(
                    client,
                    str,
                    10,
                    0,
                    "movie.title ASC"
                );
            } else if (table === "actor") {
                response = await getAllActorsWithInfos(
                    client,
                    str,
                    10,
                    0,
                    "actor.name ASC"
                );
            } else if (table === "studio") {
                response = await searchStudios(
                    client,
                    str,
                    10,
                    0,
                    "movie.title ASC"
                );
            }

            console.log("RESPONSE: ", str);
            await commit(client);
            res.status(200).send({ data: response.rows });
        } catch (err) {
            await rollback(client);
            console.log(err);
            res.status(500).send({ message: "ERROR" });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import { getAllStudios } from "@/src/application/db/utils/item.js";
import { getAllRelations } from "@/src/application/db/utils/utils.js";
import { mapStudiosRawToStudios } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = await connect();
        try {
            await begin(client);
            const { rows } = await getAllStudios(client, "");
            const allRelations = await getAllRelations(client, "movie_studio");

            let finalObj = rows.map((o) => {
                let count = allRelations.rows.filter(
                    (rel) => rel.studioid === o.id
                ).length;
                return { ...o, count: count };
            });
            await commit(client);
            const mappedStudios = mapStudiosRawToStudios(finalObj);

            res.status(200).send(mappedStudios);
        } catch (err) {
            await rollback(client);
            console.log("API ERROR: ", err);
            res.status(401).send({ message: err.message });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

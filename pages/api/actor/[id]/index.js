import { getActorByID } from "@/src/application/db/db.js";
import { mapActorRawToActor } from "@/src/domains/el/utils/mapData";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        let { rows } = await getActorByID(Number(id));
        // if (rows?.length) {
        let actor = mapActorRawToActor(rows[0]);
        res.status(200).json(actor);
        // } else {
        //     res.status(404).json({ message: "Actor not found" });
        //     // 🧠 forse 404 ritorna lo stesso senza questa condition 🧠
        // }
    } catch (err) {
        console.log("ERROR!!", err);
        return res.status(err.code).json({ message: err.message });
    }
}

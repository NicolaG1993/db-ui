import { getAllForRelations } from "@/src/lib/db/db";

export default async function handler(req, res) {
    try {
        const { rows } = await getAllForRelations(); // todo 🧠
        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

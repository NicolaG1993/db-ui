import { getAllStudios, getAllRelations } from "@/src/application/db/db.js";
export default async function handler(req, res) {
    try {
        const { rows } = await getAllStudios("");
        const allRelations = await getAllRelations("movie_studio");

        let finalObj = rows.map((o) => {
            let count = allRelations.rows.filter(
                (rel) => rel.studioid === o.id
            ).length;
            return { ...o, count: count };
        });

        res.status(200).send(finalObj);
    } catch (err) {
        console.log("API ERROR: ", err);
        res.status(401).send({ message: err.message });
    }
}

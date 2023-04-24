import { getAllTags, getAllRelations } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        const { rows } = await getAllTags("");
        const allRelations = await getAllRelations("tagRelation");

        // per ogni tag cerchiamo il numero totale di relations col suo id, solo dove é riferito a movie!!!
        let finalObj = rows.map((o) => {
            let count = allRelations.rows.filter(
                (rel) => rel.movieid && rel.tagid === o.id
            ).length;
            return { ...o, count: count };
        });

        res.status(200).send(finalObj);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

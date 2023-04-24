import { getAllCategories, getAllRelations } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        const { rows } = await getAllCategories("");
        const allRelations = await getAllRelations("categoryRelation");

        // per ogni category cerchiamo il numero totale di relations col suo id
        let finalObj = rows.map((o) => {
            let count = allRelations.rows.filter(
                (rel) => rel.categoryid === o.id
            ).length;
            return { ...o, count: count };
        });

        res.status(200).send(finalObj);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

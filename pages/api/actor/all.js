import { getAllActorsWithInfos } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let { str, page, step, order } = req.query;
        console.log("💚💚 req.query: ", req.query);
        if (!str) {
            str = "";
        }

        if ((page, step, order)) {
            let offset = step * (page - 1);

            let orderString = "actor.name ASC";
            if (order === "name") {
                orderString = "actor.name ASC";
            }
            if (order === "name_reversed") {
                orderString = "actor.name DESC";
            }
            if (order === "rating") {
                orderString = "actor.rating DESC";
            }
            if (order === "rating_reversed") {
                orderString = "actor.rating ASC";
            }
            if (order === "birthday") {
                orderString = "actor.birthday DESC";
            }
            if (order === "birthday_reversed") {
                orderString = "actor.birthday ASC";
            }
            if (order === "movies") {
                orderString = "actor.name ASC";
            }
            if (order === "movies_reversed") {
                orderString = "actor.name ASC";
            }
            // questi valori si potrebbero settare in un file separato, sia valori che fn x if

            const { rows } = await getAllActorsWithInfos(
                str,
                Number(step),
                Number(offset),
                orderString
            );
            res.status(200).send(rows);
        }
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

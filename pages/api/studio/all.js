import { getAllStudios } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        const { rows } = await getAllStudios("");
        res.status(200).send(rows);
    } catch (err) {
        console.log("API ERROR: ", err);
        res.status(401).send({ message: err.message });
    }
}

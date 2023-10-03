import { getAllMovies } from "@/src/lib/db/db";

export default async function handler(req, res) {
    try {
        const { rows } = await getAllMovies();
        let movie = rows[Math.floor(Math.random() * rows.length)];
        res.status(200).send(movie);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

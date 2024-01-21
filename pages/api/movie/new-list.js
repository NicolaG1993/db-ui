import { newMoviesFromUrls } from "@/src/application/db/db.js";

export default async function handler(req, res) {
    let { newElements } = req.body;
    let parsedObj = JSON.stringify(newElements);
    // parsedObj = parsedObj.replaceAll('"', "'");

    console.log("🌶️ parsedObj: ", parsedObj);
    try {
        // url deve essere una stringa, sql query la trasforma in text[] in automatico
        const { rows } = await newMoviesFromUrls(parsedObj);
        console.log("💚 rows: ", rows);
        res.status(200).json(rows);
    } catch (err) {
        console.log("ERROR!!", err);
        res.status(500).send({
            message: ["Error updating on the server"],
            error: err,
        });
    }
}

import { newPlaylist, newRelations } from "@/src/application/db/db.js";
export default async function handler(req, res) {
    const { title, playlist, user } = req.body;
    try {
        //create playlist
        const { rows } = await newPlaylist(title, user);
        // create movie relations
        await newRelations(
            rows[0].id,
            playlist.map((el) => el.id),
            "movie_playlist",
            "playlistID",
            "movieID"
        );
        res.status(200).send({ message: "DONE" });
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}

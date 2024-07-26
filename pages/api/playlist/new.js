import {
    connect,
    begin,
    commit,
    rollback,
    release,
} from "@/src/application/db/db.js";
import {
    newPlaylist,
    newPlaylistRelations,
} from "@/src/application/db/utils/playlist.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        // const { title, playlist, user } = req.body;
        const { title, userID, movies } = req.body;
        console.log("🔴🟡💚 BODY: ", {
            title,
            userID,
            movies,
        });

        const client = await connect();

        try {
            await begin(client);
            // Step 1: Insert the new playlist and get its ID
            const { rows } = await newPlaylist(client, title, userID);
            const newPlaylistID = rows[0].id;
            // Step 2: Prepare the values for bulk insert
            const movieValues = movies
                .map(
                    (movie, index) =>
                        `(${movie.id}, ${newPlaylistID}, ${index})`
                )
                .join(",");
            // Step 3: Insert movies into the movie_playlist table in a single query
            await newPlaylistRelations(client, movieValues);
            /*
            await newRelations(
                newPlaylistID,
                movies.map((el) => el.id),
                "movie_playlist",
                "playlistID",
                "movieID"
            );
            */
            await commit(client);
            res.status(200).send({
                success: true,
                message: "DONE", // ? delete ?
                playlistId: newPlaylistID,
            });
        } catch (err) {
            console.log(err);
            await rollback(client);
            res.status(500).send({
                success: false,
                message: "Internal Server Error",
            });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    // 🧠 add error 401: Unauthorized access ?
}

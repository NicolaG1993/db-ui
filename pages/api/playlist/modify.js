/*
import {
    editPlaylist,
    newRelations,
    deleteRelations,
} from "@/src/application/db/db.js";

export default async function handler(req, res) {
    const {
        id,
        title,
        // playlistContent,
        user,
        addedRelations,
        removedRelations,
    } = req.body;

    try {
        //edit playlist
        if (title) {
            await editPlaylist(Number(id), title, Number(user));
        }

        // create relations
        let relations = {};
        if (addedRelations?.length) {
            const res = await newRelations(
                id,
                addedRelations,
                "movie_playlist",
                "playlistID",
                "movieID"
            );
            relations.added = res.rows;
        } else {
            relations.added = [];
        }
        // delete relations
        if (removedRelations?.length) {
            const res = await deleteRelations(
                id,
                removedRelations,
                "movie_playlist",
                "playlistID",
                "movieID"
            );
            relations.removed = res.rows;
        } else {
            relations.removed = [];
        }

        res.status(200).send({ message: "DONE" });
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "ERROR" });
    }
}
*/

import {
    begin,
    commit,
    rollback,
    release,
    connect,
} from "@/src/application/db/db.js";
import {
    getPlaylistWithInfos,
    editPlaylistTitle,
    editPlaylistMovieIndex,
    newPlaylistRelation,
    removePlaylistRelation,
} from "@/src/application/db/utils/playlist.js";
import comparePlaylists from "@/src/domains/playlists/utils/comparePlaylists";
/*
export default async function handler(req, res) {
    
    if (req.method === "PUT") {
        const { playlistID, title, updates } = req.body;
        const client = await connect();

        try {
            await begin(client);

            // Update the playlist title
            if (title) {
                await editPlaylistTitle(client, title, playlistID);
            }

            // Apply updates to the playlist
            for (const update of updates) {
                if (update.type === "updateIndex") {
                    // Update a movie's index
                    await editPlaylistMovieIndex(
                        client,
                        update.index,
                        playlistID,
                        update.movieID
                    );
                } else if (update.type === "addMovie") {
                    // Add a new movie to the playlist
                    await newPlaylistRelation(
                        client,
                        update.movieID,
                        playlistID,
                        update.index
                    );
                } else if (update.type === "removeMovie") {
                    // Remove a movie from the playlist
                    await removePlaylistRelation(
                        client,
                        playlistID,
                        update.movieID
                    );
                }
            }

            await commit(client);
            res.status(200).json({ success: true });
        } catch (error) {
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
        

    
}
*/
export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { playlistID, userID, newPlaylist, title } = req.body;

        const client = await connect();
        try {
            await begin(client);

            // Fetch the current playlist and its movies from the database
            const currentPlaylistResult = await getPlaylistWithInfos(
                client,
                Number(playlistID),
                Number(userID)
            );

            if (currentPlaylistResult.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    error: "Playlist not found",
                });
                return;
            }

            const currentPlaylist = currentPlaylistResult.rows[0];
            currentPlaylist.movies = currentPlaylist.movies || [];

            // Compare the current playlist with the new playlist table to generate updates
            const updates = comparePlaylists(
                currentPlaylist,
                newPlaylist,
                title
            );

            // Apply the updates to the playlist
            for (const update of updates) {
                if (update.type === "updateTitle") {
                    await editPlaylistTitle(client, update.title, playlistID);
                } else if (update.type === "updateIndex") {
                    await editPlaylistMovieIndex(
                        client,
                        playlistID,
                        update.movieID,
                        update.index
                    );
                } else if (update.type === "addMovie") {
                    await newPlaylistRelation(
                        client,
                        update.movieID,
                        playlistID,
                        update.index
                    );
                } else if (update.type === "removeMovie") {
                    await removePlaylistRelation(
                        client,
                        playlistID,
                        update.movieID
                    );
                }
            }

            await commit(client);
            res.status(200).json({ success: true });
        } catch (error) {
            await rollback(client);
            console.error("Error updating playlist", error);
            res.status(500).json({
                success: false,
                error: "Internal Server Error",
            });
        } finally {
            release(client);
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

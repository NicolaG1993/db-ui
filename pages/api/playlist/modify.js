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

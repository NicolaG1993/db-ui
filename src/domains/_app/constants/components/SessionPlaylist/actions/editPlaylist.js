import axios from "axios";
import parsePlaylistRelationsEdit from "@/src/domains/_app/constants/components/SessionPlaylist/utils/parsePlaylistRelationsEdit.js";

/*
export default async function editPlaylist(
    match,
    title,
    newPlaylist,
    userInfo
) {
    console.log("editPlaylist invoked: ", {
        match,
        title,
        newPlaylist,
        userInfo,
    });
    // get original playlist from db first
    const id = match.id;
    let originalPlaylist = await axios.get(`/api/playlist/${id}`, {
        params: { user: userInfo.id },
    });
    originalPlaylist = originalPlaylist.data;
    console.log("originalPlaylist: ", originalPlaylist);

    // find new and deleted relations
    let relationsObj = {};
    relationsObj = parsePlaylistRelationsEdit(newPlaylist, originalPlaylist); // FIXME // relations changes not working 🧨
    console.log("relationsObj: ", relationsObj);
    if (
        relationsObj?.addedRelations ||
        relationsObj?.removedRelations ||
        title
    ) {
        // edit playlist and/or relations
        let res = await axios.put("/api/playlist/modify", {
            id,
            title,
            // playlistContent: newPlaylist,
            ...relationsObj,
            user: userInfo.id,
        });

        console.log("res: ", res);
        return { res, message: "completed", done: true };
    } else {
        return { res, message: "no changes detected", done: false };
    }
}
*/

export default async function editPlaylist({
    playlistID,
    title,
    newPlaylist,
    userInfo,
}) {
    let updates = []; // todo
    // we need the original playlist to find and parse changes 🧠
    // maybe handle this part in component via utils 🧠

    const body = { playlistID, title, updates };

    let res = await axios.put("/api/playlist/modify", body);

    return { res, message: "completed", done: true };
}

const example = {
    playlistID: 1,
    title: "Updated Playlist Title",
    updates: [
        {
            type: "updateIndex",
            movieID: 1,
            index: 2,
        },
        {
            type: "addMovie",
            movieID: 4,
            index: 3,
        },
        {
            type: "removeMovie",
            movieID: 2,
        },
    ],
};

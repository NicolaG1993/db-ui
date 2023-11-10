import axios from "axios";
import parsePlaylistRelationsEdit from "@/src/domains/_app/constants/components/SessionPlaylist/utils/parsePlaylistRelationsEdit.js";

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
    let originalPlaylist = await axios.get(`/api/playlist/${match.id}`); // TEST 🧨
    console.log("originalPlaylist: ", originalPlaylist);
    originalPlaylist = originalPlaylist.data;

    // find new and deleted relations
    let relationsObj = {};
    relationsObj = parsePlaylistRelationsEdit(newPlaylist, originalPlaylist); // TEST 🧨

    if (
        relationsObj?.addedRelations ||
        relationsObj?.removedRelations ||
        title
    ) {
        // edit playlist and/or relations
        let res = await axios.post("/api/playlist/modify", {
            id: match.id,
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

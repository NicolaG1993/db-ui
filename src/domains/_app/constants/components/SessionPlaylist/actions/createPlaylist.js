import axios from "axios";

export default async function createPlaylist(title, newPlaylist, userInfo) {
    await axios.post("/api/playlist/new", {
        title,
        playlist: newPlaylist,
        user: userInfo.id,
    });
    return { message: "completed", done: true };
}

import axios from "axios";

export default async function createPlaylist(title, newPlaylist, userInfo) {
    await axios.post("/api/playlist/new", {
        title,
        movies: newPlaylist,
        userID: userInfo.id,
    });
    return { message: "completed", done: true };
}

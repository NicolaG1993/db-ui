import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

export default async function createPlaylist(title, newPlaylist, userInfo) {
    await axiosAuthInstance.post("/api/playlist/new", {
        title,
        movies: newPlaylist,
        userID: userInfo.id,
    });
    return { message: "completed", done: true };
}

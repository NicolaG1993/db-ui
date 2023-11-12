import axios from "axios";
export default async function deletePlaylist(id) {
    await axios.delete(`/api/playlist/delete`, {
        headers: {},
        data: { id },
    });
    return;
}

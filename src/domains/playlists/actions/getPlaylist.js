import axios from "axios";

export default async function getPlaylist(id, user) {
    const { data } = await axios.get(`/api/playlist/${id}`, {
        params: { user },
    });
    return data;
}

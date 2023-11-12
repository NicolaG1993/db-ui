import axios from "axios";
export default async function fetchAllPlaylists(str, user) {
    const { data } = await axios.get("/api/playlist/all", {
        params: { str, user },
    });
    return data;
}

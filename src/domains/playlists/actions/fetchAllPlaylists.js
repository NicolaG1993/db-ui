import axios from "axios";
export default async function fetchAllPlaylists() {
    const { data } = await axios.get("/api/playlist/all");
    return data;
}

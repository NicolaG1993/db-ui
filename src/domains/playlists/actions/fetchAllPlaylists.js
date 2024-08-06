import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

export default async function fetchAllPlaylists(str, user) {
    const { data } = await axiosAuthInstance.get("/api/playlist/all", {
        params: { str, user },
    });
    return data;
}

import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

export default async function getPlaylist(id, user) {
    const { data } = await axiosAuthInstance.get(`/api/playlist/${id}`, {
        params: { user },
    });
    return data;
}

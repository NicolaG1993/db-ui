import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

export default async function deletePlaylist(id) {
    await axiosAuthInstance.delete(`/api/playlist/delete`, {
        headers: {},
        data: { id },
    });
    return;
}

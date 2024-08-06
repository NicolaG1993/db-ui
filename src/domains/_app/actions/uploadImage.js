import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

export default function uploadImage(obj, group) {
    let formData = new FormData();
    formData.append("image", obj);
    formData.append("folder", group);
    return axiosAuthInstance.post("/api/pic/single-upload", formData, {
        headers: {
            "content-type": "multipart/form-data",
            // authorization: `Bearer ${userInfo.token}`, // 🧠
        },
    });
}

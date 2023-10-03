import axios from "axios";

export default function uploadImage(obj, group) {
    let formData = new FormData();
    formData.append("image", obj);
    formData.append("folder", group);
    return axios.post("/api/pic/single-upload", formData, {
        headers: {
            "content-type": "multipart/form-data",
            // authorization: `Bearer ${userInfo.token}`, // 🧠
        },
    });
}

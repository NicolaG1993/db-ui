import axios from "axios";

export default function uploadImage(obj) {
    let formData = new FormData();
    formData.append("image", obj);
    formData.append("folder", form.group);
    return axios.post("/api/pic/single-upload", formData, {
        headers: {
            "content-type": "multipart/form-data",
            // authorization: `Bearer ${userInfo.token}`, // 🧠
        },
    });
}

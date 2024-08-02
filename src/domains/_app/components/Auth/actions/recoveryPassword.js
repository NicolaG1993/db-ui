import axios from "axios";

export default async function recoveryPassword(email) {
    const { data } = await axios.post("/api/user/recover", {
        email,
    });
    return data;
}

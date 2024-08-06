import axios from "axios";

export default async function resetPassword(password, token) {
    const { data } = await axios.post(`/api/user/reset/${token}`, {
        psw: password,
    });
    return data;
}

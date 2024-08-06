import axios from "axios";

export default async function verifyUser(token) {
    const { data } = await axios.get(`/api/user/verify?token=${token}`);
    return data;
}

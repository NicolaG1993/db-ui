import axios from "axios";

export default async function createUser(name, email, password) {
    const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
    });
    return data;
}

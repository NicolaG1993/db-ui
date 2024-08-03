import axios from "axios";

export default async function loginUser(email, password) {
    const { data } = await axios.post("/api/user/login", {
        email,
        password,
    });
    console.log("loginUser data: ", { data });
    return data;
}

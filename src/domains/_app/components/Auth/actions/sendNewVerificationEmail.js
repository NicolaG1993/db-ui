import axios from "axios";

export default async function sendNewVerificationEmail(email) {
    // check if email or token as arg - meglio usare sempre email?
    const { data } = await axios.post("/api/user/verify/resend-verification", {
        // token,
        email,
    });
    return data;
}

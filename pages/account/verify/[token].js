import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

export default function VerifyEmail() {
    const router = useRouter();
    // const dispatch = useDispatch();
    const { token } = router.query;

    const [error, setError] = useState(false);
    const [response, setResponse] = useState();
    // const [newEmailSent, setNewEmailSent] = useState(false);

    useEffect(() => {
        if (token) {
            axios
                .get(`/api/user/verify?token=${token}`)
                .then((res) => {
                    setResponse(res.message);
                })
                .catch((err) => {
                    setResponse(err.response.data.error || "An error occurred");
                    setError(true);
                });
        }
    }, [token]);

    // Make user do this trought login form, using their email 🧠🔴🔴
    // const handleResendVerification = async (token) => {
    //     try {
    //         await axios.post("/api/user/verify/resend-verification", { token });
    //         setNewEmailSent(true);
    //     } catch (error) {
    //         alert(
    //             "Failed to resend verification email, please reload the page to try again."
    //         );
    //         setError(true);
    //     }
    // };

    return (
        <div>
            <h1>Account activation</h1>
            <div>
                {response ? (
                    !error ? (
                        <>
                            <h2>Error</h2>
                            <p>{response}</p>
                            <button onClick={() => router.push("/")}>
                                Go back to login
                            </button>
                        </>
                    ) : (
                        <>
                            <p>{response}</p>
                            <button onClick={() => router.push("/")}>
                                Proceed to login
                            </button>
                        </>
                    )
                ) : (
                    <>
                        <p>Verifing your email, just a moment...</p>
                    </>
                )}
            </div>
        </div>
    );
}

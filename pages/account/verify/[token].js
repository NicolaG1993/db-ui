import verifyUser from "@/src/domains/_app/components/Auth/actions/verifyUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function VerifyEmail() {
    const router = useRouter();
    // const dispatch = useDispatch();
    const { token } = router.query;

    const [error, setError] = useState(false);
    const [response, setResponse] = useState();
    // const [newEmailSent, setNewEmailSent] = useState(false);

    useEffect(() => {
        if (token) {
            handleToken(token)
                .then((message) => {
                    setResponse(message);
                })
                .catch((err) => {
                    setResponse(err.message);
                    setError(true);
                });
        }
    }, [token]);

    const handleToken = async (token) => {
        try {
            const res = await verifyUser(token);
            return res.message;
        } catch (err) {
            const errorCode = err.response?.data?.code;
            const errorMessage = err.response?.data?.error;
            if (errorCode === "INVALID_TOKEN") {
                alert(errorMessage);
                throw new Error(errorMessage);
            } else {
                alert("Server error, try again.");
                throw new Error(err.response.data.error || "An error occurred");
            }
        }
    };

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
                            <Button
                                size="medium"
                                type="button"
                                label="Go back to login"
                                customStyles={customStyles}
                                href={"/"}
                            />
                        </>
                    ) : (
                        <>
                            <p>{response}</p>
                            <Button
                                size="medium"
                                type="button"
                                label="Proceed to login"
                                customStyles={customStyles}
                                href={"/"}
                            />
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

import { useState } from "react";
// import { useDispatch } from "react-redux";
import styles from "@/src/domains/_app/components/Auth/AuthModal.module.css";
import // selectUserState,
// userLogin,
"@/src/application/redux/slices/userSlice.js";
import { emailValidation } from "@/src/application/utils/validateForms.js";
import { getError } from "@/src/application/utils/error.js";
// import loginUser from "@/src/domains/_app/components/Auth/actions/loginUser.js";
import { useRouter } from "next/router";
import sendNewVerificationEmail from "../actions/sendNewVerificationEmail";
import InputText from "@/src/domains/_app/components/Inputs/InputText/InputText";

export default function EmailNotVerifiedForm({ handleTab }) {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState();
    const [sendingNewEmail, setSendingNewEmail] = useState(false);

    const router = useRouter();

    const validateData = (e) => {
        e.preventDefault();
        const { id, name, value } = e.target;
        let newErrObj = { ...errors };
        if (id === "Email") {
            const resp = emailValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSendingNewEmail(true);
        if (Object.keys(errors).length === 0) {
            try {
                await sendNewVerificationEmail(email);
                setResponse(
                    "New verification email sent. You can close this tab and follow the link inside the verification email to activate your account. For any issue contact us: example@example.com"
                );
                // dispatch(userLogin(resp));
                // router.push("/");
            } catch (err) {
                console.log("Login error: ", err);
                alert(getError(err));
                // alert(
                //     "Failed to resend verification email, please reload the page to try again."
                // );

                const errorCode = err.response?.data?.code;
                const errorMessage = err.response?.data?.error;
                if (errorCode === "EMAIL_NOT_FOUND") {
                    // TODO: email is not registered in db, user has to create account!
                    alert(errorMessage);
                    setErrors({
                        ...errors,
                        response: errorMessage,
                    });
                } else if (
                    errorCode === "EMAIL_VERIFIED" ||
                    errorCode === "VERIFICATION_SENT"
                ) {
                    alert(errorMessage);
                    setErrors({
                        ...errors,
                        response: errorMessage,
                    });
                } else {
                    console.log("Login error: ", err);
                    alert("Server error, try again.");
                    setErrors({
                        ...errors,
                        response: "Server error, try again",
                        // response: getError(err),
                    });
                }
            }
        }
        setSendingNewEmail(false);
    };

    return (
        <div className={styles.formBox}>
            {!response ? (
                <>
                    <h1>Email not verified</h1>
                    <p>
                        To activate your account follow the link in the
                        verification email we sent you.
                    </p>
                    <p>You can always request a new verification link here.</p>

                    {sendingNewEmail ? (
                        <p>Sending new verification email...</p>
                    ) : (
                        <>
                            <form
                                className={styles.form}
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <div className={styles.inputWrap}>
                                    <InputText
                                        type="email"
                                        name="email"
                                        id="Email"
                                        isMandatory={true}
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        onBlur={(e) => validateData(e)}
                                        error={errors.email}
                                    />
                                </div>
                                <div className={styles.buttonWrap}>
                                    <button className="button-standard">
                                        Send new email
                                    </button>
                                </div>
                            </form>
                            <p
                                className={styles.changeTab}
                                onClick={() => handleTab("login")}
                            >
                                Back to login
                            </p>
                        </>
                    )}
                </>
            ) : errors.response ? (
                <>
                    <h2>Error</h2>
                    <p>{errors.response}</p>
                    <button onClick={() => handleTab("login")}>Go back</button>
                </>
            ) : (
                <>
                    <p>{response}</p>
                    <button onClick={() => handleTab("login")}>Go back</button>
                </>
            )}
        </div>
    );
}

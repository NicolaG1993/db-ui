// import Link from "next/link";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/src/domains/_app/components/Auth/AuthModal.module.css";
import {
    // selectUserState,
    userLogin,
} from "@/src/application/redux/slices/userSlice.js";
import { emailValidation } from "@/src/application/utils/validateForms.js";
// import { getError } from "@/src/application/utils/error.js";
import loginUser from "@/src/domains/_app/components/Auth/actions/loginUser.js";

import { Button, InputText } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function LoginForm({ handleTab }) {
    //================================================================================
    // Component State
    //================================================================================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    // const [loginError, setLoginError] = useState();

    // const router = useRouter();
    const dispatch = useDispatch();
    // let userInfo = useSelector(selectUserState, shallowEqual);
    // if (userInfo) {
    //     router.push("/");
    // }

    //================================================================================
    // Functions
    //================================================================================
    const validateData = (e) => {
        const { id, name, value } = e.target;

        let error = "";
        if (id === "Email") {
            error = emailValidation(value);
        } else if (id === "Password" && !value) {
            error = "Password is required";
        }

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (error) {
                newErrors[name] = error;
            } else {
                delete newErrors[name];
            }
            return newErrors;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Clear the error for the field that is being typed in
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[name];
            return newErrors;
        });

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate email
        const emailError = emailValidation(email);
        if (emailError) {
            setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
            isValid = false;
        }

        // Validate password
        if (!password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password is required",
            }));
            isValid = false;
        }

        if (isValid) {
            try {
                const resp = await loginUser(email, password);
                dispatch(userLogin(resp));
                // router.push("/");
            } catch (err) {
                const errorCode = err.response?.data?.code;
                const errorMessage = err.response?.data?.error;
                if (errorCode === "EMAIL_NOT_VERIFIED") {
                    handleTab("notVerified");
                } else if (
                    errorCode === "EMAIL_NOT_FOUND" ||
                    errorCode === "INVALID_LOGIN"
                ) {
                    alert(errorMessage);
                } else {
                    alert("Server error, try again.");
                }
            }
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <div className={styles.formBox}>
            <h1>Login</h1>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputWrap}>
                    <InputText
                        type="email"
                        name="email"
                        id="Email"
                        label={true}
                        isMandatory={true}
                        value={email}
                        onChange={handleChange}
                        onBlur={validateData}
                        error={errors.email}
                        customStyles={customStyles}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <InputText
                        type="password"
                        name="password"
                        id="Password"
                        label={true}
                        isMandatory={true}
                        value={password}
                        onChange={handleChange}
                        onBlur={validateData}
                        error={errors.password}
                        customStyles={customStyles}
                    />
                </div>
                <div className={styles.buttonWrap}>
                    <Button
                        type="submit"
                        disabled={errors.email || errors.password}
                        size="medium"
                        label="Login"
                        customStyles={customStyles}
                    />
                </div>
            </form>

            <p className={styles.changeTab} onClick={() => handleTab("signin")}>
                I don&apos;t have an account
            </p>
            <p
                className={styles.changeTab}
                onClick={() => handleTab("recovery")}
            >
                I have lost my password
            </p>
        </div>
    );
}

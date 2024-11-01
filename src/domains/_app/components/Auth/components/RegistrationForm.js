// import Link from "next/link";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/src/domains/_app/components/Auth/AuthModal.module.css";
import {
    // selectUserState,
    userLogin,
} from "@/src/application/redux/slices/userSlice.js";
import {
    emailValidation,
    nicknameValidation,
    passwordValidation,
    confirmPassword,
} from "@/src/application/utils/validateForms.js";
// import { getError } from "@/src/application/utils/error.js";
import createUser from "@/src/domains/_app/components/Auth/actions/createUser.js";
import { Button, InputText } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function RegistrationForm({ handleTab }) {
    //================================================================================
    // Component State
    //================================================================================
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({});

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
        e.preventDefault();
        const { id, name, value } = e.target;

        let newErrObj = { ...errors };
        if (id === "Name") {
            const resp = nicknameValidation("name", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Email") {
            const resp = emailValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Password") {
            const resp = passwordValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                const resp = confirmPassword(value, passwordConfirm);
                if (resp) {
                    setErrors({ ...newErrObj, confirmPassword: resp });
                } else {
                    delete newErrObj.confirmPassword;
                    setErrors(newErrObj);
                }
            }
        }
        if (id === "ConfirmPassword") {
            const resp = confirmPassword(password, value);
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
        if (Object.keys(errors).length === 0) {
            try {
                const data = await createUser(userName, email, password);
                dispatch(userLogin(data)); // TODO: 🧠🔴 We should not login directly, but redirect to the login form (email verification required first!)
                // router.push("/");
            } catch (err) {
                const errorCode = err.response?.data?.code;
                const errorMessage = err.response?.data?.error;
                if (errorCode === "EMAIL_NOT_AVAILABLE") {
                    alert(errorMessage);
                } else {
                    console.log("Login error: ", err);
                    alert("Server error, try again.");
                }
            }
        }
    };

    //================================================================================
    // Render UI
    //================================================================================

    // Check Errors styles, they should match the errors in Item Forms 🧠 i think they are not matching now
    return (
        <div className={styles.formBox}>
            <h1>Create a new account</h1>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputWrap}>
                    <InputText
                        name="name"
                        id="Name"
                        label={true}
                        isMandatory={true}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onBlur={(e) => validateData(e)}
                        error={errors.name}
                        customStyles={customStyles}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <InputText
                        type="email"
                        name="email"
                        id="Email"
                        label={true}
                        isMandatory={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => validateData(e)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => validateData(e)}
                        error={errors.password}
                        customStyles={customStyles}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <InputText
                        type="password"
                        name="confirmPassword"
                        id="ConfirmPassword"
                        label="Confirm Password"
                        isMandatory={true}
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        onBlur={(e) => validateData(e)}
                        error={errors.confirmPassword}
                        customStyles={customStyles}
                    />
                </div>
                <div className={styles.buttonWrap}>
                    <Button
                        size="medium"
                        type="submit"
                        label="Create user"
                        customStyles={customStyles}
                    />
                </div>
            </form>

            <p className={styles.changeTab} onClick={() => handleTab("login")}>
                I already have an account
            </p>
        </div>
    );
}

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
import { getError } from "@/src/application/utils/error.js";
import loginUser from "@/src/domains/_app/components/Auth/actions/loginUser.js";

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
        if (Object.keys(errors).length === 0) {
            try {
                const resp = await loginUser(email, password);
                dispatch(userLogin(resp));
                // router.push("/");
            } catch (err) {
                console.log("Login error: ", err);
                alert(getError(err));

                const errorCode = err.response?.data?.code;
                if (errorCode === "EMAIL_NOT_VERIFIED") {
                    // router.push(`/unverified-email?email=${formData.email}`);
                    // router.push(`/account/verify`);
                    handleTab("notVerified");
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
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => validateData(e)}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.buttonWrap}>
                    <button className="button-standard">Login</button>
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

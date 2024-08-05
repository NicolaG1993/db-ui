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
import { getError } from "@/src/application/utils/error.js";
import createUser from "@/src/domains/_app/components/Auth/actions/createUser.js";
import InputText from "@/src/domains/_app/components/Inputs/InputText/InputText";

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
                dispatch(userLogin(data));
                // router.push("/");
            } catch (err) {
                console.log(err);
                alert(getError(err));
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
                        isMandatory={true}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onBlur={(e) => validateData(e)}
                        error={errors.name}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <InputText
                        type="email"
                        name="email"
                        id="Email"
                        isMandatory={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => validateData(e)}
                        error={errors.email}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <InputText
                        type="password"
                        name="password"
                        id="Password"
                        isMandatory={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => validateData(e)}
                        error={errors.password}
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
                    />
                </div>
                <div className={styles.buttonWrap}>
                    <button type="submit" className="button-standard">
                        Create user
                    </button>
                </div>
            </form>

            <p className={styles.changeTab} onClick={() => handleTab("login")}>
                I already have an account
            </p>
        </div>
    );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/src/domains/_app/components/Auth/AuthModal.module.css";
import { getError } from "@/src/application/utils/error";
import resetPassword from "@/src/domains/_app/components/Auth/actions/resetPassword.js";
import {
    confirmPassword,
    passwordValidation,
} from "@/src/application/utils/validateForms";
// import { userLogin } from "@/src/application/redux/slices/userSlice";
import { useRouter } from "next/router";
import InputText from "@/src/domains/_app/components/Inputs/InputText/InputText";

export default function PasswordResetForm({ handleTab, token }) {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({});

    // const dispatch = useDispatch();
    const router = useRouter();

    const validateData = (e) => {
        e.preventDefault();
        const { id, name, value } = e.target;
        let newErrObj = { ...errors };
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
                const data = await resetPassword(password, token);
                // dispatch(userLogin(data));
                setTimeout(() => router.push("/"), 3000); // Redirect to login after 3 seconds
            } catch (err) {
                const errorCode = err.response?.data?.code;
                const errorMessage = err.response?.data?.error;
                if (errorCode === "INVALID_TOKEN") {
                    alert(errorMessage);
                } else {
                    console.log("Reset Password error: ", err);
                    alert("Server error, try again.");
                }
            }
        }
    };
    return (
        <div className={styles.formBox}>
            <h1>Reset Password</h1>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputWrap}>
                    <InputText
                        type="password"
                        name="password"
                        id="Password"
                        label="New Password"
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
                        Confirm
                    </button>
                </div>
            </form>

            <p className={styles.changeTab} onClick={() => handleTab("login")}>
                Return to login
            </p>
        </div>
    );
}

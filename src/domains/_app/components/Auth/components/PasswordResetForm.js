import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/src/domains/_app/components/Auth/AuthModal.module.css";
import { getError } from "@/src/application/utils/error";
import resetPassword from "@/src/domains/_app/components/Auth/actions/resetPassword.js";
import {
    confirmPassword,
    passwordValidation,
} from "@/src/application/utils/validateForms";
import { userLogin } from "@/src/application/redux/slices/userSlice";
import { useRouter } from "next/router";

export default function PasswordResetForm({ handleTab, token }) {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
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
                alert(getError(err));
            }
        }
    };
    return (
        <div className={styles.formBox}>
            <h1>Reset Password</h1>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputWrap}>
                    <input
                        type="password"
                        placeholder="New Password*"
                        name="password"
                        id="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => validateData(e)}
                    />
                    {errors.password && (
                        <div className={styles["form-error"]}>
                            • {errors.password}
                        </div>
                    )}
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="password"
                        placeholder="Confirm Password*"
                        name="confirmPassword"
                        id="ConfirmPassword"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        onBlur={(e) => validateData(e)}
                    />
                    {errors.confirmPassword && (
                        <div className={styles["form-error"]}>
                            • {errors.confirmPassword}
                        </div>
                    )}
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

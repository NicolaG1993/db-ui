import { useState } from "react";
import styles from "@/src/domains/_app/components/Auth/AuthModal.module.css";
import { emailValidation } from "@/src/application/utils/validateForms";

export default function PasswordRecoveryForm({ handleTab }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const handleStep = (n) => setStep(n);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: ... 🚧🔴🔴🔴
    };

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
    /*
    if (step === 1) {
        // Enter email
        return (
            <div>
                <p>Reset Password: step {step}/3</p>
            </div>
        );
    } else if (step === 2) {
        // Enter code ?
        return (
            <div>
                <p>Reset Password: step {step}/3</p>
            </div>
        );
    } else if (step === 3) {
        // TODO: This should be separate from this process: PasswordResetForm 🔴🔴🔴
        // Reset password
        return (
            <div>
                <p>Reset Password: step {step}/3</p>
            </div>
        );
    }
        */

    return (
        <div className={styles.formBox}>
            <h1>Password Recovery</h1>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputWrap}>
                    <input
                        type="email"
                        placeholder="Email*"
                        name="email"
                        id="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => validateData(e)}
                    />
                    {errors.email && (
                        <div className={styles["form-error"]}>
                            • {errors.email}
                        </div>
                    )}
                </div>
                <div className={styles.buttonWrap}>
                    <button type="submit" className="button-standard">
                        Recover Password
                    </button>
                </div>
            </form>

            <p className={styles.changeTab} onClick={() => handleTab("login")}>
                Go back
            </p>
        </div>
    );
}

import { useState } from "react";
import styles from "@/src/domains/_app/components/Auth/AuthModal.module.css";
import { emailValidation } from "@/src/application/utils/validateForms";
import { getError } from "@/src/application/utils/error";
import recoveryPassword from "../actions/recoveryPassword";
import { Button, InputText } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function PasswordRecoveryForm({ handleTab }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

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
                const data = await recoveryPassword(email);
                setStep(2);
                // dispatch(userLogin(data));
                // router.push("/");
            } catch (err) {
                const errorCode = err.response?.data?.code;
                const errorMessage = err.response?.data?.error;
                if (
                    errorCode === "EMAIL_NOT_FOUND" ||
                    errorCode === "EMAIL_NOT_VERIFIED"
                ) {
                    alert(errorMessage);
                } else {
                    console.log("Login error: ", err);
                    alert("Server error, try again.");
                }
            }
        }
    };

    if (step === 1) {
        return (
            <div className={styles.formBox}>
                <h1>Password Recovery</h1>

                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
                            customStyles={customStyles}
                        />
                    </div>
                    <div className={styles.buttonWrap}>
                        <Button
                            type="submit"
                            size="medium"
                            label="Recover Password"
                            customStyles={customStyles}
                        />
                    </div>
                </form>

                <p
                    className={styles.changeTab}
                    onClick={() => handleTab("login")}
                >
                    Go back
                </p>
            </div>
        );
    } else if (step > 1) {
        // Enter code ?
        return (
            <div>
                <p>Password recovery email sent. Please check your email.</p>
                <p>You can close this tab.</p>
            </div>
        );
    }
}

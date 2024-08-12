import { useRouter } from "next/router";
import styles from "./ErrorApp.module.css";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function ErrorApp({ error, resetErrorBoundary }) {
    const router = useRouter();
    // const { resetBoundary } = useErrorBoundary();

    const reloadPage = () => resetErrorBoundary();
    // const reloadPage = () => router.reload();
    const goHome = async () => {
        await router.push("/");
        router.reload();
        // resetErrorBoundary();
    };

    return (
        <div id={styles.ErrorApp}>
            <div className={styles["error-wrap"]}>
                <div>
                    {/* <p>Code:</p> */}
                    <p className={styles["error-code"]}>
                        {error.code || `OwO`}
                    </p>
                </div>
                <div className={styles["error-message-wrap"]}>
                    <p className={styles["error-message-label"]}>Error: </p>
                    <p className={styles["error-message-value"]}>
                        {error.message}
                    </p>
                </div>
            </div>

            <div className={styles["user-message-wrap"]}>
                <p className={styles["user-message"]}>
                    It seams like the application has crashed! {"Oooopf... :("}
                    <br />
                    Please consider reporting any bug or unexpected behaviour.{" "}
                    <br />
                    It would really help us to improve your experience, thanks!
                </p>
            </div>

            <div className={styles["buttons-wrap"]}>
                <Button
                    size="medium"
                    type="button"
                    label="Reload Page"
                    customStyles={customStyles}
                    onClick={reloadPage}
                />
                <Button
                    size="medium"
                    type="button"
                    label="Return to the Home Page"
                    customStyles={customStyles}
                    onClick={goHome}
                />
            </div>
        </div>
    );
}

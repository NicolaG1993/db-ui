import { useRouter } from "next/router";
import styles from "./ErrorApp.module.css";

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
                <button onClick={reloadPage} className="button-standard">
                    Reload Page
                </button>
                <button onClick={goHome} className="button-standard">
                    Return to the Home Page
                </button>
            </div>
        </div>
    );
}

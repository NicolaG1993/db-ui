import { useRouter } from "next/router";
import styles from "./ErrorApp.module.css";
import { useErrorBoundary } from "react-error-boundary";

export default function ErrorApp({ error, resetErrorBoundary }) {
    const router = useRouter();
    const { resetBoundary } = useErrorBoundary();

    const reloadPage = () => router.reload();
    const goHome = () => {
        router.push("/");
        resetBoundary();
    };

    return (
        <div id={styles.ErrorApp}>
            <div className={styles["error-wrap"]}>
                <div>
                    {/* <p>Code:</p> */}
                    <p className={styles["error-code"]}>{error.code}</p>
                </div>
                <div className={styles["error-message-wrap"]}>
                    <p className={styles["error-message-label"]}>Error: </p>
                    <p className={styles["error-message-value"]}>
                        {error.message}
                    </p>
                </div>
                <div className={styles["error-btns"]}>
                    <button onClick={reloadPage} className="button-standard">
                        Reload Page
                    </button>
                    <button onClick={goHome} className="button-standard">
                        Return to the Home Page
                    </button>
                </div>
            </div>
        </div>
    );
}

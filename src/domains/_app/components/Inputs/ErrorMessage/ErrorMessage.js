import styles from "@/src/domains/_app/components/Inputs/ErrorMessage/ErrorMessage.module.css";

export default function ErrorMessage({ error }) {
    return <div className={styles["error-message"]}>{"• " + error}</div>;
}

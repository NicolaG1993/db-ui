import styles from "@/src/domains/tournament/Tournament.module.css";

export default function MatchContender({ contender }) {
    return (
        <div className={styles.contenderCard}>
            <span>Contender: {contender?.id || "N/A"}</span>
        </div>
    );
}

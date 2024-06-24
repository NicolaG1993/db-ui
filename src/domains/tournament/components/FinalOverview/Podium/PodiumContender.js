import styles from "@/src/domains/tournament/Tournament.module.css";

export default function PodiumContender({ pos, contender }) {
    return (
        <div className={styles.podiumContender}>
            <p>
                {pos} {pos === 1 ? "🥇" : pos === 2 ? "🥈" : "🥉"}{" "}
                {contender?.title}
            </p>
        </div>
    );
}

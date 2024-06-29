import styles from "@/src/domains/tournament/Tournament.module.css";

export default function PodiumContender({ pos, contender }) {
    let customStyleName = pos === 1 ? "gold" : pos === 2 ? "silver" : "bronze";
    return (
        <div
            className={
                styles.finalOverviewContender + " " + styles[customStyleName]
            }
        >
            <div>
                <span className={styles.medal}>
                    {pos === 1 ? "🥇" : pos === 2 ? "🥈" : "🥉"}
                </span>
                <span>#{contender?.id}</span>
                <span>{contender?.title}</span>
            </div>
        </div>
        // <div className={styles.finalOverviewContender}>
        //     <p>
        //         {pos === 1 ? "🥇" : pos === 2 ? "🥈" : "🥉"} {contender?.title}
        //     </p>
        // </div>
    );
}

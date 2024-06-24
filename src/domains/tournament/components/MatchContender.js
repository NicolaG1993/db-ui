import styles from "@/src/domains/tournament/Tournament.module.css";

export default function MatchContender({
    contender,
    index,
    matchId,
    isStarted,
    isFirstStage,
    isError,
    openSelectNav,
    closeSelectNav,
    onClickContender,
    isWinner,
    isEliminated,
}) {
    console.log("➡️➡️➡️➡️ contender: ", contender);
    if (contender?.id) {
        if (!isStarted && isFirstStage) {
            return (
                <div className={styles.contenderWrap}>
                    <div
                        className={styles.contenderCardSelect}
                        onClick={() => openSelectNav({ contender, index })}
                    >
                        <span>✅ Contender: #{contender.id}</span>
                    </div>
                </div>
            );
        } else {
            // contender and contender.id not updating after changes 🔴 // 🧠 still happening? 🧠

            const { title, pic, rating, cast } = contender;
            return (
                <div className={styles.contenderWrap}>
                    <div
                        className={`${styles.contenderCard} ${
                            isWinner
                                ? styles.winner
                                : isEliminated
                                ? styles.eliminated
                                : ""
                        }`}
                        onClick={() => onClickContender({ winner: contender })}
                    >
                        {/* 🔴🧠 <span>Contender: {matchId * (index + 1)}</span>
                        🧠 maybe add index to every contender on initTournament */}
                        <div className={styles.contenderInfo}>
                            <span className={styles.contenderId}>
                                #{contender.id}
                            </span>
                            <div className={styles.contenderTitleWrap}>
                                <span className={styles.contenderTitle}>
                                    {title}
                                </span>
                            </div>
                            <span className={styles.contenderRating}>
                                {rating}
                            </span>
                            <div className={styles.contenderCastWrap}>
                                <span className={styles.contenderCast}>
                                    {cast.map((act, i, array) =>
                                        i + 1 === array.length
                                            ? `${act.name}`
                                            : `${act.name}, `
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contenderProps}>
                        <div>+</div>
                        <div>-</div>
                    </div>
                </div>
            );
        }
    } else if (isFirstStage) {
        return (
            <div
                className={`${styles.contenderWrap} ${
                    isError ? styles.isError : ""
                }`}
            >
                <div
                    className={styles.contenderCardSelect}
                    onClick={() => openSelectNav({ contender: null, index })}
                >
                    <span>➡️ Select contender</span>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={`${styles.contenderWrap} ${
                    isError ? styles.isError : ""
                }`}
            >
                <div className={styles.contenderCardNA}>
                    <span>Contender: {"N/A"}</span>
                </div>
            </div>
        );
    }
}

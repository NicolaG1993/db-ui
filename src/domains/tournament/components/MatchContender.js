import styles from "@/src/domains/tournament/Tournament.module.css";
import Image from "next/image";
import { detectImage } from "../../_app/utils/parsers";
import { useState } from "react";
import Link from "next/link";

const getVoteEmoji = (vote) => {
    if (vote === 0) {
        return;
    } else if (vote === 1) {
        return "➕";
    } else if (vote === 2) {
        return "➕➕";
    } else if (vote === 3) {
        return "⭐";
    } else if (vote === 4) {
        return "⭐⭐";
    } else if (vote === 5) {
        return "⭐⭐⭐";
    } else if (vote === 6) {
        return "🔥";
    } else if (vote === -1) {
        return "➖";
    } else if (vote === -2) {
        return "➖➖";
    } else if (vote === -3) {
        return "🥱";
    } else if (vote === -4) {
        return "😪";
    } else if (vote === -5) {
        return "💩";
    } else if (vote === -6) {
        return "❌";
    }
};

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
    const [vote, setVote] = useState(0); // move in store inside match contender ? 🧠

    const handleUpVote = () => {
        setVote((prev) => prev + 1);
    };
    const handleDownVote = () => {
        setVote((prev) => prev - 1);
    };

    // console.log("➡️➡️➡️➡️ contender: ", contender);
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
                                    {cast?.map((act, i, array) =>
                                        i + 1 === array.length
                                            ? `${act.name}`
                                            : `${act.name}, `
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className={styles.contenderPicWrap}>
                            <Image
                                src={pic ? pic : detectImage(contender)}
                                alt="Picture of the contender"
                                width={70}
                                height={70}
                            />
                            <span className={styles.openContender}>
                                <Link
                                    href={`/el/movie/${contender.id}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    📄
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className={styles.contenderProps}>
                        <button
                            type="button"
                            disabled={vote >= 6}
                            onClick={() =>
                                handleUpVote({ id: contender.id, index })
                            }
                        >
                            +
                        </button>
                        <button
                            type="button"
                            disabled={vote <= -6}
                            onClick={() =>
                                handleDownVote({ id: contender.id, index })
                            }
                        >
                            -
                        </button>
                        <span className={styles.contenderVote}>
                            {getVoteEmoji(vote)}
                        </span>
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

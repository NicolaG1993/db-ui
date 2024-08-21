import styles from "@/src/domains/tournament/Tournament.module.css";
import Image from "next/image";
import { detectImage } from "@/src/domains/_app/utils/parsers";
import Link from "next/link";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

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
    stageId,
    isStarted,
    isReady,
    isFirstStage,
    isError,
    openSelectNav,
    closeSelectNav,
    onClickContender,
    isWinner,
    isEliminated,
    handleVote,
}) {
    if (contender?.id) {
        if (!isStarted && isFirstStage) {
            return (
                <div className={styles.contenderWrap}>
                    <div
                        className={styles.contenderCardSelect}
                        onClick={() => openSelectNav({ contender, index })}
                    >
                        <div
                            style={{
                                position: "relative",
                            }}
                            className={styles.picWrap}
                        >
                            <Image
                                src={
                                    contender.pic
                                        ? contender.pic
                                        : detectImage(contender)
                                }
                                alt={contender.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div className={styles.infoWrap}>
                            <span>✅ Contender: #{contender.id}</span>
                            <h5>{contender.title}</h5>
                            <p className={styles.subtitle}>
                                {contender.actors &&
                                    contender.actors.map((actor, i) => (
                                        <span key={`actor ${actor.name} ${i}`}>
                                            {i > 0 && ", "}
                                            {actor.name}
                                        </span>
                                    ))}
                            </p>
                        </div>
                    </div>
                </div>
            );
        } else {
            // contender and contender.id not updating after changes 🔴 // 🧠 still happening? 🧠

            const { title, pic, rating, actors } = contender;
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
                        onClick={() => isReady && onClickContender()}
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
                                    {actors?.map((act, i, array) =>
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
                        <Button
                            size="mini"
                            type="button"
                            label="+"
                            customStyles={customStyles}
                            disabled={contender.vote >= 6}
                            onClick={() =>
                                isReady &&
                                handleVote({
                                    direction: "up",
                                    stageId,
                                    matchId,
                                    contenderId: contender.id,
                                })
                            }
                        />
                        <Button
                            size="mini"
                            type="button"
                            label="-"
                            customStyles={customStyles}
                            disabled={contender.vote <= -6}
                            onClick={() =>
                                isReady &&
                                handleVote({
                                    direction: "down",
                                    stageId,
                                    matchId,
                                    contenderId: contender.id,
                                })
                            }
                        />
                        <span className={styles.contenderVote}>
                            {getVoteEmoji(contender.vote)}
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

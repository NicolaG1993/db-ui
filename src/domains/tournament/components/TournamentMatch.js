import styles from "@/src/domains/tournament/Tournament.module.css";
import MatchContender from "./MatchContender";
import generateTableSequences from "../utils/generateTableSequences";

export default function TournamentMatch({
    match,
    matchKey,
    tableRows,
    index,
    matchesLength,
    rowSequence,
}) {
    // generateTableSequences(tableRows);
    // 🔴🧠🔴🧠 Usare e abbinare a stages - ma non so dove

    let stageArea = {};

    /*
    if (tableRows / 2 === matchesLength) {
        stageArea = {
            gridRowStart: (tableRows / matchesLength) * index - 1,
            gridRowEnd: (tableRows / matchesLength) * index + 1,
        };
    } else {
        stageArea = {
            gridRowStart: (tableRows / matchesLength) * index - 2,
            gridRowEnd: (tableRows / matchesLength) * index,
        };
    }
    */

    stageArea = {
        gridRowStart: rowSequence ? rowSequence[index - 1] : "unset",
        gridRowEnd: rowSequence ? rowSequence[index - 1] + 2 : "unset",
    };

    /*
    Quanti match abbiamo? -> matchesLength
    Uguali, meta, etcc ? di totRows ?
    crea fn
    */

    return (
        <div className={styles.match} style={stageArea}>
            <span>Match: {match.matchId}</span>
            {match.contenders.map((contender, i) => (
                <MatchContender
                    key={
                        "Tournament contender " +
                        match.matchId +
                        " " +
                        (contender?.id || "undefined " + (i + 1))
                    }
                    contender={contender}
                />
            ))}
        </div>
    );
}

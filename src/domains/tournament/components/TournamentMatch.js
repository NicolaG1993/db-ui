import styles from "@/src/domains/tournament/Tournament.module.css";
import MatchContender from "./MatchContender";
import generateTableSequences from "../utils/generateTableSequences";
import { useEffect, useRef, useState } from "react";
import {
    selectTournamentSetup,
    setMatchWinner,
} from "@/src/application/redux/slices/tournamentSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ContenderSelect from "./ContenderSelect";

export default function TournamentMatch({
    match,
    matchKey,
    tableRows,
    index,
    matchesLength,
    rowSequence,
    isFirstStage,
    isStarted,
    isRightSide,
    stageMatches,
    stage,
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
    const dispatch = useDispatch();
    const [isSelectNavOpen, setIsSelectNavOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedContender, setSelectedContender] = useState(false);
    const [selectedContenderIndex, setSelectedContenderIndex] = useState(false);

    const openSelectNav = ({ contender, index }) => {
        setIsSelectNavOpen(true);
        !!contender && setSelectedContender(contender);
        setSelectedContenderIndex(index);
    };
    const closeSelectNav = () => {
        setIsSelectNavOpen(false);
        setSelectedContender();
        setSelectedContenderIndex();
    };
    const handleMatchResult = ({ winner }) => {
        dispatch(
            setMatchWinner({
                stage,
                match,
                winner,
            })
        );
    };

    const handleUpVote = () => {
        // todo...
    };
    const handleDownVote = () => {
        // todo...
    };

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!isSelectNavOpen) return;
        function handleClick(event) {
            // console.log("handleClick: ", { dropdownRef, event });
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                // console.log("handleClick condition PASSED!");
                closeSelectNav();
            }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
    }, [isSelectNavOpen]);

    return (
        <div className={styles.match} style={stageArea} ref={dropdownRef}>
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
                    index={i}
                    matchId={match.matchId}
                    isStarted={isStarted}
                    isFirstStage={isFirstStage}
                    openSelectNav={openSelectNav}
                    closeSelectNav={closeSelectNav}
                    onClickContender={handleMatchResult}
                    isWinner={match.winner && match.winner.id === contender.id}
                    isEliminated={
                        match.winner && match.winner.id !== contender.id
                    }
                    handleUpVote={handleUpVote}
                    handleDownVote={handleDownVote}
                />
            ))}
            {isSelectNavOpen && (
                <ContenderSelect
                    currentContender={selectedContender}
                    currentContenderIndex={selectedContenderIndex}
                    match={match}
                    stageMatches={stageMatches}
                    refreshSelectNav={openSelectNav}
                    closeSelectNav={closeSelectNav}
                    isRightSide={isRightSide}
                />
            )}
        </div>
    );
}

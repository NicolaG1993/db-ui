import { useEffect, useRef, useState } from "react";
import styles from "@/src/domains/tournament/Tournament.module.css";
import ContenderSelect from "./ContenderSelect";
import MatchContender from "./MatchContender";
// import generateTableSequences from "../utils/generateTableSequences";
// import {
//     selectTournamentSetup,
//     setMatchWinner,
//     updateVote,
// } from "@/src/application/redux/slices/tournamentSlice";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function TournamentMatch({
    match,
    // matchKey,
    // tableRows,
    index,
    // matchesLength,
    rowSequence,
    isFirstStage,
    isStarted,
    isRightSide,
    stageMatches,
    stage,
    setup,
    notSelectedData,
    handleUpdateSelected,
    handleUpdateUnselected,
    handleMatchResult,
    handleVote,
    customStyles,
}) {
    let stageArea = {};

    stageArea = {
        gridRowStart: rowSequence ? rowSequence[index - 1] : "unset",
        gridRowEnd: rowSequence ? rowSequence[index - 1] + 2 : "unset",
    };

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
                    stageId={stage.stageId}
                    isStarted={isStarted}
                    isReady={
                        match.contenders.filter((el) => el === null).length ===
                        0
                    }
                    isFirstStage={isFirstStage}
                    openSelectNav={openSelectNav}
                    closeSelectNav={closeSelectNav}
                    onClickContender={() =>
                        handleMatchResult({
                            stage,
                            match,
                            winner: contender,
                        })
                    }
                    isWinner={match.winner && match.winner.id === contender.id}
                    isEliminated={
                        match.winner && match.winner.id !== contender.id
                    }
                    handleVote={handleVote}
                    customStyles={customStyles}
                />
            ))}
            {isSelectNavOpen && (
                <ContenderSelect
                    currentContender={selectedContender}
                    currentContenderIndex={selectedContenderIndex}
                    match={match}
                    stageMatches={stageMatches}
                    // refreshSelectNav={openSelectNav}
                    closeSelectNav={closeSelectNav}
                    isRightSide={isRightSide}
                    setup={setup}
                    notSelectedData={notSelectedData}
                    handleUpdateSelected={handleUpdateSelected}
                    handleUpdateUnselected={handleUpdateUnselected}
                    customStyles={customStyles}
                />
            )}
        </div>
    );
}

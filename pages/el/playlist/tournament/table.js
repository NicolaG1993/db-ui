import {
    selectTournamentStructure,
    selectTournamentSetup,
    selectMatchError,
    selectTournamentIsStarted,
    initNextMatch,
    startTournament,
    selectTournamentData,
} from "@/src/application/redux/slices/tournamentSlice";
import TournamentStage from "@/src/domains/tournament/components/TournamentStage";
import styles from "@/src/domains/tournament/Tournament.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function TournamentTable() {
    const tournamentData = useSelector(selectTournamentData, shallowEqual);
    const tournamentStructure = useSelector(
        selectTournamentStructure,
        shallowEqual
    );
    const setup = useSelector(selectTournamentSetup, shallowEqual);
    const matchError = useSelector(selectMatchError, shallowEqual);
    const isStarted = useSelector(selectTournamentIsStarted, shallowEqual);
    const dispatch = useDispatch();

    const handleStart = () => dispatch(startTournament());
    const setupNextMatch = () => dispatch(initNextMatch());

    console.log("TournamentTable: ", { tournamentStructure, setup });

    // Create components and save in domain 🧠
    // should i use canvas???
    return (
        <main>
            <div className={styles.tournamentHeading}>
                <h1
                    onClick={
                        () => setupNextMatch() // delete
                    }
                >
                    Tournament Table
                </h1>
                {!isStarted && (
                    <>
                        <button
                            type="button"
                            onClick={() => handleStart()}
                            disabled={
                                tournamentData.length <
                                setup.firstStageTotMatches *
                                    setup.contendersPerMatch
                            }
                        >
                            START TOURNAMENT
                        </button>
                        <p>Select all contenders to procede</p>
                    </>
                )}
            </div>

            <div
                className={styles.tournamentTable}
                style={{
                    gridTemplateRows: `repeat(${setup.tableRows}, auto)`, // mettere "1fr"
                    gridTemplateColumns: `repeat(${setup.tableColumns}, auto)`,
                }}
            >
                {Object.entries(tournamentStructure).map(
                    ([stageKey, stage]) => (
                        <TournamentStage
                            key={"Tournament stage " + stage.stageId}
                            stage={stage}
                            stageKey={stageKey}
                            tableRows={setup.tableRows}
                            tableColumns={setup.tableColumns}
                            totStages={setup.totStages}
                            isStarted={isStarted}
                            isFinal={stage.stageName === "Final"}
                            isThirdPlace={stage.stageName === "3rd Place"}
                            isFirstStage={stageKey === "1"}
                            tableRowsSequences={setup.tableRowsSequences}
                            isError={matchError}
                        />
                    )
                )}

                {/* {Object.entries(tournamentStructure).map(
                    ([stageKey, stage], i) => (
                        <div
                            key={"Tournament stage " + stage.stageId}
                            className={styles.stage}
                            style={{
                                gridColumnStart:
                                    stageKey % 2 !== 0
                                        ? setup.tableColumns -
                                          (setup.tableColumns - stageKey)
                                        : setup.tableColumns - stageKey, // 🧠 create util
                                gridColumnEnd:
                                    stageKey % 2 !== 0
                                        ? setup.tableColumns -
                                          (setup.tableColumns - stageKey) +
                                          1
                                        : setup.tableColumns - stageKey + 1,
                            }}
                        >
                            {Object.entries(stage.stageMatches).map(
                                ([key, match], i) => (
                                    <div
                                        key={
                                            "Tournament match " + match.matchId
                                        }
                                        className={styles.match}
                                    >
                                        {match.contenders.map(
                                            (contender, i) => (
                                                <div
                                                    key={
                                                        "Tournament contender " +
                                                        match.matchId +
                                                        " " +
                                                        (contender?.id ||
                                                            "undefined " + i)
                                                    }
                                                    className={
                                                        styles.contenderCard
                                                    }
                                                >
                                                    <span>
                                                        Contender:{" "}
                                                        {contender?.id || "N/A"}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    )
                )} */}
            </div>

            {/* <div
                className={styles.tournamentTable}
                style={{
                    gridTemplateRows: `repeat(${
                        matches?.length / 2 || 1
                    }, 1fr)`,
                }}
            >
                {matches ? (
                    Object.entries(matches).map(([key, match], i, arr) => (
                        <div
                            key={"Tournament match " + i}
                            className={styles.match}
                            style={{
                                gridColumnStart: (i + 1) % 2 === 0 ? "3" : "1", // 🧠 create util
                                gridColumnEnd: (i + 1) % 2 === 0 ? "4" : "2",
                            }}
                        >
                            {Array.isArray(match) &&
                                match.map((el, i, arr) => (
                                    <div
                                        key={"Tournament el " + i}
                                        className={styles.contenderCard}
                                    >
                                        <span>Contender: {el.id}</span>
                                    </div>
                                ))}
                        </div>
                    ))
                ) : (
                    <p>Loading table...</p> // 🧠 we need case for reloading page or direct routing
                )}
            </div> */}
        </main>
    );
}

///////////////////////////// ELIMINARE 👇👇👇🔴🔴🔴🔴
/*
calcTournamentBranches(state.tournamentData, contendersPerMatch);

const calcTournamentBranches = (allContenders, contendersPerMatch) => {
    const totMatches = Math.ceil(allContenders / contendersPerMatch);

    // ...
    let finalResponse;

    do {} while (condition);

    calcNextBranch({
        currentStage: allContenders,
        totCurrentStageMatches: totMatches,
        contendersPerMatch,
    });
};

const calcNextBranch = ({
    currentStage,
    totCurrentStageMatches,
    contendersPerMatch,
}) => {
    const nextStageIsFinal = totCurrentStageMatches === 2;

    if (nextStageIsFinal) {
        return currentStage;
    } else {
        // return [[null, null], [null, null]]

        // group nextStage
        let nextStage = [];

        let matchAccumulator = [];
        currentStage.map((it, i, arr) => {
            matchAccumulator.push(it);
            if ((i + 1) % contendersPerMatch === 0 || arr.length - 1 === i) {
                nextStage.push(matchAccumulator);
                matchAccumulator = [];
            }
        });

        return nextStage;
    }
};
*/

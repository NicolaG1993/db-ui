import {
    selectTournamentStructure,
    selectTournamentSetup,
} from "@/src/application/redux/slices/tournamentSlice";
import styles from "@/src/domains/tournament/Tournament.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function TournamentTable() {
    const tournamentStructure = useSelector(
        selectTournamentStructure,
        shallowEqual
    );
    const setup = useSelector(selectTournamentSetup, shallowEqual);
    const dispatch = useDispatch();

    console.log("TournamentTable: ", { tournamentStructure, setup });

    const TournamentStage = ({
        stage,
        stageKey,
        tableRows,
        tableColumns,
        totStages,
        isFinal,
        isThirdPlace,
    }) => {
        console.log("TournamentStage: ", { stage });

        const filterKeys = (obj) => {
            // Create new empty objects to store the filtered key-value pairs
            const evenKeysObj = {};
            const oddKeysObj = {};

            // Iterate through the keys of the original object
            for (const key in obj) {
                // Check if the key is an even number
                if (Number(key) % 2 === 0) {
                    // If it's even, add the key-value pair to the evenKeysObj
                    evenKeysObj[key] = obj[key];
                } else {
                    // If it's odd, add the key-value pair to the oddKeysObj
                    oddKeysObj[key] = obj[key];
                }
            }

            // Return both objects
            return {
                evenKeys: evenKeysObj,
                oddKeys: oddKeysObj,
            };
        }; // create util 🧠

        const renderStageMatches = ({ matches }) => {
            console.log("matches: ", matches);
            return Object.entries(matches).map(([matchKey, match], i) => (
                <TournamentMatch
                    key={"Tournament match " + match.matchId}
                    match={match}
                    matchKey={matchKey} //rename? 🧠
                    isLeftSide={match.matchId % 2 !== 0}
                >
                    {match.matchId}
                </TournamentMatch>
            )); // render Contenders Cards 🧠
        };

        // create utils 🧠

        if (isFinal || isThirdPlace) {
            let stageAreaFinal = {
                gridColumnStart: totStages,
                gridColumnEnd: totStages + 1,
                gridRowStart: isThirdPlace ? 2 : 1,
                gridRowEnd: isThirdPlace ? 3 : 2,
            }; // TODO: not finished

            return (
                <div className={styles.stage} style={stageAreaFinal}>
                    {renderStageMatches({
                        matches: Object.entries(stage.stageMatches).map(
                            ([matchKey, match]) => ({ ...match, matchKey })
                        ),
                    })}
                </div>
            );
        } else {
            let stageArea = {
                gridRowStart: 1,
                gridRowEnd: -1,
                gridTemplateRows: `repeat(${tableRows}, auto)`,
            };

            let stageAreaLeft = {
                ...stageArea,
                gridColumnStart: tableColumns - (tableColumns - stageKey),
                gridColumnEnd: tableColumns - (tableColumns - stageKey) + 1,
            };
            let stageAreaRight = {
                ...stageArea,
                gridColumnStart: -Math.abs(
                    tableColumns - (tableColumns - stageKey)
                ),
                gridColumnEnd: -Math.abs(
                    tableColumns - (tableColumns - stageKey) - 1
                ),
            };

            let { evenKeys, oddKeys } = filterKeys(stage.stageMatches);

            return (
                <>
                    <div className={styles.stage} style={stageAreaLeft}>
                        {/* {stage} */}
                        {renderStageMatches({
                            matches: oddKeys,
                        })}
                    </div>
                    <div className={styles.stage} style={stageAreaRight}>
                        {/* {stage} */}
                        {renderStageMatches({
                            matches: evenKeys,
                        })}
                    </div>
                </>
            );
        }
    };

    const TournamentMatch = ({ match, matchKey }) => {
        return (
            <div className={styles.match}>
                <span>Match: {match.matchId}</span>
                {match.contenders.map((contender, i) => (
                    <MatchContender
                        key={
                            "Tournament contender " +
                            match.matchId +
                            " " +
                            (contender?.id || "undefined " + i)
                        }
                        contender={contender}
                    />
                ))}
            </div>
        );
    };

    const MatchContender = ({ contender }) => {
        return (
            <div className={styles.contenderCard}>
                <span>Contender: {contender?.id || "N/A"}</span>
            </div>
        );
    };

    // Create components and save in domain 🧠
    // should i use canvas???
    return (
        <main>
            <h1>Tournament Table</h1>

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
                            stageKey={stageKey}
                            tableRows={setup.tableRows}
                            tableColumns={setup.tableColumns}
                            totStages={setup.totStages}
                            isFinal={stage.stageName === "Final"}
                            isThirdPlace={stage.stageName === "3rd Place"}
                            stage={stage}
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

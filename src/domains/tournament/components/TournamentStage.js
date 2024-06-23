import filterKeys from "../utils/filterKeys";
import styles from "@/src/domains/tournament/Tournament.module.css";
import renderStageMatches from "../utils/renderStageMatches";

const extractSequence = (tableRowsSequences, stage, totStages) => {
    return tableRowsSequences[Number(stage - 1)];
};

export default function TournamentStage({
    stage,
    stageKey,
    tableRows,
    tableColumns,
    totStages,
    isStarted,
    isFirstStage,
    isFinal,
    isThirdPlace,
    tableRowsSequences,
    isError,
}) {
    // console.log("TournamentStage: ", {
    //     stage,
    //     stageKey,
    //     tableRows,
    //     tableColumns,
    //     totStages,
    //     isStarted,
    //     isFirstStage,
    //     isFinal,
    //     isThirdPlace,
    //     tableRowsSequences,
    //     isError,
    // });

    if (isFinal || isThirdPlace) {
        let stageAreaFinal = {
            gridColumnStart: totStages,
            gridColumnEnd: totStages + 1,
            // gridRowStart: isThirdPlace ? 2 : 1,
            gridRowStart: isThirdPlace ? tableRows / 2 + 3 : tableRows / 2,
            gridRowEnd: isThirdPlace ? tableRows / 2 + 5 : tableRows / 2 + 2,
            gridTemplateRows: `1fr`,
        }; // TODO: not finished

        return (
            <div className={styles.tableColumn} style={stageAreaFinal}>
                <p>{stage.stageName}</p>
                <div className={styles.stage}>
                    {renderStageMatches({
                        matches: stage.stageMatches,
                        tableRows,
                        isError,
                        // rowSequence: isThirdPlace
                        //     ? tableRowsSequences[totStages - 1]
                        //     : tableRowsSequences[totStages - 1],
                    })}
                    {/* {renderStageMatches({
                    // matches: Object.entries(stage.stageMatches).map(
                    //     ([matchKey, match]) => ({ ...match, matchKey })
                    // ),
                    matches: stage.stageMatches,
                    tableRows,
                    rowSequence: tableRowsSequences[-1],
                })} */}
                </div>
            </div>
        );
    } else {
        let stageArea = {
            gridRowStart: 1,
            gridRowEnd: -1,
        };
        /*
         let stageArea = {
            gridRowStart: tableRows - (tableRows - stageKey),
            gridRowEnd: tableRows - stageKey + 1,
        };
        */

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
                <div className={styles.tableColumn} style={stageAreaLeft}>
                    <p>{stage.stageName}</p>
                    <div
                        className={styles.stage}
                        style={{
                            gridTemplateRows: `repeat(${tableRows}, 1fr)`,
                        }}
                    >
                        {renderStageMatches({
                            matches: oddKeys,
                            tableRows,
                            rowSequence: extractSequence(
                                tableRowsSequences,
                                tableColumns - (tableColumns - stageKey)
                            ),
                            isStarted,
                            isFirstStage,
                            isError,
                            stage,
                        })}
                    </div>
                </div>
                <div className={styles.tableColumn} style={stageAreaRight}>
                    <p>{stage.stageName}</p>
                    <div
                        className={styles.stage}
                        style={{
                            gridTemplateRows: `repeat(${tableRows}, 1fr)`,
                        }}
                    >
                        {renderStageMatches({
                            matches: evenKeys,
                            tableRows,
                            rowSequence: extractSequence(
                                tableRowsSequences,
                                tableColumns - (tableColumns - stageKey)
                            ),
                            isStarted,
                            isFirstStage,
                            isError,
                            stage,
                        })}
                    </div>
                </div>
            </>
        );
    }
}

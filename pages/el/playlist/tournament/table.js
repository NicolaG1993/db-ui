import {
    selectTournamentStructure,
    selectTournamentSetup,
    selectMatchError,
    selectTournamentIsStarted,
    initNextMatch,
    startTournament,
    quitTournament,
    selectTournamentData,
    selectNotSelectedData,
    selectTournamentIsLoaded,
    // resetTournament,
    setupTournament,
    resetTournamentStore,
    selectTournamentIsFinished,
    // selectTournamentFinalOverview,
    shuffleTournamentData,
} from "@/src/application/redux/slices/tournamentSlice";
import FinalOverview from "@/src/domains/tournament/components/FinalOverview/FinalOverview";
import TournamentStage from "@/src/domains/tournament/components/TournamentStage";
import styles from "@/src/domains/tournament/Tournament.module.css";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function TournamentTable() {
    const tournamentData = useSelector(selectTournamentData, shallowEqual);
    const tournamentStructure = useSelector(
        selectTournamentStructure,
        shallowEqual
    );
    const setup = useSelector(selectTournamentSetup, shallowEqual);
    const matchError = useSelector(selectMatchError, shallowEqual);
    const isStarted = useSelector(selectTournamentIsStarted, shallowEqual);
    const isLoaded = useSelector(selectTournamentIsLoaded, shallowEqual);
    const isFinished = useSelector(selectTournamentIsFinished, shallowEqual);
    const notSelectedData = useSelector(selectNotSelectedData, shallowEqual);
    const dispatch = useDispatch();

    const handleStart = () => dispatch(startTournament());
    const handleQuit = () => dispatch(quitTournament());
    // const handleReset = () => dispatch(resetTournament());
    const handleReset = () => dispatch(resetTournamentStore());
    const setupNextMatch = () => dispatch(initNextMatch());
    const handleShuffle = () => dispatch(shuffleTournamentData());

    const handleSetup = () => {
        // dispatch tournament settings and create first table (to edit)
        !isStarted && !isFinished && dispatch(setupTournament());
    };

    useEffect(() => {
        if (tournamentData) {
            handleSetup();
        }
    }, [tournamentData]);

    useEffect(() => {
        if (!tournamentStructure) {
            handleSetup();
        }
    }, [tournamentStructure]);

    console.log("TournamentTable: ", { tournamentStructure, setup });

    return (
        <main>
            <div className={styles.tournamentHeading}>
                <h1>Tournament Table</h1>
                {!isStarted ? (
                    <>
                        <Button
                            type="button"
                            size="large"
                            label="START TOURNAMENT"
                            customStyles={customStyles}
                            disabled={
                                setup.totContenders >
                                tournamentData.length - notSelectedData.length
                            }
                            onClick={() => handleStart()}
                        />
                        <Button
                            type="button"
                            size="large"
                            label="SHUFFLE MATCHES"
                            customStyles={customStyles}
                            onClick={() => handleShuffle()}
                        />

                        {setup.totContenders >
                            tournamentData.length - notSelectedData.length && (
                            <p className={styles.tournamentWarning}>
                                ⚠️ Select all contenders to procede
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <Button
                            type="button"
                            size="large"
                            label="QUIT TOURNAMENT"
                            customStyles={customStyles}
                            onClick={() => handleQuit()}
                        />
                        <Button
                            type="button"
                            size="large"
                            label="RESET TOURNAMENT"
                            customStyles={customStyles}
                            onClick={() => handleReset()}
                        />
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
                {tournamentStructure &&
                    Object.entries(tournamentStructure).map(
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
            </div>

            {isFinished && <FinalOverview />}
        </main>
    );
}

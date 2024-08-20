import {
    selectTournamentStructure,
    selectTournamentSetup,
    selectMatchError,
    selectTournamentIsStarted,
    // initNextMatch,
    startTournament,
    quitTournament,
    selectTournamentData,
    selectNotSelectedData,
    // selectTournamentIsLoaded,
    // resetTournament,
    setupTournament,
    resetTournamentStore,
    selectTournamentIsFinished,
    // selectTournamentFinalOverview,
    shuffleTournamentData,
    updateFirstStage,
    updateNotSelectedData,
    setMatchWinner,
} from "@/src/application/redux/slices/tournamentSlice";
// import FinalOverview from "@/src/domains/tournament/components/FinalOverview/FinalOverview";
// import TournamentStage from "@/src/domains/tournament/components/TournamentStage";
// import styles from "@/src/domains/tournament/Tournament.module.css";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import TournamentTable from "@/src/domains/tournament/components/TournamentTable";

export default function TournamentPage() {
    const tournamentData = useSelector(selectTournamentData, shallowEqual);
    const tournamentStructure = useSelector(
        selectTournamentStructure,
        shallowEqual
    );
    const setup = useSelector(selectTournamentSetup, shallowEqual);
    const matchError = useSelector(selectMatchError, shallowEqual);
    const isStarted = useSelector(selectTournamentIsStarted, shallowEqual);
    // const isLoaded = useSelector(selectTournamentIsLoaded, shallowEqual);
    const isFinished = useSelector(selectTournamentIsFinished, shallowEqual);
    const notSelectedData = useSelector(selectNotSelectedData, shallowEqual);
    const dispatch = useDispatch();

    const handleStart = () => dispatch(startTournament());
    const handleQuit = () => dispatch(quitTournament());
    // const handleReset = () => dispatch(resetTournament());
    const handleReset = () => dispatch(resetTournamentStore());
    // const setupNextMatch = () => dispatch(initNextMatch());
    const handleShuffle = () => dispatch(shuffleTournamentData());

    const handleSetup = () => {
        // dispatch tournament settings and create first table (to edit)
        !isStarted && !isFinished && dispatch(setupTournament());
    };

    const handleUpdateSelected = ({ newCurrentMatch, newSelectedMatch }) =>
        dispatch(updateFirstStage({ newCurrentMatch, newSelectedMatch }));
    const handleUpdateUnselected = (contender) =>
        dispatch(
            updateNotSelectedData({
                toAdd: contender,
            })
        );
    const handleMatchResult = ({ winner }) =>
        dispatch(
            setMatchWinner({
                stage,
                match,
                winner,
            })
        );
    const handleVote = (payload) => dispatch(updateVote(payload));

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

    // console.log("TournamentTable: ", { tournamentStructure, setup });

    return (
        <main>
            <TournamentTable
                isStarted={isStarted}
                isFinished={isFinished}
                handleStart={handleStart}
                handleShuffle={handleShuffle}
                handleQuit={handleQuit}
                handleReset={handleReset}
                handleUpdateSelected={handleUpdateSelected}
                handleUpdateUnselected={handleUpdateUnselected}
                handleMatchResult={handleMatchResult}
                handleVote={handleVote}
                setup={setup}
                tournamentStructure={tournamentStructure}
                tournamentData={tournamentData}
                notSelectedData={notSelectedData}
                matchError={matchError}
                customStyles={customStyles}
            />
        </main>
    );
}

import {
    selectTournamentStructure,
    selectTournamentSetup,
    selectMatchError,
    selectTournamentIsStarted,
    startTournament,
    quitTournament,
    selectTournamentData,
    selectNotSelectedData,
    setupTournament,
    resetTournamentStore,
    selectTournamentIsFinished,
    shuffleTournamentData,
    updateFirstStage,
    updateNotSelectedData,
    setMatchWinner,
    updateVote,
    selectTournamentFinalOverview,
} from "@/src/application/redux/slices/tournamentSlice";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { Tournament } from "zephyrus-components";

export default function TournamentPage() {
    const tournamentData = useSelector(selectTournamentData, shallowEqual);
    const tournamentStructure = useSelector(
        selectTournamentStructure,
        shallowEqual
    );
    const setup = useSelector(selectTournamentSetup, shallowEqual);
    const matchError = useSelector(selectMatchError, shallowEqual);
    const isStarted = useSelector(selectTournamentIsStarted, shallowEqual);
    const isFinished = useSelector(selectTournamentIsFinished, shallowEqual);
    const notSelectedData = useSelector(selectNotSelectedData, shallowEqual);
    const finalOverview = useSelector(
        selectTournamentFinalOverview,
        shallowEqual
    );

    const dispatch = useDispatch();
    const handleStart = () => dispatch(startTournament());
    const handleQuit = () => dispatch(quitTournament());
    const handleReset = () => dispatch(resetTournamentStore());
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
    const handleMatchResult = ({ stage, match, winner }) =>
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

    return (
        <main>
            <Tournament
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
                finalOverview={finalOverview}
                matchError={matchError}
                customStyles={customStyles}
            />
        </main>
    );
}

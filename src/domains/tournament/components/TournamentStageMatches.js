import TournamentMatch from "./TournamentMatch";

export default function TournamentStageMatches({
    matches,
    tableRows,
    rowSequence,
    isFirstStage,
    isStarted,
    isRightSide,
    isError,
    stage,
    setup,
    notSelectedData,
    handleUpdateSelected,
    handleUpdateUnselected,
    handleMatchResult,
    handleVote,
    customStyles,
}) {
    return Object.entries(matches).map(([matchKey, match], i, array) => (
        <TournamentMatch
            key={"Tournament match " + match.matchId}
            match={match}
            matchKey={matchKey}
            // isLeftSide={match.matchId % 2 !== 0}
            tableRows={tableRows}
            index={i + 1}
            matchesLength={array.length}
            rowSequence={rowSequence || undefined}
            isStarted={isStarted}
            isFirstStage={isFirstStage}
            isRightSide={isRightSide}
            isError={isError === match.matchId}
            stageMatches={matches}
            stage={stage}
            setup={setup}
            notSelectedData={notSelectedData}
            handleUpdateSelected={handleUpdateSelected}
            handleUpdateUnselected={handleUpdateUnselected}
            handleMatchResult={handleMatchResult}
            handleVote={handleVote}
            customStyles={customStyles}
        >
            {match.matchId}
        </TournamentMatch>
    ));
}

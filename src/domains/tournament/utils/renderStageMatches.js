import TournamentMatch from "../components/TournamentMatch";

const renderStageMatches = ({ matches, tableRows, rowSequence }) => {
    console.log("renderStageMatches: ", matches, tableRows, rowSequence);
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
        >
            {match.matchId}
        </TournamentMatch>
    )); // render Contenders Cards 🧠
};
export default renderStageMatches;

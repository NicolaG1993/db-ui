// import TournamentMatch from "../components/TournamentMatch";

// const renderStageMatches = ({
//     matches,
//     tableRows,
//     rowSequence,
//     isFirstStage,
//     isStarted,
//     isRightSide,
//     isError,
//     stage,
// }) => {
//     return Object.entries(matches).map(([matchKey, match], i, array) => (
//         <TournamentMatch
//             key={"Tournament match " + match.matchId}
//             match={match}
//             matchKey={matchKey}
//             // isLeftSide={match.matchId % 2 !== 0}
//             tableRows={tableRows}
//             index={i + 1}
//             matchesLength={array.length}
//             rowSequence={rowSequence || undefined}
//             isStarted={isStarted}
//             isFirstStage={isFirstStage}
//             isRightSide={isRightSide}
//             isError={isError === match.matchId}
//             stageMatches={matches}
//             stage={stage}
//         >
//             {match.matchId}
//         </TournamentMatch>
//     )); // render Contenders Cards 🧠
// };
// export default renderStageMatches;

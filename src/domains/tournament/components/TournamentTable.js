// import styles from "@/src/domains/tournament/Tournament.module.css";
// import TournamentStage from "./TournamentStage";
// import FinalOverview from "./FinalOverview/FinalOverview";
// import TournamentHeading from "./TournamentHeading";

// export default function TournamentTable({
//     isStarted,
//     isFinished,
//     handleStart,
//     handleShuffle,
//     handleQuit,
//     handleReset,
//     setup,
//     tournamentStructure,
//     tournamentData,
//     notSelectedData,
//     finalOverview,
//     matchError,
//     handleUpdateSelected,
//     handleUpdateUnselected,
//     handleMatchResult,
//     handleVote,
//     customStyles,
// }) {
//     return (
//         <div className={`${styles.root} ${styles.tournament}`}>
//             <TournamentHeading
//                 isStarted={isStarted}
//                 handleStart={handleStart}
//                 handleShuffle={handleShuffle}
//                 handleQuit={handleQuit}
//                 handleReset={handleReset}
//                 areContendersMissing={
//                     setup.totContenders >
//                     tournamentData.length - notSelectedData.length
//                 }
//                 customStyles={customStyles}
//             />
//             <div
//                 className={styles.tournamentTable}
//                 style={{
//                     gridTemplateRows: `repeat(${setup.tableRows}, auto)`, // mettere "1fr"
//                     gridTemplateColumns: `repeat(${setup.tableColumns}, auto)`,
//                 }}
//             >
//                 {tournamentStructure &&
//                     Object.entries(tournamentStructure).map(
//                         ([stageKey, stage]) => (
//                             <TournamentStage
//                                 key={"Tournament stage " + stage.stageId}
//                                 stage={stage}
//                                 stageKey={stageKey}
//                                 tableRows={setup.tableRows}
//                                 tableColumns={setup.tableColumns}
//                                 totStages={setup.totStages}
//                                 isStarted={isStarted}
//                                 isFinal={stage.stageName === "Final"}
//                                 isThirdPlace={stage.stageName === "3rd Place"}
//                                 isFirstStage={stageKey === "1"}
//                                 tableRowsSequences={setup.tableRowsSequences}
//                                 isError={matchError}
//                                 setup={setup}
//                                 notSelectedData={notSelectedData}
//                                 handleUpdateSelected={handleUpdateSelected}
//                                 handleUpdateUnselected={handleUpdateUnselected}
//                                 handleMatchResult={handleMatchResult}
//                                 handleVote={handleVote}
//                                 customStyles={customStyles}
//                             />
//                         )
//                     )}
//             </div>

//             {isFinished && (
//                 <FinalOverview
//                     finalOverview={finalOverview}
//                     customStyles={customStyles}
//                 />
//             )}
//         </div>
//     );
// }

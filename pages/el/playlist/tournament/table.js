import { selectTournamentMatches } from "@/src/application/redux/slices/tournamentSlice";
import styles from "@/src/domains/tournament/Tournament.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function TournamentTable() {
    const matches = useSelector(selectTournamentMatches, shallowEqual);
    const dispatch = useDispatch();

    // console.log("matches: ", matches);

    // Create components and save in domain 🧠
    // should i use canvas???
    return (
        <main>
            <h1>Tournament Table</h1>
            <div
                className={styles.tournamentTable}
                style={{
                    gridTemplateRows: `repeat(${
                        matches?.length / 2 || 1
                    }, 1fr)`,
                }}
            >
                {matches ? (
                    matches.map((match, i, arr) => (
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
            </div>
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

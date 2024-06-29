import nextGeometricValue from "./nextGeometricValue";
import stepsToReachGeometricValue from "./stepsToReachGeometricValue";
import geometricValue from "./geometricValue";
import { current } from "@reduxjs/toolkit";

const createFirstStage = ({
    realFirstStageTotMatches,
    contendersPerMatch,
    allContenders,
}) => {
    let firstStage = {};

    for (let i = 0; i < realFirstStageTotMatches; i++) {
        const contendersFraction = i;
        const contendersOffsetStart = contendersFraction * contendersPerMatch;
        const contendersOffsetEnd = contendersOffsetStart + contendersPerMatch;
        let contenders = allContenders.slice(
            contendersOffsetStart,
            contendersOffsetEnd
        );

        contenders = contenders.map((cont) => ({ ...cont, vote: 0 }));

        if (contenders.length < contendersPerMatch) {
            const missingContenders = contendersPerMatch - contenders.length;
            for (let i = 0; i < missingContenders; i++) {
                contenders.push(null);
            }
        }

        firstStage[i + 1] = {
            matchId: i + 1,
            contenders,
            winner: undefined,
        };
    }

    return firstStage;
};

// TODO: cleanup extra args 👇
const createEmptyStageMatches = ({
    index,
    perSide, // matchs x side
    contendersPerMatch,
    stageName,
    idsAccumulator,
    totStages,
}) => {
    // console.log("🦉🤖🦉🤖 invoked createEmptyStageMatches: ", {
    //     index,
    //     perSide,
    //     contendersPerMatch,
    //     stageName,
    //     idsAccumulator,
    //     totStages,
    // });
    // create obj for contenders (empty)
    let emptyContendersObj = [];
    for (let i = 0; i < contendersPerMatch; i++) {
        emptyContendersObj.push(null);
    }
    // get tot matches for current stage
    let stageMatches = {};
    const stageTotMatches = geometricValue(totStages - index + 1);
    // create matches for current stage
    let indexOffestStart = idsAccumulator;
    let indexOffestEnd = indexOffestStart + stageTotMatches;
    for (let i = indexOffestStart; i < indexOffestEnd; i++) {
        stageMatches[i + 1] = {
            matchId: i + 1,
            contenders: emptyContendersObj,
            winner: undefined,
        };
    }
    //return stage
    // console.log("🦉🤖🦉🤖 createEmptyStageMatches RES: ", {
    //     stageMatches,
    //     totMatches: stageTotMatches,
    //     emptyContendersObj,
    //     stageTotMatches,
    // });
    return { stageMatches, totMatches: stageTotMatches };
};

const calcTournamentStructure = ({
    allContenders,
    contendersPerMatch,
    totContenders,
}) => {
    // const contendersPerMatch = 2; // test 3 🧠
    // const totContenders = allContenders.length;

    // calc totStages
    const firstStageTotMatches = Math.ceil(totContenders / contendersPerMatch);
    console.log("🍄 calcTournamentStructure #1: ", {
        allContenders: current(allContenders),
        contendersPerMatch,
        totContenders,
        firstStageTotMatches,
    });

    // 👇🔴👇🔴 FIX HERE! 👇🔴👇🔴 //
    // we should have some utils for some of this // geometric sequences

    // const firstStageTotBranches = Math.ceil(firstStageTotMatches / 4);
    const firstStageTotMatchesPerSide =
        firstStageTotMatches > 1
            ? Math.ceil(firstStageTotMatches / 2)
            : firstStageTotMatches; // 8->4->2 // 16->8->4

    const firstStageTotBranchesPerSide = Math.ceil(
        firstStageTotMatchesPerSide / 2
    ); // 1 // 2
    // const firstStageTotBranchesPerSide =
    //     firstStageTotMatchesPerSide === 4
    //         ? 2
    //         : Math.ceil(firstStageTotMatchesPerSide / 2); // 1 // 2
    let realFirstStageTotMatches = firstStageTotBranchesPerSide * 4; // 8!(4) // 16
    // let realFirstStageTotMatches =
    //     firstStageTotBranchesPerSide > 2
    //         ? firstStageTotBranchesPerSide * 4 * 2
    //         : firstStageTotBranchesPerSide * 4; // 8!(4) // 16
    if (firstStageTotMatchesPerSide <= 1) {
        realFirstStageTotMatches = realFirstStageTotMatches / 2;
    }
    const realFirstStageTotMatchesPerSide = realFirstStageTotMatches / 2; // 16!(8)

    console.log("🍄 calcTournamentStructure #2: ", {
        firstStageTotMatchesPerSide,
        firstStageTotBranchesPerSide,
        realFirstStageTotMatches,
        realFirstStageTotMatchesPerSide,
    });

    // let totPhases = nextGeometricValue(
    //     Math.ceil(realFirstStageTotMatchesPerSide)
    // ); // non usiamo xk é uguale a valore di "realFirstStageTotMatches"
    // let totStages = stepsToReachGeometricValue(totPhases);
    let totStages = stepsToReachGeometricValue(realFirstStageTotMatches);

    // calc tournamentStructure
    const firstStage = createFirstStage({
        realFirstStageTotMatches,
        contendersPerMatch,
        allContenders,
    });

    console.log("🍄 calcTournamentStructure #3: ", {
        totStages,
        firstStage,
    });

    const assignStages = ({ totStages, firstStage }) => {
        let result = {
            1: {
                stageMatches: firstStage,
                stageId: 1,
                stageName: `${geometricValue(totStages)}th-finals`,
                totMatches: Object.keys(firstStage).length,
            },
        };
        let idsAccumulator = result["1"].totMatches;
        const stageNames = ["Final", "Semifinals", "Quarterfinals"];

        for (let i = 2; i <= totStages + 1; i++) {
            const stageName =
                totStages + 2 - i > stageNames.length
                    ? `${geometricValue(totStages + 1 - i)}th-finals`
                    : stageNames[totStages + 1 - i];
            const newEmptyStage = createEmptyStageMatches({
                index: i,
                perSide: geometricValue(totStages - i),
                contendersPerMatch,
                stageName,
                idsAccumulator,
                totStages,
            });

            if (stageName === "Final" && totStages > 1) {
                result[i] = {
                    stageId: i,
                    stageName: "3rd Place",
                    stageMatches: newEmptyStage.stageMatches,
                    totMatches: newEmptyStage.totMatches,
                };
                result[i + 1] = {
                    stageId: i + 1,
                    stageName,
                    stageMatches: createEmptyStageMatches({
                        index: i + 1,
                        perSide: geometricValue(totStages - i + 1),
                        contendersPerMatch,
                        stageName,
                        idsAccumulator: idsAccumulator + 1,
                        totStages,
                    }).stageMatches,
                    totMatches: newEmptyStage.totMatches,
                };
                idsAccumulator = newEmptyStage.totMatches * 2 + idsAccumulator;
            } else {
                result[i] = {
                    stageId: i,
                    stageName,
                    stageMatches: newEmptyStage.stageMatches,
                    totMatches: newEmptyStage.totMatches,
                };
                idsAccumulator = newEmptyStage.totMatches + idsAccumulator;
            }
        }
        return { tournamentStructure: result, totMatches: idsAccumulator };
    };

    let { tournamentStructure, totMatches } = assignStages({
        totStages,
        firstStage,
    });

    console.log("🧠🧠🧠calcTournamentStructure🧠🧠🧠", {
        tableRows: realFirstStageTotMatchesPerSide,
        totStages,
        tournamentStructure,
        //
        firstStage,
        realFirstStageTotMatches,
    });

    return {
        tournamentStructure,
        tableRows: realFirstStageTotMatchesPerSide,
        totStages,
        firstStage,
        totMatches,
        firstStageTotMatches: Object.keys(firstStage).length,
    };
};

export default calcTournamentStructure;

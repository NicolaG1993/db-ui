import nextGeometricValue from "./nextGeometricValue";
import stepsToReachGeometricValue from "./stepsToReachGeometricValue";
import geometricValue from "./geometricValue";

const createFirstStage = ({
    realFirstStageTotMatches,
    contendersPerMatch,
    allContenders,
}) => {
    let firstStage = {};

    // for (let i = 0; i < realFirstStageTotMatches; i + contendersPerMatch)

    for (let i = 0; i < realFirstStageTotMatches; i++) {
        const contendersFraction = i;
        const contendersOffsetStart = contendersFraction * contendersPerMatch;
        const contendersOffsetEnd = contendersOffsetStart + contendersPerMatch;
        let contenders = allContenders.slice(
            contendersOffsetStart,
            contendersOffsetEnd
        );

        if (contenders.length < contendersPerMatch) {
            const missinContenders = contendersPerMatch - contenders.length;
            for (let i = 0; i < missinContenders; i++) {
                contenders.push(null);
            }
        }
        // totContenders / contendersPerMatch
        // if (i >= contendersOffsetStart && i <= contendersOffsetEnd)
        /*
  const contenders = allContenders.filter((el, i, arr) => {
    {
      return el
    } else {
      return null
    }
  })
  */

        // doSomething();
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
    // const firstStageTotBranches = Math.ceil(firstStageTotMatches / 4);
    const firstStageTotMatchesPerSide = Math.ceil(firstStageTotMatches / 2);

    const firstStageTotBranchesPerSide = Math.ceil(
        firstStageTotMatchesPerSide / 4
    );
    const realFirstStageTotMatches = firstStageTotBranchesPerSide * 4 * 2;
    const realFirstStageTotMatchesPerSide = realFirstStageTotMatches / 2;

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

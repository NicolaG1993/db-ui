import { current } from "@reduxjs/toolkit";
import solveIndexLogic from "./solveIndexLogic";
import getCurrentMatchLoser from "./getCurrentMatchLoser";

const setupFinalStages = ({
    // currentMatchesColumn,
    finalStage,
    thirdPlaceStage,
    currentMatch,
    currentMatchIndex,
    isEven,
    totMatches,
}) => {
    console.log("🍄 NICK'S CHECK #1: ", {
        // currentMatchesColumn,
        finalStage: current(finalStage),
        thirdPlaceStage: current(thirdPlaceStage),
        currentMatch,
        currentMatchIndex,
        isEven,
        totMatches,
    });

    let finalMatch = finalStage.stageMatches[`${totMatches}`];
    let thirdPlaceMatch = thirdPlaceStage.stageMatches[`${totMatches - 1}`];

    // add winner and loser to respective final matches
    // update store state

    let newFinalMatchContenders = finalMatch.contenders.map((cont, i) => {
        if (solveIndexLogic(currentMatch.matchId) !== i) {
            return currentMatch.winner;
        } else {
            return cont;
        }
    });
    finalMatch.contenders = newFinalMatchContenders;

    console.log("🍄 NICK'S CHECK #2: ", {
        finalMatch: current(finalMatch),
        thirdPlaceMatch: current(thirdPlaceMatch),
        newFinalMatchContenders,
    });

    let newThirdPlaceMatchContenders = thirdPlaceMatch.contenders.map(
        (cont, i) => {
            if (solveIndexLogic(currentMatch.matchId) !== i) {
                // select not winner
                return getCurrentMatchLoser(
                    currentMatch.contenders,
                    currentMatch.winner
                );
            } else {
                return cont;
            }
        }
    );
    thirdPlaceMatch.contenders = newThirdPlaceMatchContenders;

    console.log("🍄 NICK'S CHECK #3: ", {
        newThirdPlaceMatchContenders,
        thirdPlaceMatch: current(thirdPlaceMatch),
    });

    console.log("🍄 NICK'S CHECK #4: ", {
        return: {
            newFinalStage: {
                ...finalStage,
                stageMatches: { [finalMatch.matchId]: finalMatch },
            },
            newThirdPlaceStage: {
                ...thirdPlaceStage,
                stageMatches: { [thirdPlaceMatch.matchId]: thirdPlaceMatch },
            },
        },
    });

    return {
        newFinalStage: {
            ...finalStage,
            stageMatches: { [finalMatch.matchId]: finalMatch },
        },
        newThirdPlaceStage: {
            ...thirdPlaceStage,
            stageMatches: { [thirdPlaceMatch.matchId]: thirdPlaceMatch },
        },
    };
};
export default setupFinalStages;

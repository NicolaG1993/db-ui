import { current } from "@reduxjs/toolkit";

/*
const getNextStageMatch = ({
    currentStage,
    nextStage,
    currentStageMatchId,
    contenderId,
}) => {
    console.log("getNextStageMatch: ", {
        currentStage,
        nextStage: current(nextStage),
        currentStageMatchId,
        contenderId,
    });
    const currentStageMatches = currentStage.stageMatches;
    const nextStageMatches = nextStage.stageMatches;

    // Find the index of the contender in the current stage match
    const currentMatch = currentStageMatches[currentStageMatchId];
    const contenderIndex = currentMatch.contenders.findIndex(
        (contender) => contender.contenderId === contenderId
    );

    if (contenderIndex === -1) {
        return null; // Contender not found in the current match
    }

    // Calculate the corresponding matchId in the next stage
    const matchIndex = Object.keys(currentStageMatches).indexOf(
        String(currentStageMatchId)
    );
    const nextStageMatchId =
        Object.keys(nextStageMatches)[Math.floor(matchIndex / 2)];

    if (nextStageMatchId) {
        return {
            matchId: Number(nextStageMatchId),
            contenderIndex: contenderIndex,
        };
    } else {
        return null; // If no corresponding match is found in the next stage
    }
};

export default getNextStageMatch;
*/

// Example usage:
/*
    const result = getNextStageMatch(data.stage, data.nextStage, 17, 2);
    console.log(result); // Output: { matchId: 25, contenderIndex: 1 }
*/

/* 
const data = {
    currentStage: {
        stageId: 2,
        stageName: "8th-finals",
        stageMatches: {
            17: {
                matchId: 17,
                contenders: [{ contenderId: 1 }, { contenderId: 2 }],
            },
            18: {
                matchId: 18,
                contenders: [{ contenderId: 3 }, { contenderId: 4 }],
            },
            19: {
                matchId: 19,
                contenders: [{ contenderId: 5 }, { contenderId: 6 }],
            },
            20: {
                matchId: 20,
                contenders: [{ contenderId: 8 }, { contenderId: 9 }],
            },
            21: {
                matchId: 21,
                contenders: [{ contenderId: 10 }, { contenderId: 11 }],
            },
            22: {
                matchId: 22,
                contenders: [{ contenderId: 12 }, { contenderId: 13 }],
            },
            23: {
                matchId: 23,
                contenders: [{ contenderId: 14 }, { contenderId: 15 }],
            },
            24: {
                matchId: 24,
                contenders: [{ contenderId: 16 }, { contenderId: 17 }],
            },
        },
        totMatches: 8,
    },
    nextStage: {
        stageId: 3,
        stageName: "Quarterfinals",
        stageMatches: {
            25: {
                matchId: 25,
                contenders: [null, null],
            },
            26: {
                matchId: 26,
                contenders: [null, null],
            },
            27: {
                matchId: 27,
                contenders: [null, null],
            },
            28: {
                matchId: 28,
                contenders: [null, null],
            },
        },
        totMatches: 4,
    },
};
*/
/*
let currentMatches = {
    17: {
        matchId: 17,
        contenders: [{ contenderId: 154 }, { contenderId: 341 }],
    },
    18: {
        matchId: 18,
        contenders: [{ contenderId: 132 }, { contenderId: 433 }],
    },
    19: {
        matchId: 19,
        contenders: [{ contenderId: 533 }, { contenderId: 166 }],
    },
    20: {
        matchId: 20,
        contenders: [{ contenderId: 823 }, { contenderId: 978 }],
    },
    21: {
        matchId: 21,
        contenders: [{ contenderId: 10 }, { contenderId: 114 }],
    },
    22: {
        matchId: 22,
        contenders: [{ contenderId: 123 }, { contenderId: 96 }],
    },
    23: {
        matchId: 23,
        contenders: [{ contenderId: 140 }, { contenderId: 150 }],
    },
    24: {
        matchId: 24,
        contenders: [{ contenderId: 106 }, { contenderId: 127 }],
    },
};

let nextMatches = {
    25: {
        matchId: 25,
        contenders: [null, null],
    },
    26: {
        matchId: 26,
        contenders: [null, null],
    },
    27: {
        matchId: 27,
        contenders: [null, null],
    },
    28: {
        matchId: 28,
        contenders: [null, null],
    },
};


Given these arguments:
let res = updateNextMatch({
    currentMatches,
    nextMatches,
    matchId: 18,
    contenderId: 433,
});

The response should be:
{
    nextMatchId: 26,
    contendersIndex: 0
}

Given these arguments:
let res = updateNextMatch({
    currentMatches,
    nextMatches,
    matchId: 19,
    contenderId: 533,
});

The response should be:
{
    nextMatchId: 25,
    contendersIndex: 1
}

Given these arguments:
let res = updateNextMatch({
    currentMatches,
    nextMatches,
    matchId: 21,
    contenderId: 10,
});

The response should be:
{
    nextMatchId: 27,
    contendersIndex: 0
}

Given these arguments:
let res = updateNextMatch({
    currentMatches,
    nextMatches,
    matchId: 21,
    contenderId: 114,
});

The response should be:
{
    nextMatchId: 27,
    contendersIndex: 0
}

Given these arguments:
let res = updateNextMatch({
    currentMatches,
    nextMatches,
    matchId: 23,
    contenderId: 140,
});

The response should be:
{
    nextMatchId: 27,
    contendersIndex: 1
}
    */

/*
function getNextStageMatch({
    currentMatches,
    nextMatches,
    matchId,
    contenderId,
}) {
    console.log("getNextStageMatch: ", {
        currentMatches,
        nextMatches: current(nextMatches),
        matchId,
        contenderId,
    });
    // Get the index of the current matchId in the list of current matches
    const matchKeys = Object.keys(currentMatches);
    const currentMatchIndex = matchKeys.indexOf(String(matchId));

    if (currentMatchIndex === -1) {
        return null; // Match ID not found in current matches
    }

    // Calculate the index of the next match in the next stage
    const nextMatchIndex = Math.floor(currentMatchIndex / 2);
    const nextMatchKeys = Object.keys(nextMatches);
    const nextMatchId = Number(nextMatchKeys[nextMatchIndex]);

    // Find the index of the contender in the current match
    const contenders = currentMatches[matchId].contenders;
    const contenderIndex = contenders.findIndex(
        (contender) => contender.id === contenderId
    );

    if (contenderIndex === -1) {
        return null; // Contender ID not found in current match
    }

    // Determine the index position in the next match's contenders array
    const contendersIndex = currentMatchIndex % 2 === 0 ? 0 : 1;

    return {
        nextMatchId: nextMatchId,
        contendersIndex: contendersIndex,
    };
}
    */

/*
function getNextStageMatch({
    currentMatches,
    nextMatches,
    matchId,
    contenderId,
}) {
    console.log("getNextStageMatch: ", {
        currentMatches,
        nextMatches: current(nextMatches),
        matchId,
        contenderId,
    });
    const currentMatchKeys = Object.keys(currentMatches).map(Number);
    const nextMatchKeys = Object.keys(nextMatches).map(Number);

    // Find the index of the current matchId in the list of current match keys
    const currentMatchIndex = currentMatchKeys.indexOf(matchId);

    if (currentMatchIndex === -1) {
        return null; // Match ID not found in current matches
    }

    // Calculate the corresponding next matchId
    const nextMatchIndex = Math.floor(currentMatchIndex / 2);
    const nextMatchId = nextMatchKeys[nextMatchIndex];

    // Find the index of the contender in the current match
    const contenders = currentMatches[matchId].contenders;
    const contenderIndex = contenders.findIndex(
        (contender) => contender.id === contenderId
    );

    if (contenderIndex === -1) {
        return null; // Contender ID not found in current match
    }

    // Determine the index position in the next match's contenders array
    const contendersIndex = currentMatchIndex % 2 === 0 ? 0 : 1;

    return {
        nextMatchId: nextMatchId,
        contendersIndex: contendersIndex,
    };
}
    */

function getNextStageMatch({
    currentMatchesColumn,
    nextMatchesColumn,
    currentMatch,
}) {
    console.log("🍄 NICK'S CHECK #0: ", {
        // totMatches,
        // selected,
        // nextMatchesColumn,
        currentMatchesColumn,
        nextMatchesColumn,
        currentMatch,
    });

    let currentMatchIndex;
    Object.values(currentMatchesColumn).map((match, i) => {
        if (match.matchId === currentMatch.matchId) {
            currentMatchIndex = i;
        }
    });

    console.log("🍄 NICK'S CHECK #1: ", { currentMatchIndex });

    // const nextStageTotMatches = nextMatchesColumn;
    const nextMatchIndex = Math.floor(currentMatchIndex / 2);

    let newNextColumn = {};

    let nextMatch = Object.values(nextMatchesColumn).find(
        (match, i) => i === nextMatchIndex
    );

    console.log("🍄 NICK'S CHECK #2: ", {
        nextMatchIndex,
        nextMatch: nextMatch ? current(nextMatch) : undefined,
    });

    function solveIndexLogic(index) {
        console.log("solveIndexLogic: ", { index });
        // Calculate the remainder when index is divided by perMatch
        let remainder = index % 2;
        // Return 1 if remainder is 1, otherwise return 0
        return remainder === 1 ? 1 : 0;
    }

    let newNextMatch = nextMatch;
    let newNextMatchContenders = nextMatch.contenders.map((cont, i) => {
        if (solveIndexLogic(currentMatchIndex) === i) {
            return currentMatch.winner;
        } else {
            return cont;
        }
    });
    newNextMatch.contenders = newNextMatchContenders;

    console.log("🍄 NICK'S CHECK #3: ", {
        newNextMatch: current(newNextMatch),
        newNextMatchContenders,
    });

    Object.entries(nextMatchesColumn).map(([key, match], i) => {
        console.log("CONDITION CHECKUP: ", {
            key,
            match: current(match),
            i,
            newNextMatch: current(newNextMatch),
        });
        // if (match.matchId === newNextMatch.matchId) {
        if (Number(key) === newNextMatch.matchId) {
            console.log("CONDITION WORKED!");
            newNextColumn[key] = newNextMatch;
        } else {
            newNextColumn[key] = match;
        }
    });

    console.log("🍄 NICK'S CHECK #4: ", {
        return: {
            nextMatch: current(nextMatch),
            nextMatchIndex,
            newNextColumn: newNextColumn,
        },
    });

    return { nextMatch, nextMatchIndex, newNextColumn };
}

export default getNextStageMatch;

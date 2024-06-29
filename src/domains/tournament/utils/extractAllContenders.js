const extractAllContenders = (tournamentStructure) => {
    let allContenders = [];

    // Iterate over each stage in the tournament structure
    Object.keys(tournamentStructure).forEach((stageKey) => {
        const stage = tournamentStructure[stageKey];

        // Iterate over each match in the stage
        Object.keys(stage.stageMatches).forEach((matchKey) => {
            const match = stage.stageMatches[matchKey];

            // Add the contenders of the current match to the allContenders array
            allContenders = allContenders.concat(match.contenders);
        });
    });

    return allContenders;
};

export default extractAllContenders;

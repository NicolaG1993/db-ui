const solveIndexLogic = (index) => {
    // console.log("solveIndexLogic: ", { index });
    // Calculate the remainder when index is divided by perMatch
    let remainder = index % 2;
    // Return 1 if remainder is 1, otherwise return 0
    return remainder === 1 ? 1 : 0;
};

export default solveIndexLogic;

const getInferiorGeometricValues = (randomNumber) => {
    const base = 2;
    const commonRatio = 2;
    const result = [];
    let value = base;

    // Collect all geometric sequence values less than or equal to randomNumber
    while (value <= randomNumber) {
        result.push(value);
        value *= commonRatio;
    }

    return result;
};

export default getInferiorGeometricValues;

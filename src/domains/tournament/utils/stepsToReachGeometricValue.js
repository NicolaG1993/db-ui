const stepsToReachGeometricValue = (target) => {
    if (target <= 1) return 0; // If the target is 1 or less, no multiplications are needed.

    let steps = 0;
    let value = 1;

    // Multiply by 2 until the target value is reached or exceeded
    while (value < target) {
        value *= 2;
        steps++;
    }

    return steps;
};

export default stepsToReachGeometricValue;

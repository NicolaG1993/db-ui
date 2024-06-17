const nextGeometricValue = (n) => {
    if (n < 2) return 2; // The smallest value in the progression is 2.

    let value = 2;

    // Find the next value in the sequence that is greater than the given number
    while (value <= n) {
        value *= 2;
    }

    return value;
};

export default nextGeometricValue;

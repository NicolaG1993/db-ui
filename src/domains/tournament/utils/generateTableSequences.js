function generateOldPatternSequences(n) {
    const sequences = [];

    // Generate the full sequence from 1 to n
    let currentSequence = [];
    for (let i = 1; i <= n; i++) {
        currentSequence.push(i);
    }
    sequences.push(currentSequence);

    // Generate subsequent sequences
    let step = 4;
    let start = 2;

    while (start <= n) {
        currentSequence = [];
        for (let i = start; i <= n; i += step) {
            currentSequence.push(i);
        }
        sequences.push(currentSequence);

        start *= 2;
        step *= 2;
    }

    return sequences;
}

// Example usage
/*
const n = 16;
const allSequences = generateSequences(n);
allSequences.forEach((seq) => console.log(seq));
*/

// Output:
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
// [2, 6, 10, 14]
// [4, 12]
// [8]

function generateTableSequences(n) {
    const sequences = [];

    // First sequence: start at 1, step 2
    let currentSequence = [];
    for (let i = 1; i <= n; i += 2) {
        currentSequence.push(i);
    }
    sequences.push(currentSequence);

    // Subsequent sequences with different start values and steps
    let start = 2;
    let step = 4;

    while (start <= n) {
        currentSequence = [];
        for (let i = start; i <= n; i += step) {
            currentSequence.push(i);
        }
        sequences.push(currentSequence);

        start *= 2;
        step *= 2;
    }

    return sequences;
}

// Example usage
/*
const n = 16;
const allSequences = generateNewPatternSequences(n);
allSequences.forEach(seq => console.log(seq));
*/

// Output:
// [1, 3, 5, 7, 9, 11, 13, 15]
// [2, 6, 10, 14]
// [4, 12]
// [8]

export default generateTableSequences;

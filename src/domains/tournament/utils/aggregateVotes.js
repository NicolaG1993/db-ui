import { current } from "@reduxjs/toolkit";

function aggregateVotes(array) {
    // Create a map to store the aggregated votes and titles
    const voteMap = new Map();

    array.forEach((contender) => {
        if (voteMap.has(contender.id)) {
            const existing = voteMap.get(contender.id);
            voteMap.set(contender.id, {
                id: contender.id,
                vote: existing.vote + contender.vote,
                title: existing.title, // Assumes title is the same for the same ID
            });
        } else {
            voteMap.set(contender.id, {
                id: contender.id,
                vote: contender.vote,
                title: contender.title,
            });
        }
    });

    // Convert the map back to an array and sort by votes in descending order
    return Array.from(voteMap.values()).sort((a, b) => b.vote - a.vote);
}

export default aggregateVotes;

function createCastString(actors) {
    if (!Array.isArray(actors)) {
        throw new TypeError("Expected an array as the input");
    }

    const length = actors.length;

    if (length === 0) {
        return "";
    }

    if (length === 1) {
        return `${actors[0].name}`;
    }

    if (length === 2) {
        return `${actors[0].name} and ${actors[1].name}`;
    }

    // For three or more actors
    const names = actors.map((actor) => actor.name);
    const lastActor = names.pop(); // Remove the last actor's name
    const actorList = names.join(", "); // Join remaining names with commas

    return `${actorList} and ${lastActor}`;
}

export { createCastString };

export default function filterUniqueActors(actors) {
    const seen = new Set();
    return actors.filter((actor) => {
        if (seen.has(actor.id)) {
            return false;
        } else {
            seen.add(actor.id);
            return true;
        }
    });
}

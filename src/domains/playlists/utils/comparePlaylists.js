/**
 * Compares the current playlist from the database with a new playlist table and generates updates.
 * @param {Object} currentPlaylist - The current playlist fetched from the database.
 * @param {Array} newPlaylist - The new playlist table to compare against.
 * @param {String} newTitle - The new title of the playlist.
 * @returns {Array} updates - The updates to apply to the database playlist.
 */

const comparePlaylists = (currentPlaylist, newPlaylist, newTitle) => {
    const updates = [];

    // Create a map of the current playlist movies by ID for easy lookup
    const currentMoviesMap = new Map();
    currentPlaylist.movies.forEach((movie) => {
        currentMoviesMap.set(movie.id, movie);
    });

    // Iterate over the new playlist to find additions and index updates
    newPlaylist.forEach((newMovie, index) => {
        const currentMovie = currentMoviesMap.get(Number(newMovie.id));

        if (!currentMovie) {
            // New movie to be added
            updates.push({
                type: "addMovie",
                movieID: Number(newMovie.id),
                index: Number(index),
            });
        } else if (currentMovie.index !== index) {
            // Existing movie with updated index
            updates.push({
                type: "updateIndex",
                movieID: Number(newMovie.id),
                index: Number(index),
            });
        }

        // Remove the processed movie from the currentMoviesMap
        currentMoviesMap.delete(Number(newMovie.id));
    });

    // Remaining movies in the currentMoviesMap need to be removed
    for (const [movieID] of currentMoviesMap) {
        updates.push({
            type: "removeMovie",
            movieID,
        });
    }

    // Update playlist title if it has changed
    if (currentPlaylist.title !== newTitle) {
        updates.push({
            type: "updateTitle",
            title: newTitle,
        });
    }

    console.log("🧠 comparePlaylists: ", {
        currentPlaylist,
        currentPlaylistMovies: currentPlaylist.movies,
        newPlaylist,
        newTitle,
        updates,
    });

    return updates;
};

export default comparePlaylists;

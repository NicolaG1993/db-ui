import { connect } from "@/src/application/db/db.js";

// new
module.exports.newPlaylist = (client, title, user) => {
    const myQuery = `INSERT INTO playlist
    (title, userID)
    VALUES ($1, $2) 
    RETURNING id`;
    const keys = [title, user];
    return client.query(myQuery, keys);
};

module.exports.newPlaylistRelations = (client, movieValues) => {
    const myQuery = `INSERT INTO movie_playlist (movieID, playlistID, index) VALUES ${movieValues}`;
    return client.query(myQuery);
};

module.exports.newPlaylistRelation = (client, movieID, playlistID, index) => {
    const myQuery = `INSERT INTO movie_playlist (movieID, playlistID, index) VALUES ($1, $2, $3) ON CONFLICT (movieID, playlistID) DO NOTHING`;
    const keys = [movieID, playlistID, index];
    return client.query(myQuery, keys);
};

// delete
module.exports.removePlaylistRelation = (client, playlistID, movieID) => {
    const myQuery = `DELETE FROM movie_playlist WHERE playlistID = $1 AND movieID = $2`;
    const keys = [playlistID, movieID];
    return client.query(myQuery, keys);
};
module.exports.deletePlaylist = (client, playlistID) => {
    // todo...
};

// get
// module.exports.getPlaylistByID = (client, id) => {
//     const myQuery = `SELECT * FROM playlist WHERE id = $1`;
//     const key = [id];
//     return client.query(myQuery, key);
// };

module.exports.getPlaylistWithInfos = (client, id, user) => {
    const myQuery = `WITH sorted_movies AS (
    SELECT
        movie_playlist.playlistID,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', movie.id,
                'title', movie.title,
                'pic', movie.pic,
                'urls', movie.urls,
                'rating', movie.rating,
                'release', movie.release,
                'index', movie_playlist.index
            )
            ORDER BY movie_playlist.index
        ) AS movies
    FROM
        movie_playlist
    JOIN
        movie ON movie.id = movie_playlist.movieID
    GROUP BY
        movie_playlist.playlistID
)
SELECT
    playlist.*,
    COALESCE(sorted_movies.movies, '[]'::json) AS movies
FROM
    playlist
LEFT JOIN
    sorted_movies
    ON playlist.id = sorted_movies.playlistID
WHERE
    playlist.id = $1
    AND playlist.userID = $2`;
    // const myQuery = `SELECT
    //     playlist.*,
    //     movies_JSON.movies
    // FROM
    //     playlist

    //     LEFT JOIN

    //         (SELECT
    //             movie_playlist.playlistID,
    //             JSON_AGG(
    //                 JSON_BUILD_OBJECT(
    //                     'id', movie.id,
    //                     'title', movie.title
    //                     )
    //                 ) AS movies
    //         FROM
    //             movie_playlist
    //             JOIN movie ON movie.id = movie_playlist.movieID
    //         GROUP BY
    //             movie_playlist.playlistID
    //         ) AS movies_JSON
    //         ON playlist.id = movies_JSON.playlistID

    // WHERE playlist.id = $1
    // AND playlist.userID = $2`;
    const keys = [id, user];
    return client.query(myQuery, keys);
};

module.exports.getAllPlaylistsWithInfos = (client, str, user) => {
    const myQuery = `WITH ordered_movies AS (
    SELECT
        movie_playlist.playlistID,
        JSON_BUILD_OBJECT(
            'id', movie.id,
            'title', movie.title,
            'pic', movie.pic,
            'urls', movie.urls,
            'rating', movie.rating,
            'release', movie.release,
            'index', movie_playlist.index
        ) AS movie_json
    FROM
        movie_playlist
    JOIN
        movie ON movie.id = movie_playlist.movieID
    ORDER BY
        movie_playlist.index
),
aggregated_movies AS (
    SELECT
        playlistID,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', movie_json->>'id',
                'title', movie_json->>'title',
                'pic', movie_json->>'pic',
                'urls', movie_json->>'urls',
                'rating', movie_json->>'rating',
                'release', movie_json->>'release',
                'index', movie_json->>'index'
            )
        ) AS movies
    FROM
        ordered_movies
    GROUP BY
        playlistID
)
SELECT
    playlist.*,
    COALESCE(aggregated_movies.movies, '[]'::json) AS movies
FROM
    playlist
LEFT JOIN
    aggregated_movies
    ON playlist.id = aggregated_movies.playlistID
WHERE
    playlist.title ILIKE '%' || $1 || '%'
    AND playlist.userID = $2
ORDER BY
    playlist.created_at DESC`;
    // const myQuery = `SELECT
    //     playlist.*,
    //     movies_JSON.movies
    // FROM
    //     playlist

    //     LEFT JOIN

    //         (SELECT
    //             movie_playlist.playlistID,
    //             JSON_AGG(
    //                 JSON_BUILD_OBJECT(
    //                     'id', movie.id,
    //                     'title', movie.title
    //                     )
    //                 ) AS movies
    //         FROM
    //             movie_playlist
    //             JOIN movie ON movie.id = movie_playlist.movieID
    //         GROUP BY
    //             movie_playlist.playlistID
    //         ) AS movies_JSON
    //         ON playlist.id = movies_JSON.playlistID

    // WHERE playlist.title ILIKE '%' || $1 || '%'
    // AND playlist.userID = $2
    // ORDER BY created_at DESC`;
    const keys = [str, user];
    return client.query(myQuery, keys);
};

// edit
module.exports.editPlaylistTitle = (client, title, playlistID) => {
    const myQuery = `UPDATE playlist SET title = $1 WHERE id = $2`;
    const keys = [title, playlistID];
    return client.query(myQuery, keys);
};

module.exports.editPlaylistMovieIndex = (
    client,
    playlistID,
    movieID,
    index
) => {
    const myQuery = `UPDATE movie_playlist SET index = $3 WHERE playlistID = $1 AND movieID = $2`;
    const keys = [playlistID, movieID, index];
    return client.query(myQuery, keys);
};

// module.exports.editPlaylist = (client, id, title, user) => {
//     const myQuery = `UPDATE playlist
//         SET title = COALESCE($2, title)
//         WHERE id = $1
//         AND userID = $3
//         RETURNING *`;
//     const keys = [id, title, user];
//     return client.query(myQuery, keys);
// };

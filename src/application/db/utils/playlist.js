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
        mp.playlistID,
        m.id AS movie_id,
        m.title AS movie_title,
        m.pic AS movie_pic,
        mp.index AS movie_index
    FROM
        movie_playlist mp
    JOIN
        movie m ON m.id = mp.movieID
    ORDER BY
        mp.playlistID, mp.index
),
movie_actors AS (
    SELECT
        ma.movieID,
        JSON_AGG(JSON_BUILD_OBJECT(
            'actor_id', a.id,
            'actor_name', a.name
        )) AS actors
    FROM
        movie_actor ma
    JOIN
        actor a ON a.id = ma.actorID
    GROUP BY
        ma.movieID
),
aggregated_movies AS (
    SELECT
        om.playlistID,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'movie_id', om.movie_id,
                'movie_title', om.movie_title,
                'movie_pic', om.movie_pic,
                'movie_actors', COALESCE(ma.actors, '[]'::json)
            ) ORDER BY om.movie_index
        ) AS movies
    FROM
        ordered_movies om
    LEFT JOIN
        movie_actors ma ON om.movie_id = ma.movieID
    GROUP BY
        om.playlistID
)
SELECT
    p.*,
    COALESCE(am.movies, '[]'::json) AS movies
FROM
    playlist p
LEFT JOIN
    aggregated_movies am ON p.id = am.playlistID
WHERE p.title ILIKE '%' || $1 || '%'
AND p.userID = $2
ORDER BY
    p.created_at DESC`;
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

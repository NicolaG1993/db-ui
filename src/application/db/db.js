import { Pool } from "pg";

const config = {
    connectionString: process.env.DATABASE_URL,
    // host: process.env.DATABASE_HOST,
    // port: process.env.DATABASE_PORT,
    // user: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PSW,
    // database: process.env.DATABASE_NAME,
};

let db;
if (!db) {
    db = new Pool(config);
}

module.exports.db;

/* USER */
module.exports.newUser = (name, email, psw) => {
    const myQuery = `INSERT INTO users 
    (name, email, psw) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, email, psw];
    return db.query(myQuery, keys);
};
module.exports.getUserByEmail = (email) => {
    const myQuery = `SELECT * FROM users WHERE email = $1`;
    const key = [email];
    return db.query(myQuery, key);
};

/* NEW */
module.exports.newActor = (
    name,
    pic,
    rating,
    bday,
    genre,
    twitter,
    instagram,
    more_urls
) => {
    const myQuery = `INSERT INTO actor 
    (name, pic, rating, birthday, genre, twitter, instagram, more_urls) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *`;
    const keys = [
        name,
        pic,
        rating,
        bday,
        genre,
        twitter,

        instagram,
        more_urls,
    ];
    return db.query(myQuery, keys);
};
module.exports.newMovie = (title, pic, rating, urls, release) => {
    const myQuery = `INSERT INTO movie 
    (title, pic, rating, urls, release) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;
    const keys = [title, pic, rating, urls, release];
    return db.query(myQuery, keys);
};
module.exports.newStudio = (name, pic, website) => {
    const myQuery = `INSERT INTO studio 
    (name, pic, website) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, website];
    return db.query(myQuery, keys);
};
module.exports.newDistribution = (name, pic, website) => {
    const myQuery = `INSERT INTO distribution 
    (name, pic, website) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, website];
    return db.query(myQuery, keys);
};
module.exports.newCategory = (name, pic, type) => {
    const myQuery = `INSERT INTO category 
    (name, pic, type) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, type];
    return db.query(myQuery, keys);
};
module.exports.newTag = (name, pic, type) => {
    const myQuery = `INSERT INTO tag 
    (name, pic, type) 
    VALUES ($1, $2, $3)  
    RETURNING *`;
    const keys = [name, pic, type];
    return db.query(myQuery, keys);
};
module.exports.newRecord = (id) => {
    const myQuery = `INSERT INTO counter
    (movieID)
    VALUES ($1) 
    RETURNING *`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.newPlaylist = (title, user) => {
    const myQuery = `INSERT INTO playlist
    (title, userID)
    VALUES ($1, $2) 
    RETURNING *`;
    const keys = [title, user];
    return db.query(myQuery, keys);
};
module.exports.newMoviesFromUrls = (arr) => {
    const myQuery = `INSERT INTO movie (title, urls)
    SELECT
        datajson->>'title',
        ARRAY [datajson->>'url']
    FROM 
        jsonb_array_elements($1::jsonb)
        AS t(datajson)
    RETURNING *`;
    const key = [arr];
    return db.query(myQuery, key);
};

/* EDIT */
module.exports.editActor = (
    id,
    name,
    pic,
    rating,
    bday,
    genre,
    twitter,
    instagram,
    more_urls
) => {
    const myQuery = `UPDATE actor 
        SET name = COALESCE($2, name), pic = $3, rating = $4, birthday = $5, genre = $6, twitter = $7, instagram = $8, more_urls = $9
        WHERE id = $1
        RETURNING *`;
    const keys = [
        id,
        name,
        pic,
        rating,
        bday,
        genre,
        twitter,
        instagram,
        more_urls,
    ];
    return db.query(myQuery, keys);
};
module.exports.editMovie = (id, title, pic, rating, urls, release) => {
    const myQuery = `UPDATE movie 
        SET title = COALESCE($2, title), pic = $3, rating = $4, urls = $5, release = $6
        WHERE id = $1
        RETURNING *`;
    const keys = [id, title, pic, rating, urls, release];
    return db.query(myQuery, keys);
};
module.exports.editStudio = (id, name, pic, website) => {
    const myQuery = `UPDATE studio 
        SET name = COALESCE($2, name), pic = $3, website = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, website];
    return db.query(myQuery, keys);
};
module.exports.editDistribution = (id, name, pic, website) => {
    const myQuery = `UPDATE distribution 
        SET name = COALESCE($2, name), pic = $3, website = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, website];
    return db.query(myQuery, keys);
};
module.exports.editCategory = (id, name, pic, type) => {
    const myQuery = `UPDATE category 
        SET name = COALESCE($2, name), pic = $3, type = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, type];
    return db.query(myQuery, keys);
};
module.exports.editTag = (id, name, pic, type) => {
    const myQuery = `UPDATE tag 
        SET name = COALESCE($2, name), pic = $3, type = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, type];
    return db.query(myQuery, keys);
};
module.exports.editRecord = (id, date) => {
    const myQuery = `UPDATE counter 
        SET created_at = $2
        WHERE id = $1
        RETURNING *`;
    const keys = [id, date];
    return db.query(myQuery, keys);
};
module.exports.editRecords = (ids, date) => {
    const myQuery = `UPDATE counter 
    SET created_at = $2
    WHERE id = ANY($1)
    RETURNING *`;
    const keys = [ids, date];
    return db.query(myQuery, keys);
};
module.exports.editPicURL = (pic, id, table) => {
    const myQuery = `UPDATE ${table} 
    SET pic = $1
    WHERE id = $2
    RETURNING *`;
    const keys = [pic, id];
    return db.query(myQuery, keys);
};
module.exports.editPlaylist = (id, title, user) => {
    const myQuery = `UPDATE playlist 
        SET title = COALESCE($2, title)
        WHERE id = $1
        AND userID = $3
        RETURNING *`;
    const keys = [id, title, user];
    return db.query(myQuery, keys);
};

/* DELETE */
module.exports.deleteRecord = (id, table, column) => {
    const myQuery = `DELETE FROM ${table}
    WHERE ${column || "id"} = $1
    RETURNING *`;
    const key = [id];
    return db.query(myQuery, key);
};

/* GET */
module.exports.getElementByID = (table, id) => {
    const myQuery = `SELECT * FROM ${table} WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getActorByID = (id) => {
    const myQuery = `SELECT * FROM actor WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getMovieByID = (id) => {
    const myQuery = `SELECT * FROM movie WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getStudioByID = (id) => {
    const myQuery = `SELECT * FROM studio WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getDistributionByID = (id) => {
    const myQuery = `SELECT * FROM distribution WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getCategoryByID = (id) => {
    const myQuery = `SELECT * FROM category WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getTagByID = (id) => {
    const myQuery = `SELECT * FROM tag WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getRecordByID = (id) => {
    const myQuery = `SELECT * FROM counter WHERE movieID = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getPlaylistByID = (id) => {
    const myQuery = `SELECT * FROM playlist WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* GET SELECTION */
module.exports.getActors = (arr) => {
    const myQuery = `SELECT actor.name, actor.id, actor.pic, actor.rating FROM actor WHERE id = ANY($1) ORDER BY name`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getMovies = (arr) => {
    const myQuery = `SELECT movie.title, movie.id, movie.pic, movie.rating FROM movie WHERE id = ANY($1) ORDER BY title`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getCategories = (arr) => {
    const myQuery = `SELECT category.name, category.id, category.type FROM category WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getTags = (arr) => {
    const myQuery = `SELECT tag.name, tag.id, tag.type FROM tag WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getStudios = (arr) => {
    let myQuery = `SELECT studio.name, studio.id FROM studio WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getDistributions = (arr) => {
    const myQuery = `SELECT distribution.name, distribution.id FROM distribution WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};

/* GET ALL */
module.exports.getTable = (str) => {
    const myQuery = `SELECT id, name FROM ${str} ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getTableWithTypes = (str) => {
    const myQuery = `SELECT id, name, type FROM ${str} ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getAllTable = (str) => {
    const myQuery = `SELECT * FROM ${str} ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getAllActors = () => {
    const myQuery = `SELECT * FROM actor ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getAllMovies = () => {
    const myQuery = `SELECT * FROM movie ORDER BY title`;
    return db.query(myQuery);
};
module.exports.getAllStudios = (str) => {
    const myQuery = `SELECT * 
    FROM studio 
    WHERE name ILIKE '%' || $1 || '%' OR website ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return db.query(myQuery, key);
};
module.exports.getAllDistributions = (str) => {
    const myQuery = `SELECT * 
    FROM distribution 
    WHERE name ILIKE '%' || $1 || '%' OR website ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return db.query(myQuery, key);
};
module.exports.getAllCategories = (str) => {
    const myQuery = `SELECT * 
    FROM category
    WHERE name ILIKE '%' || $1 || '%' OR type ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return db.query(myQuery, key);
};
module.exports.getAllTags = (str) => {
    const myQuery = `SELECT * 
    FROM tag 
    WHERE name ILIKE '%' || $1 || '%' OR type ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return db.query(myQuery, key);
};
module.exports.getAllRecords = () => {
    const myQuery = `SELECT * FROM counter ORDER BY created_at DESC`;
    return db.query(myQuery);
};

/* GET ALL WITH INFOS */
module.exports.getAllPlaylistsWithInfos = (str, user) => {
    const myQuery = `SELECT
        playlist.*,
        movies_JSON.movies
    FROM
        playlist
        
        LEFT JOIN

            (SELECT
                movie_playlist.playlistID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', movie.id,
                        'title', movie.title                 
                        )
                    ) AS movies
            FROM
                movie_playlist
                JOIN movie ON movie.id = movie_playlist.movieID
            GROUP BY
                movie_playlist.playlistID
            ) AS movies_JSON
            ON playlist.id = movies_JSON.playlistID

    WHERE playlist.title ILIKE '%' || $1 || '%'
    AND playlist.userID = $2
    ORDER BY created_at DESC`;
    const keys = [str, user];
    return db.query(myQuery, keys);
};
module.exports.getPlaylistWithInfos = (id, user) => {
    const myQuery = `SELECT
        playlist.*,
        movies_JSON.movies
    FROM
        playlist
        
        LEFT JOIN

            (SELECT
                movie_playlist.playlistID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', movie.id,
                        'title', movie.title                 
                        )
                    ) AS movies
            FROM
                movie_playlist
                JOIN movie ON movie.id = movie_playlist.movieID
            GROUP BY
                movie_playlist.playlistID
            ) AS movies_JSON
            ON playlist.id = movies_JSON.playlistID

    WHERE playlist.id = $1
    AND playlist.userID = $2`;
    const keys = [id, user];
    return db.query(myQuery, keys);
};

module.exports.getAllMoviesWithInfos = (str, limit, offset, order) => {
    const myQuery = `SELECT 
        movie.*,
        COUNT(*) OVER() AS full_count,
        cast_JSON.cast,
        production_JSON.production,
        distribution_JSON.distribution,
        categories_JSON.categories,
        tags_JSON.tags,
        records_JSON.records
     FROM
        movie

        LEFT JOIN

            (SELECT 
                movie_actor.movieID, 
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', actor.id,
                        'name', actor.name                 
                        )
                    ) AS cast
            FROM
                movie_actor
                JOIN actor ON actor.id = movie_actor.actorID
            GROUP BY
                movie_actor.movieID
            ) AS cast_JSON
            ON movie.id = cast_JSON.movieID

        LEFT JOIN

            (SELECT
                movie_studio.movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', studio.id,
                        'name', studio.name                 
                        )
                    ) AS production
                FROM
                    movie_studio
                    JOIN studio ON studio.id = movie_studio.studioID
                GROUP BY
                    movie_studio.movieID
            ) AS production_JSON
            ON movie.id = production_JSON.movieID

        LEFT JOIN

            (SELECT
                movie_distribution.movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', distribution.id,
                        'name', distribution.name                 
                        )
                    ) AS distribution
                FROM
                    movie_distribution
                    JOIN distribution ON distribution.id = movie_distribution.distributionID
                GROUP BY
                    movie_distribution.movieID
            ) AS distribution_JSON
            ON movie.id = distribution_JSON.movieID

        LEFT JOIN

            (SELECT
                categoryRelation.movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', category.id,
                        'name', category.name                 
                        )
                    ) AS categories
                FROM
                    categoryRelation
                    JOIN category ON category.id = categoryRelation.categoryID
                GROUP BY
                    categoryRelation.movieID
            ) AS categories_JSON
            ON movie.id = categories_JSON.movieID

        LEFT JOIN

            (SELECT
                tagRelation.movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', tag.id,
                        'name', tag.name                 
                    )
                ) AS tags
            FROM
                tagRelation
                JOIN tag ON tag.id = tagRelation.tagID
            GROUP BY tagRelation.movieID

            ) AS tags_JSON
            ON movie.id = tags_JSON.movieID

        LEFT JOIN

            (SELECT
                movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', id,
                        'movie_id', movieID,
                        'created_at', created_at                 
                    )
                ) AS records
            FROM counter
            GROUP BY movieID
        ) AS records_JSON
        ON records_JSON.movieID = movie.id

    WHERE movie.title ILIKE '%' || $1 || '%'
    ORDER BY ${order}
    LIMIT $2 OFFSET $3
`;
    const keys = [str, limit, offset];
    return db.query(myQuery, keys);
};

module.exports.getAllMoviesWithInfosByIDS = (arr) => {
    const myQuery = `SELECT 
        movie.*,
        cast_JSON.cast,
        production_JSON.production,
        distribution_JSON.distribution,
        categories_JSON.categories,
        tags_JSON.tags
     FROM
        movie
        LEFT JOIN
            (SELECT 
                movie_actor.movieID, 
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', actor.id,
                        'name', actor.name                 
                        )
                    ) AS cast
            FROM
                movie_actor
                JOIN actor ON actor.id = movie_actor.actorID
            GROUP BY
                movie_actor.movieID
            ) AS cast_JSON
            ON movie.id = cast_JSON.movieID
        LEFT JOIN
            (SELECT
                movie_studio.movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', studio.id,
                        'name', studio.name                 
                        )
                    ) AS production
                FROM
                    movie_studio
                    JOIN studio ON studio.id = movie_studio.studioID
                GROUP BY
                    movie_studio.movieID
            ) AS production_JSON
            ON movie.id = production_JSON.movieID
        LEFT JOIN
            (SELECT
                movie_distribution.movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', distribution.id,
                        'name', distribution.name                 
                        )
                    ) AS distribution
                FROM
                    movie_distribution
                    JOIN distribution ON distribution.id = movie_distribution.distributionID
                GROUP BY
                    movie_distribution.movieID
            ) AS distribution_JSON
            ON movie.id = distribution_JSON.movieID
        LEFT JOIN
            (SELECT
                categoryRelation.movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', category.id,
                        'name', category.name                 
                        )
                    ) AS categories
                FROM
                    categoryRelation
                    JOIN category ON category.id = categoryRelation.categoryID
                GROUP BY
                    categoryRelation.movieID
            ) AS categories_JSON
            ON movie.id = categories_JSON.movieID
        LEFT JOIN
            (SELECT
                tagRelation.movieID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', tag.id,
                        'name', tag.name                 
                        )
                    ) AS tags
                FROM
                    tagRelation
                    JOIN tag ON tag.id = tagRelation.tagID
                GROUP BY
                    tagRelation.movieID
            ) AS tags_JSON
            ON movie.id = tags_JSON.movieID
    WHERE movie.id = ANY($1)
    ORDER BY
        movie.created_at DESC
`;
    const key = [arr];
    return db.query(myQuery, key);
};

module.exports.getAllActorsWithInfos = (str, limit, offset, order) => {
    const myQuery = `SELECT 
        actor.*,
        COUNT(*) OVER() AS full_count,
        movies_JSON.movies,
        tags_JSON.tags,
        nationalities_JSON.nationalities
    FROM
        actor

        LEFT JOIN

            (SELECT
                movie_actor.actorID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', movie.id,
                        'title', movie.title,
                        'pic', movie.pic
                        )
                ) AS movies
            FROM
                movie_actor
                JOIN movie ON movie.id = movie_actor.movieID
            GROUP BY
                movie_actor.actorID
        ) AS movies_JSON
            ON actor.id = movies_JSON.actorID

        LEFT JOIN (
        
        SELECT
          tagRelation.actorID,
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', tag.id,
              'name', tag.name)
            ) AS tags
        FROM tagRelation 
          JOIN tag
            ON tag.id = tagRelation.tagID
          GROUP BY tagRelation.actorID
            
      ) AS tags_JSON
        ON actor.id = tags_JSON.actorID

    LEFT JOIN
        (SELECT
            nationalityRelation.actorID,
            JSON_AGG(
                nationalityRelation.nationality
            ) AS nationalities
            FROM nationalityRelation
            GROUP BY nationalityRelation.actorID
        ) AS nationalities_JSON
        ON actor.id = nationalities_JSON.actorID

        WHERE actor.name ILIKE '%' || $1 || '%'
        ORDER BY ${order}
        LIMIT $2 OFFSET $3
        `;
    const keys = [str, limit, offset];
    return db.query(myQuery, keys);
};

module.exports.filterAllActorsWithInfos = (
    str,
    limit,
    offset,
    order,
    tags,
    nationalities
) => {
    const myQuery = `SELECT 
        actor.*,
        COUNT(*) OVER() AS full_count,
        movies_JSON.movies,
        tags_JSON.tags,
        nationalities_JSON.nationalities
    FROM
        actor
        LEFT JOIN
            (SELECT
                movie_actor.actorID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', movie.id,
                        'title', movie.title,
                        'pic', movie.pic
                        )
                ) AS movies
            FROM
                movie_actor
                JOIN movie ON movie.id = movie_actor.movieID
            GROUP BY
                movie_actor.actorID
        ) AS movies_JSON
        ON actor.id = movies_JSON.actorID

    LEFT JOIN (
  
        SELECT
          tagRelation.actorID,
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', tag.id,
              'name', tag.name)
            ) AS tags,
          JSON_AGG(tag.name) AS tags_names
        FROM tagRelation 
          JOIN tag
            ON tag.id = tagRelation.tagID
          GROUP BY tagRelation.actorID
  
    ) AS tags_JSON
    ON actor.id = tags_JSON.actorID

    LEFT JOIN (

        SELECT
            nationalityRelation.actorID,
            JSON_AGG(
                nationalityRelation.nationality
            ) AS nationalities
        FROM nationalityRelation
        GROUP BY nationalityRelation.actorID

    ) AS nationalities_JSON
        ON actor.id = nationalities_JSON.actorID

    WHERE actor.name ILIKE '%' || $1 || '%'
        AND nationalities::jsonb ? ANY($5)
        AND tags_names::jsonb ? ANY($4)
    ORDER BY ${order}
        LIMIT $2 OFFSET $3`;
    const keys = [str, limit, offset, tags, nationalities];
    return db.query(myQuery, keys);
};

module.exports.getAllActorsWithInfosByIDS = (arr) => {
    const myQuery = `SELECT 
        actor.*,
        movies_JSON.movies,
        tags_JSON.tags,
        nationalities_JSON.nationalities
    FROM
        actor
        LEFT JOIN
            (SELECT
                movie_actor.actorID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', movie.id,
                        'title', movie.title
                        )
                ) AS movies
            FROM
                movie_actor
                JOIN movie ON movie.id = movie_actor.movieID
            GROUP BY
                movie_actor.actorID
        ) AS movies_JSON
        ON actor.id = movies_JSON.actorID
    LEFT JOIN
        (SELECT
            tagRelation.actorID,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', tag.id,
                    'name', tag.name                 
                )
            ) AS tags
            FROM
                tagRelation
                JOIN tag ON tag.id = tagRelation.tagID
            GROUP BY
                tagRelation.actorID
        ) AS tags_JSON
        ON actor.id = tags_JSON.actorID

    LEFT JOIN
        (SELECT
            nationalityRelation.actorID,
            JSON_AGG(
                nationalityRelation.nationality
            ) AS nationalities
            FROM nationalityRelation
            GROUP BY nationalityRelation.actorID
        ) AS nationalities_JSON
        ON actor.id = nationalities_JSON.actorID
    WHERE actor.id = ANY($1)
    ORDER BY
        actor.name ASC
        `;
    const key = [arr];
    return db.query(myQuery, key);
};

module.exports.getAllActorsWithInfosByNames = (arr) => {
    const myQuery = `SELECT 
        actor.*,
        movies_JSON.movies,
        tags_JSON.tags,
        nationalities_JSON.nationalities
    FROM
        actor
        LEFT JOIN
            (SELECT
                movie_actor.actorID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', movie.id,
                        'title', movie.title
                        )
                ) AS movies
            FROM
                movie_actor
                JOIN movie ON movie.id = movie_actor.movieID
            GROUP BY
                movie_actor.actorID
        ) AS movies_JSON
        ON actor.id = movies_JSON.actorID
    LEFT JOIN
        (SELECT
            tagRelation.actorID,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', tag.id,
                    'name', tag.name                 
                )
            ) AS tags
            FROM
                tagRelation
                JOIN tag ON tag.id = tagRelation.tagID
            GROUP BY
                tagRelation.actorID
        ) AS tags_JSON
        ON actor.id = tags_JSON.actorID

    LEFT JOIN
        (SELECT
            nationalityRelation.actorID,
            JSON_AGG(
                nationalityRelation.nationality
            ) AS nationalities
            FROM nationalityRelation
            GROUP BY nationalityRelation.actorID
        ) AS nationalities_JSON
        ON actor.id = nationalities_JSON.actorID
    WHERE actor.name = ANY($1)
    ORDER BY
        actor.name ASC
        `;
    const key = [arr];
    return db.query(myQuery, key);
};

/* RELATIONS */
module.exports.newRelations = (id, arr, table, idColumn, arrColumn) => {
    const myQuery = `INSERT INTO ${table} (${idColumn}, ${arrColumn}) VALUES ($1, UNNEST(cast($2 as integer[]))) RETURNING *`;
    const keys = [id, arr];
    return db.query(myQuery, keys);
};
module.exports.newRelationsByStrings = (
    id,
    arr,
    table,
    idColumn,
    arrColumn
) => {
    const myQuery = `INSERT INTO ${table} (${idColumn}, ${arrColumn}) VALUES ($1, UNNEST(cast($2 as text[]))) RETURNING *`;
    const keys = [id, arr];
    return db.query(myQuery, keys);
};
module.exports.getRelations = (id, table, idColumn) => {
    const myQuery = `SELECT * FROM ${table} WHERE ${idColumn} = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getRelationsByArr = (arr, table, column) => {
    const myQuery = `SELECT * FROM ${table} WHERE ${column} = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getRelationsBySearch = (idsArr, table, idColumn) => {
    const myQuery = `SELECT * 
    FROM ${table} 
    WHERE ${idColumn} ILIKE '%' || $1 || '%'
    ORDER BY ${idColumn} ASC`;
    const key = [idsArr];
    return db.query(myQuery, key);
};
module.exports.getAllRelations = (table) => {
    const myQuery = `SELECT * FROM ${table}`;
    return db.query(myQuery);
};
module.exports.deleteRelations = (id, arr, table, idColumn, arrColumn) => {
    const myQuery = `DELETE FROM ${table}
    WHERE ${idColumn} = $1
    AND (${arrColumn} = ANY($2) OR ${arrColumn} IS NULL)
    RETURNING *`;
    const keys = [id, arr];
    return db.query(myQuery, keys);
}; // eliminiamo tutti i record corrotti (IS NULL)

/* IMPORT TABLE (delete this after) */
// module.exports.importMovieRow = (
//     title,
//     pic,
//     rating,
//     urls,
//     release,
//     created_at
// ) => {
//     const myQuery = `INSERT INTO movie
//      (title, pic, rating, urls, release, created_at)
//      VALUES ($1, $2, $3, $4, $5, $6)
//      RETURNING *`;
//     const keys = [title, pic, rating, urls, release, created_at];
//     return db.query(myQuery, keys);
// };
// module.exports.importActorRow = (
//     name,
//     pic,
//     rating,
//     bday,
//     genre,
//     created_at
// ) => {
//     const myQuery = `INSERT INTO actor
//     (name, pic, rating, birthday, genre, created_at)
//     VALUES ($1, $2, $3, $4, $5, $6)
//     RETURNING *`;
//     const keys = [name, pic, rating, bday, genre, created_at];
//     return db.query(myQuery, keys);
// };
// module.exports.importStudioRow = (name, pic, website, created_at) => {
//     const myQuery = `INSERT INTO studio
//     (name, pic, website, created_at)
//     VALUES ($1, $2, $3, $4)
//     RETURNING *`;
//     const keys = [name, pic, website, created_at];
//     return db.query(myQuery, keys);
// };
// module.exports.importDistributionRow = (name, pic, website, created_at) => {
//     const myQuery = `INSERT INTO distribution
//     (name, pic, website, created_at)
//     VALUES ($1, $2, $3, $4)
//     RETURNING *`;
//     const keys = [name, pic, website, created_at];
//     return db.query(myQuery, keys);
// };
// module.exports.importCategoryRow = (name, pic, type, created_at) => {
//     const myQuery = `INSERT INTO category
//     (name, pic, type, created_at)
//     VALUES ($1, $2, $3, $4)
//     RETURNING *`;
//     const keys = [name, pic, type, created_at];
//     return db.query(myQuery, keys);
// };
// module.exports.importTagRow = (name, pic, type, created_at) => {
//     const myQuery = `INSERT INTO tag
//     (name, pic, type, created_at)
//     VALUES ($1, $2, $3, $4)
//     RETURNING *`;
//     const keys = [name, pic, type, created_at];
//     return db.query(myQuery, keys);
// };
// module.exports.importRecordRow = (movieID, created_at) => {
//     const myQuery = `INSERT INTO counter
//     (movieID, created_at)
//     VALUES ($1, $2)
//     RETURNING *`;
//     const keys = [movieID, created_at];
//     return db.query(myQuery, keys);
// };
// module.exports.importRelationRow = (idA, idB, table, idAColumn, idBColumn) => {
//     const myQuery = `INSERT INTO ${table}
//     (${idAColumn}, ${idBColumn})
//     VALUES ($1, $2)
//     RETURNING *`;
//     const keys = [idA, idB];
//     return db.query(myQuery, keys);
// };
module.exports.getIDsByNames = (arr, table) => {
    const myQuery = `SELECT ${table}.id FROM ${table} WHERE name = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};

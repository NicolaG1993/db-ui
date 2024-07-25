import { connect } from "@/src/application/db/db.js";

///////////////////////////
////////** ACTOR **////////
///////////////////////////

module.exports.newActor = (
    client,
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
    return client.query(myQuery, keys);
};

module.exports.editActor = (
    client,
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
    return client.query(myQuery, keys);
};

// module.exports.getAllActors = (client) => {
//     const myQuery = `SELECT * FROM actor ORDER BY name`;
//     return client.query(myQuery);
// }; // NOT IN USE

module.exports.getAllActorsWithInfos = (client, str, limit, offset, order) => {
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
    return client.query(myQuery, keys);
};

module.exports.filterAllActorsWithInfos = (
    client,
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
    return client.query(myQuery, keys);
};

module.exports.getAllActorsWithInfosByIDS = (client, arr) => {
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
    return client.query(myQuery, key);
};

module.exports.getAllActorsWithInfosByNames = (client, arr) => {
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
    return client.query(myQuery, key);
};

module.exports.getActorByID = (client, id) => {
    // const myQuery = `SELECT * FROM actor WHERE id = $1`;
    const myQuery = `WITH actor_info AS (
    SELECT 
        a.*,
        n.nationality
    FROM 
        actor a
    LEFT JOIN 
        nationalityRelation n ON a.id = n.actorID
    WHERE 
        a.id = $1
    ),
    actor_tags AS (
        SELECT 
            t.id,
            t.name,
            t.pic,
            t.type
        FROM 
            tag t
        INNER JOIN 
            tagRelation tr ON t.id = tr.tagID
        WHERE 
            tr.actorID = $1
    ),
    actor_movies AS (
        SELECT 
            m.id,
            m.title,
            m.pic,
            m.urls,
            m.rating,
            m.release
        FROM 
            movie m
        INNER JOIN 
            movie_actor ma ON m.id = ma.movieID
        WHERE 
            ma.actorID = $1
    ),
    movie_count AS (
        SELECT 
            COUNT(*) AS total_movies
        FROM 
            actor_movies
    ),
    studios AS (
        SELECT DISTINCT
            s.id,
            s.name,
            s.pic,
            s.website
        FROM 
            studio s
        INNER JOIN 
            movie_studio ms ON s.id = ms.studioID
        WHERE 
            ms.movieID IN (SELECT id FROM actor_movies)
    ),
    categories AS (
        SELECT DISTINCT
            c.id,
            c.name,
            c.pic,
            c.type
        FROM 
            category c
        INNER JOIN 
            categoryRelation cr ON c.id = cr.categoryID
        WHERE 
            cr.movieID IN (SELECT id FROM actor_movies)
    ),
    distributions AS (
        SELECT DISTINCT
            d.id,
            d.name,
            d.pic,
            d.website
        FROM 
            distribution d
        INNER JOIN 
            movie_distribution md ON d.id = md.distributionID
        WHERE 
            md.movieID IN (SELECT id FROM actor_movies)
    )

    SELECT 
        (SELECT json_agg(row_to_json(actor_info)) FROM actor_info) AS actor,
        (SELECT json_agg(row_to_json(actor_tags)) FROM actor_tags) AS tags,
        (SELECT total_movies FROM movie_count) AS total_movies,
        (SELECT json_agg(row_to_json(studios)) FROM studios) AS studios,
        (SELECT json_agg(row_to_json(categories)) FROM categories) AS categories,
        (SELECT json_agg(row_to_json(distributions)) FROM distributions) AS distributions`;
    const key = [id];
    return client.query(myQuery, key);
};

// module.exports.getActors = (client, arr) => {
//     const myQuery = `SELECT actor.name, actor.id, actor.pic, actor.rating FROM actor WHERE id = ANY($1) ORDER BY name`;
//     const key = [arr];
//     return client.query(myQuery, key);
// }; // NOT IN USE

///////////////////////////
////////** MOVIE **////////
///////////////////////////

module.exports.newMovie = (client, title, pic, rating, urls, release) => {
    const myQuery = `INSERT INTO movie 
    (title, pic, rating, urls, release) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;
    const keys = [title, pic, rating, urls, release];
    return client.query(myQuery, keys);
};

module.exports.newMoviesFromUrls = (client, arr) => {
    const myQuery = `INSERT INTO movie (title, urls)
    SELECT
    datajson->>'title',
    ARRAY [datajson->>'url']
    FROM 
    jsonb_array_elements($1::jsonb)
    AS t(datajson)
    RETURNING *`;
    const key = [arr];
    return client.query(myQuery, key);
};

module.exports.editMovie = (client, id, title, pic, rating, urls, release) => {
    const myQuery = `UPDATE movie 
        SET title = COALESCE($2, title), pic = $3, rating = $4, urls = $5, release = $6
        WHERE id = $1
        RETURNING *`;
    const keys = [id, title, pic, rating, urls, release];
    return client.query(myQuery, keys);
};

module.exports.getAllMovies = (client) => {
    const myQuery = `SELECT * FROM movie ORDER BY title`;
    return client.query(myQuery);
};

module.exports.getAllMoviesWithInfos = (client, str, limit, offset, order) => {
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
    return client.query(myQuery, keys);
};

module.exports.getAllMoviesWithInfosByIDS = (client, arr) => {
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
    return client.query(myQuery, key);
};

module.exports.getMovieByID = (client, id) => {
    // const myQuery = `SELECT * FROM movie WHERE id = $1`;
    const myQuery = `WITH movie_details AS (
        SELECT 
            m.id AS movie_id,
            m.title,
            m.pic AS movie_pic,
            m.urls AS movie_urls,
            m.rating AS movie_rating,
            m.release AS movie_release,
            COUNT(DISTINCT ma.actorID) AS actor_count
        FROM 
            movie m
        LEFT JOIN 
            movie_actor ma ON m.id = ma.movieID
        WHERE 
            m.id = $1
        GROUP BY 
            m.id
    ), categories AS (
        SELECT 
            c.id,
            c.name,
            c.pic,
            c.type
        FROM 
            categoryRelation cr
        JOIN 
            category c ON cr.categoryID = c.id
        WHERE 
            cr.movieID = $1
    ), studios AS (
        SELECT 
            s.id,
            s.name,
            s.pic,
            s.website
        FROM 
            movie_studio ms
        JOIN 
            studio s ON ms.studioID = s.id
        WHERE 
            ms.movieID = $1
    ), distributions AS (
        SELECT 
            d.id,
            d.name,
            d.pic,
            d.website
        FROM 
            movie_distribution md
        JOIN 
            distribution d ON md.distributionID = d.id
        WHERE 
            md.movieID = $1
    ), all_tags AS (
        SELECT 
            t.id,
            t.name,
            t.pic,
            t.type
        FROM 
            tagRelation tr
        JOIN 
            tag t ON tr.tagID = t.id
        WHERE 
            tr.movieID = $1
            OR tr.actorID IN (SELECT actorID FROM movie_actor WHERE movieID = $1)
    ), actors AS (
        SELECT 
            a.id,
            a.name
        FROM 
            movie_actor ma
        JOIN 
            actor a ON ma.actorID = a.id
        WHERE 
            ma.movieID = $1
    )
    SELECT 
        md.movie_id,
        md.title,
        md.movie_pic,
        md.movie_urls,
        md.movie_rating,
        md.movie_release,
        md.actor_count,
        CASE WHEN COUNT(DISTINCT c.id) > 0 THEN json_agg(DISTINCT c.*) ELSE null END AS categories,
        CASE WHEN COUNT(DISTINCT s.id) > 0 THEN json_agg(DISTINCT s.*) ELSE null END AS studios,
        CASE WHEN COUNT(DISTINCT d.id) > 0 THEN json_agg(DISTINCT d.*) ELSE null END AS distributions,
        CASE WHEN COUNT(DISTINCT at.id) > 0 THEN json_agg(DISTINCT at.*) ELSE null END AS tags,
        CASE WHEN COUNT(DISTINCT a.id) > 0 THEN json_agg(DISTINCT a.*) ELSE null END AS actors
    FROM 
        movie_details md
    LEFT JOIN 
        categories c ON TRUE
    LEFT JOIN 
        studios s ON TRUE
    LEFT JOIN 
        distributions d ON TRUE
    LEFT JOIN 
        all_tags at ON TRUE
    LEFT JOIN 
        actors a ON TRUE
    GROUP BY 
        md.movie_id, md.title, md.movie_pic, md.movie_urls, md.movie_rating, md.movie_release, md.actor_count`;
    const key = [id];
    return client.query(myQuery, key);
};

// module.exports.getMovies = (client, arr) => {
//     const myQuery = `SELECT movie.title, movie.id, movie.pic, movie.rating FROM movie WHERE id = ANY($1) ORDER BY title`;
//     const key = [arr];
//     return client.query(myQuery, key);
// };

///////////////////////////
///////** STUDIO **////////
///////////////////////////

module.exports.newStudio = (client, name, pic, website) => {
    const myQuery = `INSERT INTO studio 
    (name, pic, website) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, website];
    return client.query(myQuery, keys);
};

module.exports.editStudio = (client, id, name, pic, website) => {
    const myQuery = `UPDATE studio 
        SET name = COALESCE($2, name), pic = $3, website = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, website];
    return client.query(myQuery, keys);
};

module.exports.getAllStudios = (client, str) => {
    const myQuery = `SELECT * 
    FROM studio 
    WHERE name ILIKE '%' || $1 || '%' OR website ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return client.query(myQuery, key);
};

module.exports.getStudioByID = (client, id) => {
    // const myQuery = `SELECT * FROM studio WHERE id = $1`;
    const myQuery = `WITH actor_movie_count AS (
    SELECT 
        a.id AS actor_id,
        a.name AS actor_name,
        COUNT(DISTINCT ma.movieID) AS movies_count
    FROM 
        actor a
        JOIN movie_actor ma ON a.id = ma.actorID
        JOIN movie m ON ma.movieID = m.id
        JOIN movie_studio ms ON m.id = ms.movieID
    WHERE 
        ms.studioID = $1
    GROUP BY 
        a.id, a.name
),
movie_count AS (
    SELECT 
        COUNT(DISTINCT m.id) AS total_movies
    FROM 
        movie_studio ms
        JOIN movie m ON ms.movieID = m.id
    WHERE 
        ms.studioID = $1
)
SELECT 
    s.id AS studio_id,
    s.created_at AS studio_created_at,
    s.name AS studio_name,
    s.pic AS studio_pic,
    s.website AS studio_website,
    COALESCE(mc.total_movies, 0) AS total_movies,
    json_agg(
        jsonb_build_object(
            'actor_id', amc.actor_id,
            'actor_name', amc.actor_name,
            'movies_count', amc.movies_count
        )
        ORDER BY amc.actor_name
    ) AS actors
FROM 
    studio s
    LEFT JOIN movie_studio ms ON s.id = ms.studioID
    LEFT JOIN movie m ON ms.movieID = m.id
    LEFT JOIN movie_actor ma ON m.id = ma.movieID
    LEFT JOIN actor_movie_count amc ON ma.actorID = amc.actor_id
    LEFT JOIN movie_count mc ON true
WHERE 
    s.id = $1
GROUP BY 
    s.id, s.created_at, s.name, s.pic, s.website, mc.total_movies
ORDER BY 
    s.name`;
    const key = [id];
    return client.query(myQuery, key);
};

// module.exports.getStudios = (client, arr) => {
//     let myQuery = `SELECT studio.name, studio.id FROM studio WHERE id = ANY($1)`;
//     const key = [arr];
//     return client.query(myQuery, key);
// };

///////////////////////////
////** DISTRIBUTION **/////
///////////////////////////

module.exports.newDistribution = (client, name, pic, website) => {
    const myQuery = `INSERT INTO distribution 
    (name, pic, website) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, website];
    return client.query(myQuery, keys);
};

module.exports.editDistribution = (client, id, name, pic, website) => {
    const myQuery = `UPDATE distribution 
        SET name = COALESCE($2, name), pic = $3, website = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, website];
    return client.query(myQuery, keys);
};

module.exports.getAllDistributions = (client, str) => {
    const myQuery = `SELECT * 
    FROM distribution 
    WHERE name ILIKE '%' || $1 || '%' OR website ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return client.query(myQuery, key);
};

module.exports.getDistributionByID = (client, id) => {
    // const myQuery = `SELECT * FROM distribution WHERE id = $1`;
    const myQuery = `WITH actor_movie_count AS (
    SELECT 
        a.id AS actor_id,
        a.name AS actor_name,
        COUNT(DISTINCT ma.movieID) AS movies_count
    FROM 
        actor a
        JOIN movie_actor ma ON a.id = ma.actorID
        JOIN movie m ON ma.movieID = m.id
        JOIN movie_distribution md ON m.id = md.movieID
    WHERE 
        md.distributionID = $1
    GROUP BY 
        a.id, a.name
),
movie_count AS (
    SELECT 
        COUNT(DISTINCT m.id) AS total_movies
    FROM 
        movie_distribution md
        JOIN movie m ON md.movieID = m.id
    WHERE 
        md.distributionID = $1
)
SELECT 
    d.id AS distribution_id,
    d.created_at AS distribution_created_at,
    d.name AS distribution_name,
    d.pic AS distribution_pic,
    d.website AS distribution_website,
    COALESCE(mc.total_movies, 0) AS total_movies,
    json_agg(
        jsonb_build_object(
            'actor_id', amc.actor_id,
            'actor_name', amc.actor_name,
            'movies_count', amc.movies_count
        )
        ORDER BY amc.actor_name
    ) AS actors
FROM 
    distribution d
    LEFT JOIN movie_distribution md ON d.id = md.distributionID
    LEFT JOIN movie m ON md.movieID = m.id
    LEFT JOIN movie_actor ma ON m.id = ma.movieID
    LEFT JOIN actor_movie_count amc ON ma.actorID = amc.actor_id
    LEFT JOIN movie_count mc ON true
WHERE 
    d.id = $1
GROUP BY 
    d.id, d.created_at, d.name, d.pic, d.website, mc.total_movies
ORDER BY 
    d.name`;
    const key = [id];
    return client.query(myQuery, key);
};

// module.exports.getDistributions = (client, arr) => {
//     const myQuery = `SELECT distribution.name, distribution.id FROM distribution WHERE id = ANY($1)`;
//     const key = [arr];
//     return client.query(myQuery, key);
// };

///////////////////////////
//////** CATEGORY **///////
///////////////////////////
module.exports.newCategory = (client, name, pic, type) => {
    const myQuery = `INSERT INTO category 
    (name, pic, type) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, type];
    return client.query(myQuery, keys);
};

module.exports.editCategory = (client, id, name, pic, type) => {
    const myQuery = `UPDATE category 
        SET name = COALESCE($2, name), pic = $3, type = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, type];
    return client.query(myQuery, keys);
};

module.exports.getAllCategories = (client, str) => {
    const myQuery = `SELECT * 
    FROM category
    WHERE name ILIKE '%' || $1 || '%' OR type ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return client.query(myQuery, key);
};

module.exports.getCategoryByID = (client, id) => {
    // const myQuery = `SELECT * FROM category WHERE id = $1`;
    // const myQuery = `SELECT
    // c.id AS category_id,
    // c.created_at AS category_created_at,
    // c.name AS category_name,
    // c.pic AS category_pic,
    // c.type AS category_type,
    // COUNT(DISTINCT m.id) AS total_movies,
    // json_agg(
    //     json_build_object(
    //         'actor_id', a.id,
    //         'actor_name', a.name,
    //         'movies_count', COUNT(DISTINCT m.id)
    //     ) ORDER BY a.name
    // ) AS actors
    // FROM
    //     category c
    //     LEFT JOIN categoryRelation cr ON c.id = cr.categoryID
    //     LEFT JOIN movie m ON cr.movieID = m.id
    //     LEFT JOIN movie_actor ma ON m.id = ma.movieID
    //     LEFT JOIN actor a ON ma.actorID = a.id
    // WHERE
    //     c.id = $1
    // GROUP BY
    //     c.id, c.created_at, c.name, c.pic, c.type
    // ORDER BY
    //     c.name`;

    const myQuery = `WITH actor_movie_count AS (
        SELECT
            a.id AS actor_id,
            a.name AS actor_name,
            COUNT(DISTINCT ma.movieID) AS movies_count
        FROM
            actor a
            JOIN movie_actor ma ON a.id = ma.actorID
            JOIN categoryRelation cr ON ma.movieID = cr.movieID
        WHERE
            cr.categoryID = $1
        GROUP BY
            a.id, a.name
    )
    SELECT
        c.id AS category_id,
        c.created_at AS category_created_at,
        c.name AS category_name,
        c.pic AS category_pic,
        c.type AS category_type,
        COUNT(DISTINCT m.id) AS total_movies,
        json_agg(
            json_build_object(
                'actor_id', amc.actor_id,
                'actor_name', amc.actor_name,
                'movies_count', amc.movies_count
            ) ORDER BY amc.actor_name
        ) AS actors
    FROM
        category c
        LEFT JOIN categoryRelation cr ON c.id = cr.categoryID
        LEFT JOIN movie m ON cr.movieID = m.id
        LEFT JOIN movie_actor ma ON m.id = ma.movieID
        LEFT JOIN actor_movie_count amc ON ma.actorID = amc.actor_id
    WHERE
        c.id = $1
    GROUP BY
        c.id, c.created_at, c.name, c.pic, c.type
    ORDER BY
        c.name`;

    const key = [id];
    return client.query(myQuery, key);
};

// module.exports.getCategories = (client, arr) => {
//     const myQuery = `SELECT category.name, category.id, category.type FROM category WHERE id = ANY($1)`;
//     const key = [arr];
//     return client.query(myQuery, key);
// };

///////////////////////////
/////////** TAG **/////////
///////////////////////////
module.exports.newTag = (client, name, pic, type) => {
    const myQuery = `INSERT INTO tag 
    (name, pic, type) 
    VALUES ($1, $2, $3)  
    RETURNING *`;
    const keys = [name, pic, type];
    return client.query(myQuery, keys);
};

module.exports.editTag = (client, id, name, pic, type) => {
    const myQuery = `UPDATE tag 
        SET name = COALESCE($2, name), pic = $3, type = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, type];
    return client.query(myQuery, keys);
};

module.exports.getAllTags = (client, str) => {
    const myQuery = `SELECT * 
    FROM tag 
    WHERE name ILIKE '%' || $1 || '%' OR type ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return client.query(myQuery, key);
};

module.exports.getTagByID = (client, id) => {
    // const myQuery = `SELECT * FROM tag WHERE id = $1`;
    const myQuery = `WITH actor_movie_count AS (
        SELECT
            a.id AS actor_id,
            a.name AS actor_name,
            COUNT(DISTINCT ma.movieID) AS movies_count
        FROM
            actor a
            JOIN movie_actor ma ON a.id = ma.actorID
            JOIN tagRelation tr ON ma.movieID = tr.movieID
        WHERE
            tr.tagID = $1
        GROUP BY
            a.id, a.name
    )
    SELECT
        t.id AS tag_id,
        t.created_at AS tag_created_at,
        t.name AS tag_name,
        t.pic AS tag_pic,
        t.type AS tag_type,
        COUNT(DISTINCT m.id) AS total_movies,
        json_agg(
            json_build_object(
                'actor_id', amc.actor_id,
                'actor_name', amc.actor_name,
                'movies_count', amc.movies_count
            ) ORDER BY amc.actor_name
        ) AS actors
    FROM
        tag t
        LEFT JOIN tagRelation tr ON t.id = tr.tagID
        LEFT JOIN movie m ON tr.movieID = m.id
        LEFT JOIN movie_actor ma ON m.id = ma.movieID
        LEFT JOIN actor_movie_count amc ON ma.actorID = amc.actor_id
    WHERE
        t.id = $1
    GROUP BY
        t.id, t.created_at, t.name, t.pic, t.type
    ORDER BY
        t.name`;
    const key = [id];
    return client.query(myQuery, key);
};

// module.exports.getTags = (client, arr) => {
//     const myQuery = `SELECT tag.name, tag.id, tag.type FROM tag WHERE id = ANY($1)`;
//     const key = [arr];
//     return client.query(myQuery, key);
// };

///////////////////////////
/////** PAGINATIONS **/////
///////////////////////////
module.exports.getCategoryMoviesPage = (
    client,
    itemId,
    direction,
    order,
    limit,
    offset
) => {
    /*
    I need to take all movies (relationsLabel = "movie")
    that contains itemId
    item = itemLabel = "actor", "category", ...
    */

    /* 🔴🧠🔴🧠 👇⚠️
    Significa che devo guardare nella relations table quali movies (ad es.) hanno una relation con quel category (ad es.)
    Devo poi tornare quei movies con tutte le informazioni richieste per la movie card
   
    const myQuery = `SELECT * 
    FROM ${relationsLabel} 
    WHERE ${idColumn} ILIKE '%' || $1 || '%'
    ORDER BY ${idColumn} ASC`; 
      */

    // 🔴⚠️🔴⚠️🔴⚠️ now works only for category-movie 🔴⚠️🔴⚠️🔴⚠️
    /*
    const myQuery = `SELECT m.*
    FROM movie m
    JOIN categoryRelation cr ON m.id = cr.movieID
    WHERE cr.categoryID = $1
    ORDER BY m.${order} ${direction}
    LIMIT ${limit} OFFSET ${offset}`;
    */

    const myQuery = `WITH movie_with_cast AS (
    SELECT 
        m.*,
        (
            SELECT json_agg(
                json_build_object(
                    'id', a.id,
                    'name', a.name
                )
            )
            FROM actor a
            JOIN movie_actor ma ON a.id = ma.actorID
            WHERE ma.movieID = m.id
        ) AS cast
            FROM movie m
            JOIN categoryRelation cr ON m.id = cr.movieID
            WHERE cr.categoryID = $1
            ORDER BY m.${order} ${direction}
            LIMIT ${limit} OFFSET ${offset}
        )
        SELECT * FROM movie_with_cast`;

    // const myQuery = `DELETE FROM ${table}
    // WHERE ${idColumn} = $1
    // AND (${arrColumn} = ANY($2) OR ${arrColumn} IS NULL)
    // RETURNING *`;

    // const keys = [itemId, itemLabel, relationsLabel, direction, order, page, limit];
    const keys = [itemId];
    return client.query(myQuery, keys);
};
module.exports.getTagMoviesPage = (
    client,
    itemId,
    direction,
    order,
    limit,
    offset
) => {
    const myQuery = `WITH movie_with_cast AS (
    SELECT 
        m.*,
        (
            SELECT json_agg(
                json_build_object(
                    'id', a.id,
                    'name', a.name
                )
            )
            FROM actor a
            JOIN movie_actor ma ON a.id = ma.actorID
            WHERE ma.movieID = m.id
        ) AS cast
            FROM movie m
            JOIN tagRelation tr ON m.id = tr.movieID
            WHERE tr.tagID = $1
            ORDER BY m.${order} ${direction}
            LIMIT ${limit} OFFSET ${offset}
        )
        SELECT * FROM movie_with_cast`;
    const keys = [itemId];
    return client.query(myQuery, keys);
};
module.exports.getStudioMoviesPage = (
    client,
    itemId,
    direction,
    order,
    limit,
    offset
) => {
    const myQuery = `WITH movie_with_cast AS (
    SELECT 
        m.*,
        (
            SELECT json_agg(
                json_build_object(
                    'id', a.id,
                    'name', a.name
                )
            )
            FROM actor a
            JOIN movie_actor ma ON a.id = ma.actorID
            WHERE ma.movieID = m.id
        ) AS cast
            FROM movie m
            JOIN movie_studio ms ON m.id = ms.movieID
            WHERE ms.studioID = $1
            ORDER BY m.${order} ${direction}
            LIMIT ${limit} OFFSET ${offset}
        )
        SELECT * FROM movie_with_cast`;
    const keys = [itemId];
    return client.query(myQuery, keys);
};
module.exports.getDistributionMoviesPage = (
    client,
    itemId,
    direction,
    order,
    limit,
    offset
) => {
    const myQuery = `WITH movie_with_cast AS (
    SELECT 
        m.*,
        (
            SELECT json_agg(
                json_build_object(
                    'id', a.id,
                    'name', a.name
                )
            )
            FROM actor a
            JOIN movie_actor ma ON a.id = ma.actorID
            WHERE ma.movieID = m.id
        ) AS cast
            FROM movie m
            JOIN movie_distribution md ON m.id = md.movieID
            WHERE md.distributionID = $1
            ORDER BY m.${order} ${direction}
            LIMIT ${limit} OFFSET ${offset}
        )
        SELECT * FROM movie_with_cast`;
    const keys = [itemId];
    return client.query(myQuery, keys);
};
module.exports.getActorMoviesPage = (
    client,
    itemId,
    direction,
    order,
    limit,
    offset
) => {
    // const myQuery = `SELECT m.*
    // FROM movie m
    // JOIN tagRelation tr ON a.id = tr.movieID
    // WHERE tr.tagID = $1
    // ORDER BY m.${order} ${direction}
    // LIMIT ${limit} OFFSET ${page * limit}`;
    const myQuery = `WITH movie_with_cast AS (
        SELECT 
            m.*,
            (
                SELECT json_agg(
                    json_build_object(
                        'id', a.id,
                        'name', a.name
                    )
                )
                FROM actor a
                JOIN movie_actor ma ON a.id = ma.actorID
                WHERE ma.movieID = m.id
            ) AS cast
        FROM movie m
        JOIN movie_actor ma ON m.id = ma.movieID
        WHERE ma.actorID = $1
        ORDER BY m.${order} ${direction}
        LIMIT ${limit} OFFSET ${offset}
    )
    SELECT * FROM movie_with_cast`;
    const keys = [itemId];
    return client.query(myQuery, keys);
};
module.exports.getMovieActorsPage = (
    client,
    itemId,
    direction,
    order,
    limit,
    offset
) => {
    const myQuery = `SELECT 
        a.id,
        a.name,
        a.pic,
        a.rating,
        a.birthday,
        a.genre,
        a.twitter,
        a.instagram,
        a.more_urls,
        (
            SELECT COUNT(*)
            FROM movie_actor ma2
            WHERE ma2.actorID = a.id
        ) AS total_movies
    FROM actor a
    JOIN movie_actor ma ON a.id = ma.actorID
    WHERE ma.movieID = $1
    ORDER BY a.${order} ${direction}
    LIMIT ${limit} OFFSET ${offset}`;
    const keys = [itemId];
    return client.query(myQuery, keys);
};

import { Pool } from "pg";

let db;
if (!db) {
    db = new Pool({
        user: process.env.OLD_DATABASE_USER,
        password: process.env.OLD_DATABASE_PSW,
        host: process.env.OLD_DATABASE_HOST,
        port: process.env.OLD_DATABASE_PORT,
        database: process.env.OLD_DATABASE_NAME,
    });
}

module.exports.db;

// const spicedPg = require("spiced-pg");
// const pg = require("pg");
// const db = pg.Pool(process.env.DATABASE_URL);

/* CLIPS */
module.exports.newClip = (title, pic, rating, urls, release) => {
    const myQuery = `INSERT INTO clips 
    (title, pic, rating, urls, release) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;
    const keys = [title, pic, rating, urls, release];
    return db.query(myQuery, keys);
};
module.exports.editClip = (id, title, pic, rating, urls, release) => {
    const myQuery = `UPDATE clips 
        SET title = COALESCE($2, title), pic = $3, rating = $4, urls = $5, release = $6
        WHERE id = $1
        RETURNING *`;
    const keys = [id, title, pic, rating, urls, release];
    return db.query(myQuery, keys);
};
// module.exports.getClipByID = (id) => {
//     const myQuery = `SELECT clips.*, models.*
//     FROM clipModelsRelation
//     JOIN clips on clipModelsRelation.clipID = clips.id
//     JOIN models on clipModelsRelation.ID = models.id
//     WHERE clips.id = $1`;
//     const key = [id];
//     return db.query(myQuery, key);
// };
module.exports.getClipByID = (id) => {
    const myQuery = `SELECT * FROM clips WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* MODELS */
module.exports.newModel = (name, pic, rating, bday, genre) => {
    const myQuery = `INSERT INTO models 
    (name, pic, rating, birthday, genre) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;
    const keys = [name, pic, rating, bday, genre];
    return db.query(myQuery, keys);
};
module.exports.editModel = (id, name, pic, rating, bday, genre) => {
    const myQuery = `UPDATE models 
        SET name = COALESCE($2, name), pic = $3, rating = $4, birthday = $5, genre = $6
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, rating, bday, genre];
    return db.query(myQuery, keys);
};
module.exports.getModelByID = (id) => {
    const myQuery = `SELECT * FROM models WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* STUDIOS */
module.exports.newStudio = (name, pic, website) => {
    const myQuery = `INSERT INTO studios 
    (name, pic, website) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, website];
    return db.query(myQuery, keys);
};
module.exports.editStudio = (id, name, pic, website) => {
    const myQuery = `UPDATE studios 
        SET name = COALESCE($2, name), pic = $3, website = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, website];
    return db.query(myQuery, keys);
};
module.exports.getStudioByID = (id) => {
    const myQuery = `SELECT * FROM studios WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* DISTRIBUTION */
module.exports.newDistribution = (name, pic, website) => {
    const myQuery = `INSERT INTO distribution 
    (name, pic, website) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, website];
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
module.exports.getDistributionByID = (id) => {
    const myQuery = `SELECT * FROM distribution WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* CATEGORIES */
module.exports.newCategory = (name, pic, type) => {
    const myQuery = `INSERT INTO categories 
    (name, pic, type) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, pic, type];
    return db.query(myQuery, keys);
};
module.exports.editCategory = (id, name, pic, type) => {
    const myQuery = `UPDATE categories 
        SET name = COALESCE($2, name), pic = $3, type = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, type];
    return db.query(myQuery, keys);
};
module.exports.getCategoryByID = (id) => {
    const myQuery = `SELECT * FROM categories WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* TAGS */
module.exports.newTag = (name, pic, type) => {
    const myQuery = `INSERT INTO tags 
    (name, pic, type) 
    VALUES ($1, $2, $3)  
    RETURNING *`;
    const keys = [name, pic, type];
    return db.query(myQuery, keys);
};
module.exports.editTag = (id, name, pic, type) => {
    const myQuery = `UPDATE tags 
        SET name = COALESCE($2, name), pic = $3, type = $4
        WHERE id = $1
        RETURNING *`;
    const keys = [id, name, pic, type];
    return db.query(myQuery, keys);
};
module.exports.getTagByID = (id) => {
    const myQuery = `SELECT * FROM tags WHERE id = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* RECORDS */
module.exports.editRecord = (id, date) => {
    const myQuery = `UPDATE counter 
        SET created_at = $2
        WHERE id = $1
        RETURNING *`;
    const keys = [id, date];
    return db.query(myQuery, keys);
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

module.exports.deleteRelations = (id, arr, table, idColumn, arrColumn) => {
    const myQuery = `DELETE FROM ${table}
    WHERE ${idColumn} = $1
    AND ${arrColumn} = ANY($2)
    RETURNING *`;
    const keys = [id, arr];
    return db.query(myQuery, keys);
};
module.exports.getAllRelations = (table) => {
    const myQuery = `SELECT * FROM ${table}`;
    return db.query(myQuery);
};
module.exports.getRelations = (id, table, idColumn) => {
    const myQuery = `SELECT * FROM ${table} WHERE ${idColumn} = $1`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getRelationsByArr = (idsArr, table, idColumn) => {
    const myQuery = `SELECT * FROM ${table} WHERE ${idColumn} = ANY($1)`;
    const key = [idsArr];
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

/* DYNAMIC */
module.exports.deleteRecord = (id, table, column) => {
    const myQuery = `DELETE FROM ${table}
    WHERE ${column || "id"} = $1
    RETURNING *`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.addCounter = (id, table, column) => {
    const myQuery = `INSERT INTO ${table}
    (${column || "id"})
    VALUES ($1) 
    RETURNING *`;
    const key = [id];
    return db.query(myQuery, key);
};
module.exports.getCounterByID = (id, table, column) => {
    const myQuery = `SELECT * FROM ${table}
    WHERE ${column || "id"} = $1`;
    const key = [id];
    return db.query(myQuery, key);
};

/* GET ALL */
module.exports.getAllClips = () => {
    const myQuery = `SELECT * FROM clips ORDER BY created_at ASC`;
    return db.query(myQuery);
};
module.exports.getClips = (arr) => {
    const myQuery = `SELECT clips.title, clips.id, clips.pic, clips.rating FROM clips WHERE id = ANY($1) ORDER BY title`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getAllModels = () => {
    const myQuery = `SELECT * FROM models ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getModels = (arr) => {
    const myQuery = `SELECT models.name, models.id, models.pic, models.rating FROM models WHERE id = ANY($1) ORDER BY name`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getAllStudios = () => {
    const myQuery = `SELECT * 
    FROM studios 
    ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getStudios = (arr, table_key) => {
    let myQuery = `SELECT studios.name, studios.id FROM studios WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getAllDistributions = () => {
    const myQuery = `SELECT * 
    FROM distribution 
    ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getDistribution = (arr) => {
    const myQuery = `SELECT distribution.name, distribution.id FROM distribution WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getAllCategories = () => {
    const myQuery = `SELECT * 
    FROM categories 
    ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getCategories = (arr) => {
    const myQuery = `SELECT categories.name, categories.id, categories.type FROM categories WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};
module.exports.getAllTags = () => {
    const myQuery = `SELECT * 
    FROM tags 
    ORDER BY name`;
    return db.query(myQuery);
};
module.exports.getTags = (arr) => {
    const myQuery = `SELECT tags.name, tags.id, tags.type FROM tags WHERE id = ANY($1)`;
    const key = [arr];
    return db.query(myQuery, key);
};

module.exports.getAllRecords = () => {
    const myQuery = `SELECT * FROM counter ORDER BY created_at ASC`;
    return db.query(myQuery);
};

/* SEARCH */
module.exports.search = (str, table, column) => {
    const myQuery = `SELECT * FROM ${table} WHERE ${column} ILIKE '%' || $1 || '%'`;
    const key = [str];
    return db.query(myQuery, key);
};

/*
module.exports.searchClips = (str, models) => {
    const myQuery = `SELECT 
        clips.*,
        cast_JSON.cast,
        production_JSON.production,
        distribution_JSON.distribution,
        categories_JSON.categories,
        tags_JSON.tags
     FROM
        clips
        LEFT JOIN
            (SELECT 
                clipModelsRelation.clipID, 
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', models.id,
                        'name', models.name                 
                        )
                    ) AS cast
            FROM
                clipModelsRelation
                JOIN models        
                ON models.id = clipModelsRelation.modelID
            GROUP BY
                clipModelsRelation.clipID
            ) AS cast_JSON
            ON clips.id = cast_JSON.clipID    
        LEFT JOIN
            (SELECT
                clipStudiosRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', studios.id,
                        'name', studios.name                 
                        )
                    ) AS production
                FROM
                    clipStudiosRelation
                    JOIN studios ON studios.id = clipStudiosRelation.studioID
                GROUP BY
                    clipStudiosRelation.clipID
            ) AS production_JSON
            ON clips.id = production_JSON.clipID
        LEFT JOIN
            (SELECT
                clipDistributionRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', distribution.id,
                        'name', distribution.name                 
                        )
                    ) AS distribution
                FROM
                    clipDistributionRelation
                    JOIN distribution ON distribution.id = clipDistributionRelation.distributionID
                GROUP BY
                    clipDistributionRelation.clipID
            ) AS distribution_JSON
            ON clips.id = distribution_JSON.clipID
        LEFT JOIN
            (SELECT
                categoriesRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', categories.id,
                        'name', categories.name                 
                        )
                    ) AS categories
                FROM
                    categoriesRelation
                    JOIN categories ON categories.id = categoriesRelation.categoryID
                GROUP BY
                    categoriesRelation.clipID
            ) AS categories_JSON
            ON clips.id = categories_JSON.clipID
        LEFT JOIN
            (SELECT
                tagsRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', tags.id,
                        'name', tags.name                 
                        )
                    ) AS tags
                FROM
                    tagsRelation
                    JOIN tags ON tags.id = tagsRelation.tagID
                GROUP BY
                    tagsRelation.clipID
            ) AS tags_JSON
            ON clips.id = tags_JSON.clipID
    WHERE clips.title ILIKE '%' || $1 || '%'
    ORDER BY
        clips.created_at DESC`;
    const keys = [str, models];
    return db.query(myQuery, keys);
};
*/

/* JOINS */

// module.exports.getAllClipsWithInfos = () => {
//     const myQuery = `SELECT
//         clips.*,
//         json_agg(json_build_object('name', models.name, 'id', models.id)) AS cast
//      FROM clips
//      LEFT OUTER JOIN clipModelsRelation
//      ON clips.id = clipModelsRelation.clipID
//      LEFT OUTER JOIN models
//      ON clipModelsRelation.modelID = models.id
//      GROUP BY clips.id`;
//     return db.query(myQuery);
// };

module.exports.getAllClipsWithInfos = (str) => {
    const myQuery = `SELECT 
        clips.*,
        cast_JSON.cast,
        production_JSON.production,
        distribution_JSON.distribution,
        categories_JSON.categories,
        tags_JSON.tags
     FROM
        clips
        LEFT JOIN
            (SELECT 
                clipModelsRelation.clipID, 
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', models.id,
                        'name', models.name                 
                        )
                    ) AS cast
            FROM
                clipModelsRelation
                JOIN models ON models.id = clipModelsRelation.modelID
            GROUP BY
                clipModelsRelation.clipID
            ) AS cast_JSON
            ON clips.id = cast_JSON.clipID
        LEFT JOIN
            (SELECT
                clipStudiosRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', studios.id,
                        'name', studios.name                 
                        )
                    ) AS production
                FROM
                    clipStudiosRelation
                    JOIN studios ON studios.id = clipStudiosRelation.studioID
                GROUP BY
                    clipStudiosRelation.clipID
            ) AS production_JSON
            ON clips.id = production_JSON.clipID
        LEFT JOIN
            (SELECT
                clipDistributionRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', distribution.id,
                        'name', distribution.name                 
                        )
                    ) AS distribution
                FROM
                    clipDistributionRelation
                    JOIN distribution ON distribution.id = clipDistributionRelation.distributionID
                GROUP BY
                    clipDistributionRelation.clipID
            ) AS distribution_JSON
            ON clips.id = distribution_JSON.clipID
        LEFT JOIN
            (SELECT
                categoriesRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', categories.id,
                        'name', categories.name                 
                        )
                    ) AS categories
                FROM
                    categoriesRelation
                    JOIN categories ON categories.id = categoriesRelation.categoryID
                GROUP BY
                    categoriesRelation.clipID
            ) AS categories_JSON
            ON clips.id = categories_JSON.clipID
        LEFT JOIN
            (SELECT
                tagsRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', tags.id,
                        'name', tags.name                 
                        )
                    ) AS tags
                FROM
                    tagsRelation
                    JOIN tags ON tags.id = tagsRelation.tagID
                GROUP BY
                    tagsRelation.clipID
            ) AS tags_JSON
            ON clips.id = tags_JSON.clipID
    WHERE clips.title ILIKE '%' || $1 || '%'
    ORDER BY
        clips.created_at DESC
`;
    const key = [str];
    return db.query(myQuery, key);
};

module.exports.getAllClipsWithInfosByIDS = (arr) => {
    const myQuery = `SELECT 
        clips.*,
        cast_JSON.cast,
        production_JSON.production,
        distribution_JSON.distribution,
        categories_JSON.categories,
        tags_JSON.tags
     FROM
        clips
        LEFT JOIN
            (SELECT 
                clipModelsRelation.clipID, 
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', models.id,
                        'name', models.name                 
                        )
                    ) AS cast
            FROM
                clipModelsRelation
                JOIN models ON models.id = clipModelsRelation.modelID
            GROUP BY
                clipModelsRelation.clipID
            ) AS cast_JSON
            ON clips.id = cast_JSON.clipID
        LEFT JOIN
            (SELECT
                clipStudiosRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', studios.id,
                        'name', studios.name                 
                        )
                    ) AS production
                FROM
                    clipStudiosRelation
                    JOIN studios ON studios.id = clipStudiosRelation.studioID
                GROUP BY
                    clipStudiosRelation.clipID
            ) AS production_JSON
            ON clips.id = production_JSON.clipID
        LEFT JOIN
            (SELECT
                clipDistributionRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', distribution.id,
                        'name', distribution.name                 
                        )
                    ) AS distribution
                FROM
                    clipDistributionRelation
                    JOIN distribution ON distribution.id = clipDistributionRelation.distributionID
                GROUP BY
                    clipDistributionRelation.clipID
            ) AS distribution_JSON
            ON clips.id = distribution_JSON.clipID
        LEFT JOIN
            (SELECT
                categoriesRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', categories.id,
                        'name', categories.name                 
                        )
                    ) AS categories
                FROM
                    categoriesRelation
                    JOIN categories ON categories.id = categoriesRelation.categoryID
                GROUP BY
                    categoriesRelation.clipID
            ) AS categories_JSON
            ON clips.id = categories_JSON.clipID
        LEFT JOIN
            (SELECT
                tagsRelation.clipID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', tags.id,
                        'name', tags.name                 
                        )
                    ) AS tags
                FROM
                    tagsRelation
                    JOIN tags ON tags.id = tagsRelation.tagID
                GROUP BY
                    tagsRelation.clipID
            ) AS tags_JSON
            ON clips.id = tags_JSON.clipID
    WHERE clips.id = ANY($1)
    ORDER BY
        clips.created_at DESC
`;
    const key = [arr];
    return db.query(myQuery, key);
};

module.exports.getAllModelsWithInfos = (str) => {
    const myQuery = `SELECT 
        models.*,
        clips_JSON.clips,
        tags_JSON.tags,
        nationalities_JSON.nationalities
    FROM
        models
        LEFT JOIN
            (SELECT
                clipModelsRelation.modelID,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', clips.id,
                        'title', clips.title
                        )
                ) AS clips
            FROM
                clipModelsRelation
                JOIN clips ON clips.id = clipModelsRelation.clipID
            GROUP BY
                clipModelsRelation.modelID
        ) AS clips_JSON
        ON models.id = clips_JSON.modelID
    LEFT JOIN
        (SELECT
            tagsRelation.modelID,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', tags.id,
                    'name', tags.name                 
                )
            ) AS tags
            FROM
                tagsRelation
                JOIN tags ON tags.id = tagsRelation.tagID
            GROUP BY
                tagsRelation.modelID
        ) AS tags_JSON
        ON models.id = tags_JSON.modelID

    LEFT JOIN
        (SELECT
            nationalitiesRelation.modelID,
            JSON_AGG(
                nationalitiesRelation.nationality
            ) AS nationalities
            FROM nationalitiesRelation
            GROUP BY nationalitiesRelation.modelID
        ) AS nationalities_JSON
        ON models.id = nationalities_JSON.modelID

    WHERE models.name ILIKE '%' || $1 || '%'
    ORDER BY
        models.name ASC
        `;

    const key = [str];
    return db.query(myQuery, key);
};

module.exports.getAllStudiosWithInfos = (str) => {
    const myQuery = `SELECT 
        studios.*,
        clips_JSON.clips,
        nationalities_JSON.nationalities 
    FROM 
        studios 

    LEFT JOIN
        (SELECT
            clipStudiosRelation.studioID,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', clips.id,
                    'title', clips.title
                    )
            ) AS clips
        FROM
            clipStudiosRelation
            JOIN clips ON clips.id = clipStudiosRelation.clipID
        GROUP BY
            clipStudiosRelation.studioID
        ) AS clips_JSON
    ON studios.id = clips_JSON.studioID

    LEFT JOIN
        (SELECT
            nationalitiesRelation.studioID,
            JSON_AGG(
                nationalitiesRelation.nationality
            ) AS nationalities
            FROM nationalitiesRelation
            GROUP BY nationalitiesRelation.studioID
        ) AS nationalities_JSON
    ON studios.id = nationalities_JSON.studioID


    WHERE name ILIKE '%' || $1 || '%' OR website ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return db.query(myQuery, key);
};
module.exports.getAllDistributionsWithInfos = (str) => {
    const myQuery = `SELECT 
        distribution.*,
        clips_JSON.clips,
        nationalities_JSON.nationalities 
    FROM 
        distribution 

    LEFT JOIN
        (SELECT
            clipDistributionRelation.distributionID,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', clips.id,
                    'title', clips.title
                    )
            ) AS clips
        FROM
            clipDistributionRelation
            JOIN clips ON clips.id = clipDistributionRelation.clipID
        GROUP BY
            clipDistributionRelation.distributionID
        ) AS clips_JSON
    ON distribution.id = clips_JSON.distributionID

    LEFT JOIN
        (SELECT
            nationalitiesRelation.distributionID,
            JSON_AGG(
                nationalitiesRelation.nationality
            ) AS nationalities
            FROM nationalitiesRelation
            GROUP BY nationalitiesRelation.distributionID
        ) AS nationalities_JSON
    ON distribution.id = nationalities_JSON.distributionID


    WHERE name ILIKE '%' || $1 || '%' OR website ILIKE '%' || $1 || '%'
    ORDER BY name`;
    const key = [str];
    return db.query(myQuery, key);
};

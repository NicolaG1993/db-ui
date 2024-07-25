import { connect } from "@/src/application/db/client.js";

/* DINAMICS */
// module.exports.getElementByID = (client, table, id) => {
//     const myQuery = `SELECT * FROM ${table} WHERE id = $1`;
//     const key = [id];
//     return client.query(myQuery, key);
// };

module.exports.editPicURL = (client, pic, id, table) => {
    const myQuery = `UPDATE ${table} 
    SET pic = $1
    WHERE id = $2
    RETURNING *`;
    const keys = [pic, id];
    return client.query(myQuery, keys);
};

// module.exports.getIDsByNames = (client, arr, table) => {
//     const myQuery = `SELECT ${table}.id FROM ${table} WHERE name = ANY($1)`;
//     const key = [arr];
//     return client.query(myQuery, key);
// };

module.exports.deleteColumn = (client, id, table, column) => {
    const myQuery = `DELETE FROM ${table}
    WHERE ${column || "id"} = $1
    RETURNING *`;
    const key = [id];
    return client.query(myQuery, key);
};

/* GET ALL TABLE */
module.exports.getTable = (client, str) => {
    const myQuery = `SELECT id, name FROM ${str} ORDER BY name`;
    return client.query(myQuery);
};

module.exports.getTableWithTypes = (client, str) => {
    const myQuery = `SELECT id, name, type FROM ${str} ORDER BY name`;
    return client.query(myQuery);
};

module.exports.getTableWithTags = (client, str) => {
    const myQuery = `
    SELECT 
        ${str}.*,
        tags_JSON.tags

    FROM
        actor

    LEFT JOIN
        (SELECT
            tagRelation.actorID,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', tag.id,
                    'name', tag.name
                )
            ) AS tags
            FROM tagRelation 
            JOIN tag
            ON tag.id = tagRelation.tagID
            GROUP BY tagRelation.actorID  
        ) AS tags_JSON
    ON actor.id = tags_JSON.actorID
            
    ORDER BY name`;
    return client.query(myQuery);
};

module.exports.getAllTable = (client, str) => {
    const myQuery = `SELECT * FROM ${str} ORDER BY name`;
    return client.query(myQuery);
};

/* RELATIONS */
module.exports.newRelations = (client, id, arr, table, idColumn, arrColumn) => {
    const myQuery = `INSERT INTO ${table} (${idColumn}, ${arrColumn}) VALUES ($1, UNNEST(cast($2 as integer[]))) RETURNING *`;
    const keys = [id, arr];
    return client.query(myQuery, keys);
};

module.exports.newRelationsByStrings = (
    client,
    id,
    arr,
    table,
    idColumn,
    arrColumn
) => {
    const myQuery = `INSERT INTO ${table} (${idColumn}, ${arrColumn}) VALUES ($1, UNNEST(cast($2 as text[]))) RETURNING *`;
    const keys = [id, arr];
    return client.query(myQuery, keys);
};

module.exports.getRelations = (client, id, table, idColumn) => {
    const myQuery = `SELECT * FROM ${table} WHERE ${idColumn} = $1`;
    const key = [id];
    return client.query(myQuery, key);
};

// module.exports.getRelationsByArr = (client, arr, table, column) => {
//     const myQuery = `SELECT * FROM ${table} WHERE ${column} = ANY($1)`;
//     const key = [arr];
//     return client.query(myQuery, key);
// };

module.exports.getRelationsBySearch = (client, idsArr, table, idColumn) => {
    const myQuery = `SELECT * 
    FROM ${table} 
    WHERE ${idColumn} ILIKE '%' || $1 || '%'
    ORDER BY ${idColumn} ASC`;
    const key = [idsArr];
    return client.query(myQuery, key);
};

module.exports.getAllRelations = (client, table) => {
    const myQuery = `SELECT * FROM ${table}`;
    return client.query(myQuery);
};

module.exports.deleteRelations = (
    client,
    id,
    arr,
    table,
    idColumn,
    arrColumn
) => {
    const myQuery = `DELETE FROM ${table}
    WHERE ${idColumn} = $1
    AND (${arrColumn} = ANY($2) OR ${arrColumn} IS NULL)
    RETURNING *`;
    const keys = [id, arr];
    return client.query(myQuery, keys);
}; // eliminiamo tutti i record corrotti (IS NULL)

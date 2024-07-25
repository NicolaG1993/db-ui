import { connect } from "@/src/application/db/db.js";

module.exports.newRecord = (client, id) => {
    const myQuery = `INSERT INTO counter
    (movieID)
    VALUES ($1) 
    RETURNING *`;
    const key = [id];
    return client.query(myQuery, key);
};

module.exports.editRecord = (client, id, date) => {
    const myQuery = `UPDATE counter 
        SET created_at = $2
        WHERE id = $1
        RETURNING *`;
    const keys = [id, date];
    return client.query(myQuery, keys);
};
module.exports.editRecords = (client, ids, date) => {
    const myQuery = `UPDATE counter 
    SET created_at = $2
    WHERE id = ANY($1)
    RETURNING *`;
    const keys = [ids, date];
    return client.query(myQuery, keys);
};

module.exports.getAllRecords = (client) => {
    const myQuery = `SELECT * FROM counter ORDER BY created_at DESC`;
    return client.query(myQuery);
};

module.exports.getRecordByID = (client, id) => {
    const myQuery = `SELECT * FROM counter WHERE movieID = $1`;
    const key = [id];
    return client.query(myQuery, key);
};

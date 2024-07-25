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

const connect = async () => {
    return await db.connect();
};

module.exports = { db, connect };

module.exports.begin = async (client) => {
    const myQuery = `BEGIN`;
    return await client.query(myQuery);
};
module.exports.commit = async (client) => {
    const myQuery = `COMMIT`;
    return await client.query(myQuery);
};
module.exports.rollback = async (client) => {
    const myQuery = `ROLLBACK`;
    return await client.query(myQuery);
};
module.exports.release = (client) => {
    client.release();
}; // "client" é una instance di "db.connect()", passato come argomento dopo essere stato "connected"

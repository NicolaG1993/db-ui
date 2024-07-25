import { connect } from "@/src/application/db/db.js";

module.exports.newUser = (client, name, email, psw) => {
    const myQuery = `INSERT INTO users 
    (name, email, psw) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    const keys = [name, email, psw];
    return client.query(myQuery, keys);
};
module.exports.getUserByEmail = (client, email) => {
    const myQuery = `SELECT * FROM users WHERE email = $1`;
    const key = [email];
    return client.query(myQuery, key);
};

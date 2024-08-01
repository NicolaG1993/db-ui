import { connect } from "@/src/application/db/db.js";

module.exports.newUser = (
    client,
    name,
    email,
    hashedPassword,
    verificationToken
) => {
    const myQuery = `INSERT INTO users 
    (name, email, psw, verification_token) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`;
    const keys = [name, email, hashedPassword, verificationToken];
    return client.query(myQuery, keys);
};
module.exports.getUserByEmail = (client, email) => {
    const myQuery = `SELECT * FROM users WHERE email = $1`;
    const key = [email];
    return client.query(myQuery, key);
};

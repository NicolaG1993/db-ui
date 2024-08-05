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
module.exports.checkUserByEmail = (client, email) => {
    const myQuery = `SELECT id, email FROM users WHERE email = $1`;
    const key = [email];
    return client.query(myQuery, key);
};
// module.exports.getUserByVerificationToken = (client, token) => {
//     const myQuery = `SELECT email, verification_token
//                     FROM users
//                     WHERE verification_token = $1`;
//     const key = [token];
//     return client.query(myQuery, key);
// };
module.exports.verifyUserEmail = (client, email) => {
    const myQuery = `UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE email = $1 RETURNING *`;
    const key = [email];
    return client.query(myQuery, key);
};
module.exports.setUserNewVerificationToken = (client, newToken, userId) => {
    const myQuery = `UPDATE users SET verification_token = $1 WHERE id = $2`;
    const keys = [newToken, userId];
    return client.query(myQuery, keys);
};
module.exports.setUserPasswordToken = (client, token, timestamp, email) => {
    const myQuery = `UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE email = $3`;
    const keys = [token, timestamp, email];
    return client.query(myQuery, keys);
};
module.exports.selectUserToResetPsw = (client, email, token, timestamp) => {
    const myQuery = `SELECT * FROM users WHERE email = $1 AND password_reset_token = $2 AND password_reset_expires > $3`;
    const keys = [email, token, timestamp];
    return client.query(myQuery, keys);
};
module.exports.resetUserPassword = (client, hashedPassword, email) => {
    const myQuery = `UPDATE users SET psw = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE email = $2`;
    const keys = [hashedPassword, email];
    return client.query(myQuery, keys);
};

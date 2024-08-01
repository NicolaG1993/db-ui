import { connect } from "@/src/application/db/db.js";

// TODO: Not in use, call when new user register 🔴👇
module.exports.createNewUserSettings = (client, userId) => {
    const myQuery = `INSERT INTO 
                        user_settings (user_id, show_scrollbars, theme) 
                    VALUES ($1, TRUE, 'theme-light')`;
    const keys = [userId];
    return client.query(myQuery, keys);
};
module.exports.getUserSettings = (client, userId) => {
    const myQuery = `SELECT * FROM user_settings WHERE user_id = $1`;
    const keys = [userId];
    return client.query(myQuery, keys);
};
module.exports.updateUserSettings = (client, userId, showScrollbars, theme) => {
    const myQuery = `UPDATE user_settings 
    SET show_scrollbars = $2, theme = $3 
    WHERE user_id = $1`;
    const key = [userId, showScrollbars, theme];
    return client.query(myQuery, key);
};

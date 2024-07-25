/* MIGRATE TABLE */
/* module.exports.importMovieRow = (
    title,
    pic,
    rating,
    urls,
    release,
    created_at
) => {
    const myQuery = `INSERT INTO movie
     (title, pic, rating, urls, release, created_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`;
    const keys = [title, pic, rating, urls, release, created_at];
    return db.query(myQuery, keys);
};
module.exports.importActorRow = (
    name,
    pic,
    rating,
    bday,
    genre,
    created_at
) => {
    const myQuery = `INSERT INTO actor
    (name, pic, rating, birthday, genre, created_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
    const keys = [name, pic, rating, bday, genre, created_at];
    return db.query(myQuery, keys);
};
module.exports.importStudioRow = (name, pic, website, created_at) => {
    const myQuery = `INSERT INTO studio
    (name, pic, website, created_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    const keys = [name, pic, website, created_at];
    return db.query(myQuery, keys);
};
module.exports.importDistributionRow = (name, pic, website, created_at) => {
    const myQuery = `INSERT INTO distribution
    (name, pic, website, created_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    const keys = [name, pic, website, created_at];
    return db.query(myQuery, keys);
};
module.exports.importCategoryRow = (name, pic, type, created_at) => {
    const myQuery = `INSERT INTO category
    (name, pic, type, created_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    const keys = [name, pic, type, created_at];
    return db.query(myQuery, keys);
};
module.exports.importTagRow = (name, pic, type, created_at) => {
    const myQuery = `INSERT INTO tag
    (name, pic, type, created_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    const keys = [name, pic, type, created_at];
    return db.query(myQuery, keys);
};
module.exports.importRecordRow = (movieID, created_at) => {
    const myQuery = `INSERT INTO counter
    (movieID, created_at)
    VALUES ($1, $2)
    RETURNING *`;
    const keys = [movieID, created_at];
    return db.query(myQuery, keys);
};
module.exports.importRelationRow = (idA, idB, table, idAColumn, idBColumn) => {
    const myQuery = `INSERT INTO ${table}
    (${idAColumn}, ${idBColumn})
    VALUES ($1, $2)
    RETURNING *`;
    const keys = [idA, idB];
    return db.query(myQuery, keys);
}; */

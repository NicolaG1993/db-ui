-- DROP TABLE actor cascade;
-- DROP TABLE studio cascade;
-- DROP TABLE distribution cascade;
-- DROP TABLE category cascade;
-- DROP TABLE tag cascade;
-- DROP TABLE movie cascade;
-- DROP TABLE movieActorsRelation cascade;
-- DROP TABLE movieStudiosRelation cascade;
-- DROP TABLE movieDistributionRelation cascade;
-- DROP TABLE categoryRelation cascade;
-- DROP TABLE tagRelation cascade;
-- DROP TABLE nationalitiesRelation cascade;
-- DROP TABLE counter cascade;

-- DROP TABLE movie_actor cascade;
-- DROP TABLE movie_studio cascade;
-- DROP TABLE movie_distribution cascade;
-- DROP TABLE categoryRelation cascade;
-- DROP TABLE tagRelation cascade;
-- DROP TABLE nationalityRelation cascade;
DROP TABLE users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255) NOT NULL UNIQUE,
    psw VARCHAR(255) NOT NULL
);

CREATE TABLE actor(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != ''),
    pic VARCHAR(255),
    rating DECIMAL,
    birthday TIMESTAMP,
    genre VARCHAR(255)
);

CREATE TABLE movie(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL CHECK (title != ''),
    pic VARCHAR(255),
    urls text[],
    rating DECIMAL,
    release TIMESTAMP
);

CREATE TABLE studio(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != ''),
    pic VARCHAR(255),
    website VARCHAR(255)
);

CREATE TABLE distribution(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != ''),
    pic VARCHAR(255),
    website VARCHAR(255)
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != ''),
    pic VARCHAR(255),
    type VARCHAR(255)
);

CREATE TABLE tag(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR NOT NULL CHECK (name != ''),
    pic VARCHAR(255),
    type VARCHAR(255)
);


CREATE TABLE movie_actor(
    id SERIAL PRIMARY KEY,
    movieID integer,
    actorID integer,
    FOREIGN KEY (movieID) REFERENCES movie(id),
    FOREIGN KEY (actorID) REFERENCES actor(id),
    UNIQUE (movieID, actorID)
);
CREATE TABLE movie_studio(
    id SERIAL PRIMARY KEY,
    movieID integer,
    studioID integer,
    FOREIGN KEY (movieID) REFERENCES movie(id),
    FOREIGN KEY (studioID) REFERENCES studio(id),
    UNIQUE (movieID, studioID)
);
CREATE TABLE movie_distribution(
    id SERIAL PRIMARY KEY,
    movieID integer,
    distributionID integer,
    FOREIGN KEY (movieID) REFERENCES movie(id),
    FOREIGN KEY (distributionID) REFERENCES distribution(id),
    UNIQUE (movieID, distributionID)
);
CREATE TABLE categoryRelation(
    id SERIAL PRIMARY KEY,
    categoryID integer,
    movieID integer,
    FOREIGN KEY (categoryID) REFERENCES category(id),
    FOREIGN KEY (movieID) REFERENCES movie(id),
    UNIQUE (categoryID, movieID)
);
CREATE TABLE tagRelation(
    id SERIAL PRIMARY KEY,
    tagID integer,
    movieID integer,
    actorID integer,
    FOREIGN KEY (tagID) REFERENCES tag(id),
    FOREIGN KEY (movieID) REFERENCES movie(id),
    FOREIGN KEY (actorID) REFERENCES actor(id),
    UNIQUE (tagID, movieID, actorID)
);
CREATE TABLE nationalityRelation(
    id SERIAL PRIMARY KEY,
    nationality VARCHAR(255),
    studioID integer,
    distributionID integer,
    actorID integer,
    FOREIGN KEY (studioID) REFERENCES studio(id),
    FOREIGN KEY (distributionID) REFERENCES distribution(id),
    FOREIGN KEY (actorID) REFERENCES actor(id),
    UNIQUE (nationality, studioID, distributionID, actorID)
);

CREATE TABLE counter(
    id SERIAL PRIMARY KEY,
    movieID integer,
    FOREIGN KEY (movieID) REFERENCES movie(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE playlist(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL CHECK (title != ''),
    userID integer,
    FOREIGN KEY (userID) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE movie_playlist(
    id SERIAL PRIMARY KEY,
    movieID integer,
    playlistID integer,
    FOREIGN KEY (movieID) REFERENCES movie(id),
    FOREIGN KEY (playlistID) REFERENCES playlist(id),
    UNIQUE (movieID, playlistID)
);


-- ALTER TABLE clips
-- RENAME TO movie;
-- ALTER TABLE models
-- RENAME TO actor;
-- ALTER TABLE studios
-- RENAME TO studio;
-- ALTER TABLE categories
-- RENAME TO category;
-- ALTER TABLE tags
-- RENAME TO tag;

-- ALTER TABLE clipModelsRelation
-- RENAME TO movie_actor;
-- ALTER TABLE movie_actor
-- RENAME COLUMN clipID TO movieID;
-- ALTER TABLE movie_actor
-- RENAME COLUMN modelID TO actorID;

-- ALTER TABLE clipStudiosRelation
-- RENAME TO movie_studio;
-- ALTER TABLE movie_studio
-- RENAME COLUMN clipID TO movieID;

-- ALTER TABLE clipDistributionRelation
-- RENAME TO movie_distribution;
-- ALTER TABLE movie_distribution
-- RENAME COLUMN clipID TO movieID;

-- ALTER TABLE categoriesRelation
-- RENAME TO categoryRelation;
-- ALTER TABLE categoryRelation
-- RENAME COLUMN clipID TO movieID;

-- ALTER TABLE tagsRelation
-- RENAME TO tagRelation;
-- ALTER TABLE tagRelation
-- RENAME COLUMN clipID TO movieID;
-- ALTER TABLE tagRelation
-- RENAME COLUMN modelID TO actorID;

-- ALTER TABLE nationalitiesRelation
-- RENAME TO nationalityRelation;
-- ALTER TABLE nationalityRelation
-- RENAME COLUMN modelID TO actorID;


-- ALTER TABLE counter
-- RENAME COLUMN clipID TO movieID;
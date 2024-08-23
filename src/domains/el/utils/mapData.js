import filterUniqueActors from "@/src/domains/el/utils/filterUniqueActors";
import { createCastString } from "../../_app/utils/interpretateData";
import { formatDateEU } from "@/src/application/utils/convertTimestamp";

// 🧠 TODO: Uniform raw objects response, that way we can reuse always the same function (just with or without mapping) - now we have different responses

/* MOVIE */
const mapMovieRawToMovie = (rawMovie) => {
    let movie = {
        id: rawMovie.movie_id,
        title: rawMovie.title,
        pic: rawMovie.movie_pic || "/no-image.png",
        urls: rawMovie.movie_urls || [],
        rating: rawMovie.movie_rating,
        release: rawMovie.movie_release,
        totalActors: rawMovie.actor_count,

        actors:
            rawMovie.actors?.map((actor) => ({
                id: actor.id,
                name: actor.name,
            })) || [],
        tags:
            rawMovie.tags?.map((tag) => ({
                id: tag.id,
                name: tag.name,
                type: tag.type,
                pic: tag.pic,
            })) || [],
        categories:
            rawMovie.categories?.map((category) => ({
                id: category.id,
                name: category.name,
                type: category.type,
                pic: category.pic,
            })) || [],

        studios:
            rawMovie.studios?.map((studio) => ({
                id: studio.id,
                name: studio.name,
                website: studio.website,
                pic: studio.pic,
            })) || [],
        distributions:
            rawMovie.distributions?.map((distribution) => ({
                id: distribution.id,
                name: distribution.name,
                website: distribution.website,
                pic: distribution.pic,
            })) || [],
    };

    movie.castString = createCastString(movie.actors);

    return movie;
};

const mapMoviesRawToMovies = (rawArray) => {
    const mappedArray = rawArray.map((rawMovie) => {
        let movie = {
            id: rawMovie.id,
            title: rawMovie.title,
            pic: rawMovie.pic || "/no-image.png",
            urls: rawMovie.urls || [],
            rating: rawMovie.rating,
            release: rawMovie.release,
            records: rawMovie.records,
            totalActors: rawMovie.actors?.length || 0,

            actors:
                rawMovie.actors?.map((actor) => ({
                    id: actor.id,
                    name: actor.name,
                })) || [],
            tags:
                rawMovie.tags?.map((tag) => ({
                    id: tag.id,
                    name: tag.name,
                    type: tag.type,
                    pic: tag.pic,
                })) || [],
            categories:
                rawMovie.categories?.map((category) => ({
                    id: category.id,
                    name: category.name,
                    type: category.type,
                    pic: category.pic,
                })) || [],

            studios:
                rawMovie.studios?.map((studio) => ({
                    id: studio.id,
                    name: studio.name,
                    website: studio.website,
                    pic: studio.pic,
                })) || [],
            distributions:
                rawMovie.distributions?.map((distribution) => ({
                    id: distribution.id,
                    name: distribution.name,
                    website: distribution.website,
                    pic: distribution.pic,
                })) || [],
        };

        movie.castString = createCastString(movie.actors);

        return movie;
    });

    return mappedArray;
};

/* ACTOR */
const mapActorRawToActor = (rawActor) => {
    let actor = {
        id: rawActor.actor.id,
        createdAt: rawActor.actor.created_at,
        name: rawActor.actor.name,
        pic: rawActor.actor.pic || "/no-image.png",
        rating: rawActor.actor.rating,
        birthday: rawActor.actor.birthday,
        genre: rawActor.actor.genre,
        twitter: rawActor.actor.twitter,
        instagram: rawActor.actor.instagram,
        moreUrls: rawActor.actor.more_urls,
        nationalities: rawActor.actor.nationalities,

        totalMovies: rawActor.total_movies,

        tags:
            rawActor.tags?.map((tag) => ({
                id: tag.id,
                name: tag.name,
                type: tag.type,
                pic: tag.pic,
            })) || [],

        categories:
            rawActor.categories?.map((category) => ({
                id: category.id,
                name: category.name,
                type: category.type,
                pic: category.pic,
            })) || [],

        studios:
            rawActor.studios?.map((studio) => ({
                id: studio.id,
                name: studio.name,
                website: studio.website,
                pic: studio.pic,
            })) || [],

        distributions:
            rawActor.distributions?.map((distribution) => ({
                id: distribution.id,
                name: distribution.name,
                website: distribution.website,
                pic: distribution.pic,
            })) || [],
    };

    // actor.categories = filterUniqueCategories(actor.categories);

    return actor;
};

const mapActorsRawToActors = (rawArray) => {
    const mappedArray = rawArray.map((rawActor) => ({
        id: rawActor.id,
        createdAt: rawActor.created_at,
        name: rawActor.name,
        pic: rawActor.pic || "/no-image.png",
        rating: rawActor.rating,
        birthday: rawActor.birthday,
        genre: rawActor.genre,
        twitter: rawActor.twitter,
        instagram: rawActor.instagram,
        moreUrls: rawActor.more_urls,
        nationalities: rawActor.nationalities,
        totalMovies: rawActor.total_movies,
        tags:
            rawActor.tags?.map((tag) => ({
                id: tag.id,
                name: tag.name,
                type: tag.type,
                pic: tag.pic,
            })) || [],

        categories:
            rawActor.categories?.map((category) => ({
                id: category.id,
                name: category.name,
                type: category.type,
                pic: category.pic,
            })) || [],

        studios:
            rawActor.studios?.map((studio) => ({
                id: studio.id,
                name: studio.name,
                website: studio.website,
                pic: studio.pic,
            })) || [],

        distributions:
            rawActor.distributions?.map((distribution) => ({
                id: distribution.id,
                name: distribution.name,
                website: distribution.website,
                pic: distribution.pic,
            })) || [],
    }));

    return mappedArray;
};

/* CATEGORY */
const mapCategoryRawToCategory = (rawCategory) => {
    let category = {
        id: rawCategory.category_id,
        createdAt: rawCategory.category_created_at,
        name: rawCategory.category_name,
        pic: rawCategory.category_pic || "/no-image.png",
        type: rawCategory.category_type,
        totalMovies: rawCategory.total_movies,
        actors:
            rawCategory.actors?.map((act) => ({
                id: act.actor_id,
                name: act.actor_name,
                count: act.movies_count,
            })) || [],
    };

    category.actors = filterUniqueActors(category.actors);

    return category;
};

/* TAG */
const mapTagRawToTag = (rawTag) => {
    let tag = {
        id: rawTag.tag_id,
        createdAt: rawTag.tag_created_at,
        name: rawTag.tag_name,
        pic: rawTag.tag_pic || "/no-image.png",
        type: rawTag.tag_type,
        totalMovies: rawTag.total_movies,
        actors:
            rawTag.actors?.map((act) => ({
                id: act.actor_id,
                name: act.actor_name,
                count: act.movies_count,
            })) || [],
    };

    tag.actors = filterUniqueActors(tag.actors);

    return tag;
};

/* STUDIO */
const mapStudioRawToStudio = (rawStudio) => {
    let studio = {
        id: rawStudio.studio_id,
        createdAt: rawStudio.studio_created_at,
        name: rawStudio.studio_name,
        pic: rawStudio.studio_pic || "/no-image.png",
        website: rawStudio.studio_website,
        totalMovies: rawStudio.total_movies,
        nationalities: rawStudio.studio_nationalities,
        actors:
            rawStudio.actors?.map((act) => ({
                id: act.actor_id,
                name: act.actor_name,
                count: act.movies_count,
            })) || [],
    };

    studio.actors = filterUniqueActors(studio.actors);

    return studio;
};

/* DISTRIBUTION */
const mapDistributionRawToDistribution = (rawDistribution) => {
    let distribution = {
        id: rawDistribution.distribution_id,
        createdAt: rawDistribution.distribution_created_at,
        name: rawDistribution.distribution_name,
        pic: rawDistribution.distribution_pic || "/no-image.png",
        website: rawDistribution.distribution_website,
        totalMovies: rawDistribution.total_movies,
        nationalities: rawDistribution.distribution_nationalities,
        actors:
            rawDistribution.actors?.map((act) => ({
                id: act.actor_id,
                name: act.actor_name,
                count: act.movies_count,
            })) || [],
    };

    distribution.actors = filterUniqueActors(distribution.actors);

    return distribution;
};

/* RECORD */
const mapRecordRawToRecord = (rawRecord) => {
    return {};
};
const mapRecordsRawToRecords = (rawRecords) => {
    console.log("🟦 rawRecords: ", rawRecords);
    // for now here we are mapping only rawRecords.records and rawRecords.movieRecords
    // the other records dont need a mapping for now
    return {
        ...rawRecords,
        records: rawRecords.records.map((rawRec) => ({
            id: rawRec.id,
            createdAt: rawRec.created_at,
            date: formatDateEU(rawRec.created_at),
            movie: rawRec.movie,
            movieid: rawRec.movieid,
        })),
        moviesRecords: rawRecords.moviesRecords.map((rawRec) => ({
            ...rawRec,
            cast: createCastString(rawRec.actors || []),
        })),
    };
};

export {
    mapMovieRawToMovie,
    mapMoviesRawToMovies,
    mapActorRawToActor,
    mapActorsRawToActors,
    mapCategoryRawToCategory,
    mapTagRawToTag,
    mapStudioRawToStudio,
    mapDistributionRawToDistribution,
    mapRecordRawToRecord,
    mapRecordsRawToRecords,
};

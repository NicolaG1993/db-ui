import filterUniqueActors from "@/src/domains/el/utils/filterUniqueActors";

/* MOVIE */
const mapMovieRawToMovie = (rawMovie) => {
    console.log("rawMovie: ", rawMovie);
    let movie = {
        id: rawMovie.movie_id,
        title: rawMovie.title,
        pic: rawMovie.movie_pic,
        urls: rawMovie.movie_urls || [],
        rating: rawMovie.movie_rating,
        release: rawMovie.movie_release,
        totalActors: rawMovie.actor_count,

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

    return movie;
};

/* ACTOR */
const mapActorRawToActor = (rawActor) => {
    let actor = {
        id: rawActor.actor[0].id,
        createdAt: rawActor.actor[0].created_at,
        name: rawActor.actor[0].name,
        pic: rawActor.actor[0].pic,
        rating: rawActor.actor[0].rating,
        birthday: rawActor.actor[0].birthday,
        genre: rawActor.actor[0].genre,
        twitter: rawActor.actor[0].twitter,
        instagram: rawActor.actor[0].instagram,
        moreUrls: rawActor.actor[0].more_urls,
        nationality: rawActor.actor[0].nationality,

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

/* CATEGORY */
const mapCategoryRawToCategory = (rawCategory) => {
    let category = {
        id: rawCategory.category_id,
        createdAt: rawCategory.category_created_at,
        name: rawCategory.category_name,
        pic: rawCategory.category_pic,
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
        pic: rawTag.tag_pic,
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
        pic: rawStudio.studio_pic,
        website: rawStudio.studio_website,
        totalMovies: rawStudio.total_movies,
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
        pic: rawDistribution.distribution_pic,
        website: rawDistribution.distribution_website,
        totalMovies: rawDistribution.total_movies,
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

export {
    mapMovieRawToMovie,
    mapActorRawToActor,
    mapCategoryRawToCategory,
    mapTagRawToTag,
    mapStudioRawToStudio,
    mapDistributionRawToDistribution,
};

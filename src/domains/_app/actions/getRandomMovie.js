import { getError } from "@/src/application/utils/error";

const getRandomMovie = async () => {
    try {
        const { data } = await axios.get("/api/movie/random");
        return { status: 200, data: data.id };
        // data is already a movie object, but i use only the id to then call movie again
        // there should be a better way to do this
        // heiter getting only the rows lenght from db
        // or using the data directly, without calling api again
    } catch (error) {
        return {
            status: error.response.status,
            error,
            message: getError(error),
        };
    }
};

export default getRandomMovie;

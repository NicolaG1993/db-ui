import { getError } from "@/src/application/utils/error";

const getRandomMovie = async () => {
    try {
        const { data } = await axios.get("/api/movie/random");
        return { status: 200, data: id };
    } catch (error) {
        return {
            status: error.response.status,
            error,
            message: getError(error),
        };
    }
};

export default getRandomMovie;

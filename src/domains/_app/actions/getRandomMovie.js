import { getRandomMovieID } from "@/src/domains/_app/actions/customFetchers";

const getRandomMovie = async () => {
    const id = await getRandomMovieID();
    return id;
};

export default getRandomMovie;

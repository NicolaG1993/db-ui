import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { mapMoviesRawToMovies } from "@/src/domains/el/utils/mapData";

export default async function fetchTournamentData(ids) {
    // console.log("fetchTournamentData: ", { ids });
    try {
        const { data } = await axiosAuthInstance.get("/api/movie/by-id", {
            params: {
                ids: JSON.stringify(ids),
            },
        });
        const mappedData = mapMoviesRawToMovies(data);
        return mappedData;
    } catch (error) {
        console.log("ERROR: fetchTournamentData", error);
        return [];
    }
}

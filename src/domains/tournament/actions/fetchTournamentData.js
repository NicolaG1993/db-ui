import axios from "axios";

export default async function fetchTournamentData(ids) {
    // console.log("fetchTournamentData: ", { ids });
    try {
        const { data } = await axios.get("/api/movie/by-id", {
            params: {
                ids: JSON.stringify(ids),
            },
        });
        // console.log("fetchTournamentData data: ", { data });
        // parsing todo here? non credo
        return data;
    } catch (error) {
        console.log("ERROR: fetchTournamentData", error);
        return [];
    }
}

////////////// BOZZA (elimina)

// const createEmptyStageMatches = ({}) => {};

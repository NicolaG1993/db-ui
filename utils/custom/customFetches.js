import axios from "axios";
import { parseTagsByType } from "./customParsers";
import dataStructureGroups from "@/utils/custom/dataStructureGroups";
import { groupJsonByValue } from "../parsers";
import { getError } from "../error";

const fetchDataForFilter = async (str, topic) => {
    let { itemLabel } = dataStructureGroups[topic];
    console.log("fetchDataForFilter: ", itemLabel);
    if (topic !== "nationalities") {
        try {
            const res = await axios.get(`/api/${itemLabel}/search`, {
                params: { str },
            });
            console.log("res: ", res.data);
            if (topic === "tags") {
                let result = groupJsonByValue(res.data, "type");
                return parseTagsByType(result);
            } else {
                return res.data;
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        return [];
    }
};

const getRandomMovieID = async () => {
    try {
        const { data } = await axios.get("/api/movie/random");
        return data.id;
    } catch (err) {
        console.error("ERROR: ", getError(err));
    }
};

export { fetchDataForFilter, getRandomMovieID };

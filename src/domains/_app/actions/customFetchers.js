import axios from "axios";
import { parseTagsByType } from "../utils/customParsers";
import dataStructureGroups from "@/utils/custom/dataStructureGroups";

import { getError } from "../../../../utils/error";
import { groupJsonByValue } from "@/src/lib/domains/_app/actions/parsers";

/* USED FOR GETTING SIMPLE SIDENAV DATA IN FULLLIST */
const fetchDataForFilter = async (str, topic) => {
    let { itemLabel } = dataStructureGroups[topic];
    if (topic !== "nationalities" && topic !== "nationality") {
        try {
            // const res = await axios.get(`/api/${itemLabel}/search`, {
            //     params: { str },
            // });
            const res = await axios.get(`/api/list/all`, {
                params: { table: itemLabel },
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

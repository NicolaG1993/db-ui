import axios from "axios";
import { parseTagsByType } from "@/src/domains/_app/utils/parsers";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";

import { getError } from "@/src/application/utils/error";
import { groupJsonByValue } from "@/src/application/utils/parsers";

/* USED FOR GETTING SIMPLE SIDENAV DATA IN FULLLIST */
const fetchDataForFilter = async (str, topic, TAGS_OBJ) => {
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
                return parseTagsByType(result, TAGS_OBJ);
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

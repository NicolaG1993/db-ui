import { parseTagsByType } from "../utils/parsers";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";
import { groupJsonByValue } from "@/src/application/utils/parsers";
import axios from "axios";

/* USED FOR GETTING SIMPLE SIDENAV DATA IN FORMS */
const fetchDataForSideNav = async (topic, TAGS_OBJ) => {
    if (topic !== "nationality") {
        let { itemLabel } = dataStructureGroups[topic];
        try {
            const res = await axios.get(`/api/list/all`, {
                params: { table: itemLabel },
            });
            if (topic === "tags") {
                let result = groupJsonByValue(res.data, "type");
                // console.log("😋 fetchDataForSideNav tags: ", {
                //     topic,
                //     itemLabel,
                //     TAGS_OBJ,
                //     result,
                //     res,
                //     response: parseTagsByType(result, TAGS_OBJ),
                // });
                return {
                    parsedData: parseTagsByType(result, TAGS_OBJ),
                    data: res.data,
                };
            } else {
                // console.log("😋 fetchDataForSideNav: ", {
                //     topic,
                //     itemLabel,
                //     TAGS_OBJ,
                //     response: res.data,
                // });
                return { data: res.data, parsedData: undefined };
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        return [];
    }
};

export { fetchDataForSideNav };

import { parseTagsByType } from "../utils/parsers";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { groupJsonByValue } from "@/src/application/utils/parsers";

/* USED FOR GETTING SIMPLE SIDENAV DATA IN FORMS */
const fetchDataForSideNav = async (topic, TAGS_OBJ) => {
    console.log("fetchDataForSideNav: ", { topic, TAGS_OBJ });
    if (topic !== "nationalities") {
        let { itemLabel } = dataStructureGroups[topic];
        try {
            const res = await axiosAuthInstance.get(`/api/list/all`, {
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
                console.log("fetchDataForSideNav tags 💦💦💦", {
                    result,
                    "res.data": res.data,
                    TAGS_OBJ,
                    parseTagsByType: parseTagsByType(result, TAGS_OBJ),
                });
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

import { parseTagsByType } from "../utils/parsers";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { groupJsonByValue } from "@/src/application/utils/parsers";

/* USED FOR GETTING SIMPLE SIDENAV DATA IN FORMS */
const fetchDataForSideNav = async (topic, TAGS_OBJ) => {
    if (topic !== "nationalities") {
        let { itemLabel } = dataStructureGroups[topic];
        try {
            const res = await axiosAuthInstance.get(`/api/list/all`, {
                params: { table: itemLabel },
            });
            if (topic === "tags") {
                let result = groupJsonByValue(res.data, "type");

                return {
                    parsedData: parseTagsByType(result, TAGS_OBJ),
                    data: res.data,
                };
            } else {
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

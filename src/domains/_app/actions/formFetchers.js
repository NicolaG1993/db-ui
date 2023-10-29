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

export { fetchDataForSideNav };

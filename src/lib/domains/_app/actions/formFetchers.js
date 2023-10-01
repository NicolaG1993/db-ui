import { parseTagsByType } from "@/utils/custom/customParsers";
import dataStructureGroups from "@/utils/custom/dataStructureGroups";
import { groupJsonByValue } from "@/src/lib/domains/_app/actions/parsers";
import axios from "axios";

/* USED FOR GETTING SIMPLE SIDENAV DATA IN FORMS */
const fetchDataForSideNav = async (topic) => {
    if (topic !== "nationality") {
        let { itemLabel } = dataStructureGroups[topic];
        try {
            const res = await axios.get(`/api/list/all`, {
                params: { table: itemLabel },
            });
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

export { fetchDataForSideNav };

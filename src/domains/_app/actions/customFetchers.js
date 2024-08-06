import { parseTagsByType } from "@/src/domains/_app/utils/parsers";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";
import { groupJsonByValue } from "@/src/application/utils/parsers";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

/* USED FOR GETTING SIMPLE SIDENAV DATA IN FULLLIST */
const fetchDataForFilter = async (str, topic, TAGS_OBJ) => {
    let { itemLabel } = dataStructureGroups[topic];
    if (topic !== "nationalities" && topic !== "nationality") {
        try {
            // const res = await axiosAuthInstance.get(`/api/${itemLabel}/search`, {
            //     params: { str },
            // });
            const res = await axiosAuthInstance.get(`/api/list/all`, {
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

export { fetchDataForFilter };

import axios from "axios";
import { mergeArrays } from "@/src/application/utils/parsers";
import {
    tagsCheck,
    extractIDs,
    extractNames,
} from "@/src/domains/_app/utils/parsers";

export default async function getTagsMissingTags(tags) {
    try {
        // call API for retrieving ids full objects
        const { data } = await axios.get("/api/list/filtered", {
            params: { arr: JSON.stringify(tags), table: "tag", column: "name" },
        });

        const idsArr = extractIDs(data);

        const missingRelationsIDs = tagsCheck(idsArr);

        const res = await axios.get("/api/list/filtered", {
            params: {
                arr: JSON.stringify(missingRelationsIDs),
                table: "tag",
                column: "id",
            },
        });

        const missingRelationsNames = extractNames(res.data);

        return { missingTags: missingRelationsNames, removedTags: [] };
    } catch (err) {
        console.log("getTagsMissingTags ERROR: ", err);
        return err;
    }
}

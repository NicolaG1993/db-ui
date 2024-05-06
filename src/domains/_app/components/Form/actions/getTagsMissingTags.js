import axios from "axios";
import { mergeArrays } from "@/src/application/utils/parsers";
import {
    tagsCheck,
    extractIDs,
    extractNames,
} from "@/src/domains/_app/utils/parsers";

export default async function getTagsMissingTags(tags, TAGS_REL) {
    console.log("getTagsMissingTags 1: ", { tags, TAGS_REL });
    // 🔴 new tags are just string - no object 🔴
    try {
        // call API for retrieving ids full objects
        const { data } = await axios.get("/api/list/filtered", {
            params: { arr: JSON.stringify(tags), table: "tag", column: "name" },
        });

        const idsArr = extractIDs(data);

        const missingRelationsIDs = tagsCheck(idsArr, TAGS_REL);

        console.log("getTagsMissingTags 2: ", {
            data,
            idsArr,
            missingRelationsIDs,
        });

        const res = await axios.get("/api/list/filtered", {
            params: {
                arr: JSON.stringify(missingRelationsIDs),
                table: "tag",
                column: "id",
            },
        });

        const missingRelationsNames = extractNames(res.data);

        console.log("getTagsMissingTags 3: ", {
            res,
            missingRelationsNames,
        });

        return { missingTags: missingRelationsNames, removedTags: [] };
    } catch (err) {
        console.log("getTagsMissingTags ERROR: ", err);
        return err;
    }
}

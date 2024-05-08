import axios from "axios";
import {
    tagsCheck,
    extractIDs,
    extractNames,
} from "@/src/domains/_app/utils/parsers";

export default async function getTagsMissingTags(tags, TAGS_REL) {
    console.log("getTagsMissingTags 1: ", { tags, TAGS_REL });
    try {
        // call API for retrieving ids full objects
        const { data } = await axios.get("/api/list/filtered", {
            params: { arr: JSON.stringify(tags), table: "tag", column: "name" },
        }); // I might not need this anymore, i have them already from previous screen 🧠
        console.log("getTagsMissingTags 2: ", { data });
        const idsArr = extractIDs(data);

        const missingRelationsIDs = tagsCheck(idsArr, TAGS_REL);

        console.log("getTagsMissingTags 3: ", {
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

        console.log("getTagsMissingTags 4: ", {
            res,
            missingRelationsNames,
        });

        return { missingTags: missingRelationsNames, removedTags: [] };
    } catch (err) {
        console.log("getTagsMissingTags ERROR: ", err);
        return err;
    }
}

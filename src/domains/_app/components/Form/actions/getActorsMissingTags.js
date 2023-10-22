import axios from "axios";
import { mergeArrays } from "@/src/application/utils/parsers";

export default async function getActorsMissingTags(actors, tags) {
    try {
        const { data } = await axios.get("/api/tag/item-tags", {
            params: { items: JSON.stringify(actors) },
        });

        let allTags = [];

        if (data && data.length) {
            data.map(({ name, tags }) => {
                let onlyTagNames = tags.map(({ name }) => name);
                allTags = mergeArrays(allTags, onlyTagNames);
            });
        }

        const missingTags = allTags.filter((el) => !tags.includes(el));

        return missingTags;
    } catch (err) {
        console.log(err);
        return err;
    }
}

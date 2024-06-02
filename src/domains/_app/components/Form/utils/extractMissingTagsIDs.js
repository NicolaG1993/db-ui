import { anyExist, extractIDs } from "@/src/domains/_app/utils/parsers";

const extractMissingTagsIDs = (tags, TAGS_REL) => {
    const idsArr = extractIDs(tags);
    let missingTagsIDs = [];
    Object.entries(TAGS_REL).map(([key, obj]) => {
        if (anyExist(idsArr, obj.related) && !anyExist(idsArr, [obj.id])) {
            //se tags contiene uno di questi valori e non contiene gia se stesso aggiungi obj a missingTagsIDs
            missingTagsIDs.push(Number(obj.id));
        }
    });
    return missingTagsIDs;
};

export default extractMissingTagsIDs;

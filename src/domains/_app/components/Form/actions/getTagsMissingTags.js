import extractMissingTagsIDs from "@/src/domains/_app/components/Form/utils/extractMissingTagsIDs";

export default function getTagsMissingTags(tags, TAGS_REL, sourceData) {
    console.log("getTagsMissingTags 1: ", { tags, TAGS_REL, sourceData });

    /*
        // call API for retrieving ids full objects
        const { data } = await axios.get("/api/list/filtered", {
            params: { arr: JSON.stringify(tags), table: "tag", column: "name" },
        }); // I might not need this anymore, i have them already from previous screen 🧠
        */

    //    const data = sourceData.map(t => )

    // console.log("getTagsMissingTags 2: ", { data });
    // const idsArr = extractIDs(tags);
    // console.log("getTagsMissingTags 2: ", { idsArr });

    // 🔴🔴🔴 BUG HERE! NOT RETURNIG WHAT WE EXPECT
    // we want an array of tag objects
    const missingTagsIDs = extractMissingTagsIDs(tags, TAGS_REL);
    const missingTags = sourceData.filter((t) => missingTagsIDs.includes(t.id));
    console.log("getTagsMissingTags 3: ", {
        missingTagsIDs,
        missingTags,
    });

    /*
        const res = await axios.get("/api/list/filtered", {
            params: {
                arr: JSON.stringify(missingRelationsIDs),
                table: "tag",
                column: "id",
            },
        });
        */

    // const missingRelationsNames = extractNames(res.data);

    // console.log("getTagsMissingTags 4: ", {
    //     res,
    //     missingRelationsNames,
    // });

    return { missingTags, removedTags: [] };
    // TODO: removedTags ? why only empty array ?
}

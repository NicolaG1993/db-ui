import extractMissingTagsIDs from "@/src/domains/_app/components/Form/utils/extractMissingTagsIDs";

export default function extractMissingTags(
    currentTags,
    relationsObj,
    sourceData
) {
    /*
        // call API for retrieving ids full objects
        const { data } = await axiosAuthInstance.get("/api/list/filtered", {
            params: { arr: JSON.stringify(tags), table: "tag", column: "name" },
        }); // I might not need this anymore, i have them already from previous screen 🧠
        */

    //    const data = sourceData.map(t => )

    // console.log("extractMissingTags 2: ", { data });
    // const idsArr = extractIDs(tags);
    // console.log("extractMissingTags 2: ", { idsArr });

    // 🔴🔴🔴 BUG HERE! NOT RETURNIG WHAT WE EXPECT
    // we want an array of tag objects
    const missingTagsIDs = extractMissingTagsIDs(currentTags, relationsObj);
    const missingTags = sourceData.filter((t) => missingTagsIDs.includes(t.id));

    /*
        const res = await axiosAuthInstance.get("/api/list/filtered", {
            params: {
                arr: JSON.stringify(missingRelationsIDs),
                table: "tag",
                column: "id",
            },
        });
        */

    // const missingRelationsNames = extractNames(res.data);

    // console.log("extractMissingTags 4: ", {
    //     res,
    //     missingRelationsNames,
    // });

    return { missingTags, removedTags: [] };
    //  we will never need removedTags this with tags, only with actors
}

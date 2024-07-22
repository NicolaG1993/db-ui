const extractItemInfo = (tags) => {
    let tagsObj = {};
    tags?.map((tag) => {
        if (tagsObj[tag.type]) {
            tagsObj[tag.type].push(tag);
        } else {
            tagsObj[tag.type] = [tag];
        }
    });
    let finalObj = {};
    // forse questo non serve, posso modificare tagsObj, ma per ora lo faccio cosi - xk not 100% sure 🧠
    Object.entries(tagsObj).map(([key, value]) => {
        finalObj[key] = value && value.length ? value : null;
    });

    // setItemInfos(finalObj);
    return finalObj;
};

export default extractItemInfo;

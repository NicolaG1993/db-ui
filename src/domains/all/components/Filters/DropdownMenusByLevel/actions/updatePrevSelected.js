const updatePrevSelected = ({
    value,
    userAction,
    prevSelected,
    selected,
    topic,
}) => {
    const prevSelectedClone = [...prevSelected];
    const selectedClone = [...selected];
    console.log("🌸 updatePrevSelected: ", {
        value,
        userAction,
        prevSelected,
        selected,
        prevSelectedClone,
        selectedClone,
        topic,
    });
    let res = [];

    if (topic === "nationalities") {
        if (userAction === "add") {
            if (prevSelected && !prevSelected.some((x) => x === value)) {
                res = [...prevSelected, value];
            }
        }
        if (userAction === "remove") {
            res = prevSelected.filter((x) => x !== value);
        }
    } else {
        if (userAction === "add") {
            // update only if value is not present in array already, bug prevention
            if (prevSelected && !prevSelected.some((x) => x.id === value.id)) {
                res = [...prevSelected, value];
            } else if (!selected.some((x) => x.id === value.id)) {
                res = [...selected, value];
            } //  🧠 what is the point of this conditions? are they even right? 🧠 la seconda secondo me é inutile
        }
        if (userAction === "remove") {
            res = prevSelected.filter((x) => x.id !== value.id);
        }
    }
    return res;
};

export default updatePrevSelected;

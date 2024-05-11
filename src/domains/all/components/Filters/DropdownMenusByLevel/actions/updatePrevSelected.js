const updatePrevSelected = ({ value, userAction, prevSelected, selected }) => {
    const prevSelectedClone = [...prevSelected];
    const selectedClone = [...selected];
    console.log("🌸 updatePrevSelected: ", {
        value,
        userAction,
        prevSelected,
        selected,
        prevSelectedClone,
        selectedClone,
    });
    let res = [];
    if (userAction === "add") {
        // update only if value is not present in array already, bug prevention
        if (prevSelected && !prevSelected.some((x) => x.id === value.id)) {
            res = [...prevSelected, value];
        } else if (!selected.some((x) => x.id === value.id)) {
            res = [...selected, value];
        } //  🧠 what is the point of this conditions? are they even right? 🧠
    }
    if (userAction === "remove") {
        res = prevSelected.filter((x) => x.id !== value.id);
    }
    return res;
};

export default updatePrevSelected;

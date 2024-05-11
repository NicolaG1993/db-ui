const updatePrevSelected = ({ value, userAction, prevSelected, selected }) => {
    console.log("updatePrevSelected: ", {
        value,
        userAction,
        prevSelected,
        selected,
    });
    let res = [];
    if (userAction === "add") {
        // update only if value is not present in array already, bug prevention
        if (prevSelected && !prevSelected.some((x) => x.id === value.id)) {
            res = [...prevSelected, value];
        } else if (!selected.some((x) => x.id === value.id)) {
            res = [...selected, value];
        }
    }
    if (userAction === "remove") {
        res = prevSelected.filter((x) => x.id !== value.id);
    }
    return res;
};

export default updatePrevSelected;

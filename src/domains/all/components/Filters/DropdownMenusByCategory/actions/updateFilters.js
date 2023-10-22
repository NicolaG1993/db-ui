const updateFilters = (val, action, props, filters) => {
    let res = [];
    if (action === "add") {
        // update only if value is not present in array already, bug prevention
        if (props.filters && !props.filters.some((x) => x === val)) {
            res = [...props.filters, val];
        } else if (!filters.some((x) => x === val)) {
            res = [...filters, val];
        }
    }
    if (action === "remove") {
        res = props.filters.filter((x) => x !== val);
    }
    return res;
};

export default updateFilters;

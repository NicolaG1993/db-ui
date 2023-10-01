const filtersParser = (filters) => {
    const parsedFilters = JSON.parse(filters); // parse
    const allObjKeys = Object.keys(parsedFilters); // [models, categories, ...]
    allObjKeys.map((k) => {
        if (!parsedFilters[k].length) {
            parsedFilters[k] = undefined;
        }
    }); // clean filters by deleting empty arrays
    // NB. we are not returning from map, we just have to replace values in another obj (parsedFilters)
    return parsedFilters;
};

export { filtersParser };

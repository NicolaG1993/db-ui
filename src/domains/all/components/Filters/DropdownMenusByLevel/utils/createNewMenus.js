const createNewMenus = ({ dropdownsState, index, groupKey }) => {
    const newState = {
        ...dropdownsState,
        [index]: {
            ...dropdownsState[index],
            [groupKey]: !dropdownsState[index][groupKey],
        },
    };
    return newState;
};

export default createNewMenus;

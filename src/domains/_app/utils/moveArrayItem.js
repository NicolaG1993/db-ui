const moveArrayItem = (arr, fromIndex, toIndex) => {
    let arrClone = [...arr];
    const element = arrClone[fromIndex];
    arrClone.splice(fromIndex, 1);
    arrClone.splice(toIndex, 0, element);
    return arrClone;
};

export default moveArrayItem;

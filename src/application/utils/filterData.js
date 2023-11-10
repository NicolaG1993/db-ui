function searchMatches(arr, str, key) {
    const res = arr.filter(
        (el) => el[key].toLowerCase().indexOf(str.toLowerCase()) > -1
    );
    return res || [];
}
function findMatch(arr, str, key) {
    const res = arr.filter((el) => el[key].toLowerCase() === str.toLowerCase());
    if (res) {
        return res[0];
    }
}

export { findMatch, searchMatches };

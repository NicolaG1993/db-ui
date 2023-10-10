function createObjectURL(object) {
    return window.URL
        ? window.URL.createObjectURL(object)
        : window.webkitURL.createObjectURL(object);
}

function revokeObjectURL(object) {
    return window.URL
        ? window.URL.revokeObjectURL(object)
        : window.webkitURL.revokeObjectURL(object);
}

module.exports = {
    createObjectURL,
    revokeObjectURL,
};

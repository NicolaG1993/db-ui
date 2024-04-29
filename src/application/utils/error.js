const getError = (err) => {
    console.error("🔴 Caught an error:", err);
    return typeof err === "string"
        ? err
        : err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;
};

module.exports = {
    getError,
};

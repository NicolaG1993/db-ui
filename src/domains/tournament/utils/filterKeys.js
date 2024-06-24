const filterKeys = (obj) => {
    // Create new empty objects to store the filtered key-value pairs
    const evenKeysObj = {};
    const oddKeysObj = {};

    // Iterate through the keys of the original object
    for (const key in obj) {
        // Check if the key is an even number
        if (Number(key) % 2 === 0) {
            // If it's even, add the key-value pair to the evenKeysObj
            evenKeysObj[key] = obj[key];
        } else {
            // If it's odd, add the key-value pair to the oddKeysObj
            oddKeysObj[key] = obj[key];
        }
    }

    // Return both objects
    return {
        evenKeys: evenKeysObj,
        oddKeys: oddKeysObj,
    };
};

export default filterKeys;

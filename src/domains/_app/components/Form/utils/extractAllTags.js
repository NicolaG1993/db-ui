const extractAllTags = (filteredData) => {
    /* 
    let result = [];
    for (let key in filteredData) {
        if (filteredData.hasOwnProperty(key)) {
            let subObj = filteredData[key];
            for (let subKey in subObj) {
                if (subObj.hasOwnProperty(subKey)) {
                    result = result.concat(subObj[subKey]);
                }
            }
        }
    }
        */

    ////////
    let result = [];
    for (let key in filteredData) {
        if (filteredData.hasOwnProperty(key)) {
            let subObj = filteredData[key];
            for (let subKey in subObj) {
                if (subObj.hasOwnProperty(subKey)) {
                    result = result.concat(subObj[subKey]);
                }
            }
        }
    }

    ///////////

    // console.log("extractAllTags: ", {
    //     filteredData,
    //     result: result.filter((el) => el),
    // });
    return result.filter((el) => el); // this filter removes possible "undefined" results, that would break the UI
};

export default extractAllTags;

/*
const filteredData = {
    Actions: {
        a: [{ id: 1 }, { id: 2 }],
        b: [{ id: 3 }, { id: 4 }],
        c: [{ id: 5 }, { id: 6 }, { id: 7 }],
    },
    Body: {
        e: [{ id: 8 }],
        f: [{ id: 9 }, { id: 10 }, { id: 11 }],
    },
   // etc...
};

let res = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
];
*/

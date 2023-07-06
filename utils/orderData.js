function sortByValue(data, order) {
    if (!data || !order) {
        return [];
    }
    // data = text or int
    if (order === "desc") {
        return data.sort((a, b) => a.localeCompare(b)).reverse();
    } else {
        return data.sort((a, b) => a.localeCompare(b));
    }
}

function sortByObjValue(data, key, order) {
    if (!data || !key || !order) {
        return [];
    }
    // data = obj[]
    if (order === "desc") {
        return data.sort((a, b) => a[key].localeCompare(b[key])).reverse();
    } else {
        return data.sort((a, b) => a[key].localeCompare(b[key]));
    }
}
function sortByObjNumberValue(data, key, order) {
    if (!data || !key || !order) {
        return [];
    }
    if (order === "desc") {
        const response = data.sort((a, b) => {
            isNaN(Number(a[key])) && (a[key] = 0);
            isNaN(Number(b[key])) && (b[key] = 0);
            return Number(b[key]) - Number(a[key]);
        });
        return response;
    } else {
        return data.sort((a, b) => {
            isNaN(Number(a[key])) && (a[key] = 0);
            isNaN(Number(b[key])) && (b[key] = 0);
            return Number(a[key]) - Number(b[key]);
        });
    }
}
function sortByObjDate(data, key, order) {
    if (!data || !key || !order) {
        return [];
    }
    if (order === "desc") {
        const response = data.sort(
            (a, b) => new Date(b[key]) - new Date(a[key])
        );
        return response;
    } else {
        return data.sort((a, b) => new Date(a[key]) - new Date(b[key]));
    }
}

function sortByLength(data, key, order) {
    if (!data || !key || !order) {
        return [];
    }
    // console.log("sortByValue data: ", data);
    let response = data.sort((a, b) => {
        if (!b[key]) {
            return 1;
        }
        if (!a[key] || b[key].length > a[key].length) {
            return -1;
        }
        if (a[key].length > b[key].length) {
            return 1;
        }
    });

    if (order === "desc") return response.reverse();
    else return response;
}

// The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

export {
    sortByValue,
    sortByObjValue,
    sortByObjNumberValue,
    sortByObjDate,
    sortByLength,
    shuffle,
};

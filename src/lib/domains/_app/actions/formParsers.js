import axios from "axios";

const parseFormProps = (key, value) => {
    if (key === "birthday" || key === "release") {
        return formatFormInputDate(value);
    } else if (
        key === "actors" ||
        key === "studios" ||
        key === "distributions" ||
        key === "categories" ||
        key === "tags"
    ) {
        return value.map((el) => el.name);
    } else if (key === "movies") {
        return value.map((el) => el.title);
    } else if (
        key === "pic" ||
        key === "id" ||
        key === "name" ||
        key === "title" ||
        key === "nationalities" ||
        key === "genre" ||
        key === "rating" ||
        key === "created_at" ||
        key === "type" ||
        key === "nameType" ||
        key === "group" ||
        key === "urls"
    ) {
        return value;
    }
};

const parseFormRelationsEdit = (relatedData, propsData) => {
    // !important that we need ids and not names for db update
    let addedRelations = {};
    let removedRelations = {};

    let standardMethod = (arr, propsData, key) => {
        return arr
            .filter(
                (o) =>
                    !propsData[key]
                        .filter((el) => el.name) // skip any corrupted element saved before in db
                        .map((el) => el.name) // modify the rest
                        .includes(o.name) // check if includes the user selected x
            )
            .map((el) => el.id); // get only the ids
    };

    let nationalitiesMethod = (arr, propsData, key) => {
        return arr
            .filter(
                (o) =>
                    !propsData[key]
                        .filter((el) => el)
                        .map((el) => el)
                        .includes(o.name)
            )
            .map((el) => el.name);
    };

    if (relatedData) {
        Object.entries(relatedData).map(([key, arr], i) => {
            if (key === "nationalities") {
                // fare anche caso nationality N/A? serve veramente ? 🧠
                addedRelations[key] = nationalitiesMethod(arr, propsData, key);
                removedRelations[key] = propsData[key].filter(
                    (el) => !arr.map((x) => x.name).includes(el)
                );
            } else {
                // set the new relations
                addedRelations[key] = standardMethod(arr, propsData, key);
                // set the deleted relations
                removedRelations[key] = propsData[key]
                    .filter((el) => !arr.map((el) => el.id).includes(el.id))
                    .map((el) => el.id);
            }
        });
    }

    return {
        addedRelations,
        removedRelations,
    };
};

/* USED IN FORM TO PARSE ALL RELATIONS ON CREATION/EDIT */
const parseFormRelationsPromise = async (arr, formState) => {
    let relatedData = {};
    // We need Promise.all because we can't await axios with map() 👍
    const allPromises = arr.map(({ topic, label }) => {
        if (label !== "nationality") {
            return axios
                .get(`/api/list/all`, {
                    params: { table: label },
                })
                .then(({ data }) => {
                    relatedData[topic] = data
                        .filter((el) => formState[topic].includes(el.name))
                        .map((el) => {
                            return { name: el.name, id: el.id || el.code }; // nationalities non hanno id
                        });
                })
                .catch((err) => console.error(err));
        }
    });
    return Promise.all(allPromises).then(() => relatedData); // relatedData posso averlo solo dopo aver risolto 🧠
}; // ridurre ad una singola API call - non usarla dentro a map 🧨🧨🧨

/*
function parseDataForForm(obj) {
    const parsedObj = {};
    Object.entries(obj).forEach(([key, value]) =>
        Array.isArray(value) && key !== "urls" && key !== "nationality"
            ? key !== "clips"
                ? (parsedObj[key] = value.map((it) => it.name))
                : (parsedObj[key] = value.map((it) => it.title))
            : (parsedObj[key] = value)
    );
    return parsedObj;
}
*/

export { parseFormProps, parseFormRelationsEdit, parseFormRelationsPromise };

import axios from "axios";
import {
    parseFormRelationsEdit,
    parseFormRelationsPromise,
} from "../utils/formParsers";

// BETA 💛
export default async function createItem(obj, form, formState, propsData) {
    console.log("createItem invoked 💚: ", obj);
    let relatedData;
    if (form.relations) {
        relatedData = await parseFormRelationsPromise(
            form.relations,
            formState
        ); // posso usare direttamente obj ogni volta invece di formState ? 🧠 se sí eliminare 3 prop
    }
    if (propsData) {
        /* parse relations for db */
        let relationsObj = {};
        relatedData &&
            (relationsObj = parseFormRelationsEdit(relatedData, propsData));
        return axios.put(form.APImodify, {
            ...obj,
            ...relationsObj,
        });
        // return axios.put(`/api/${topicLabel}/modify`, {
        //     ...obj,
        //     ...relationsObj,
        // });
    } else {
        /* parse data for db */
        Object.entries(relatedData).map(([key, arr], i) => {
            if (key === "nationalities") {
                relatedData[key] = formState.nationalities;
            } else {
                let parsedArr = relatedData[key].map((el) => el.id);
                relatedData[key] = parsedArr;
            }
        });
        return axios.post(form.APInew, {
            ...obj,
            ...relatedData,
        });
        // return axios.post(`/api/${topicLabel}/new`, {
        //     ...obj,
        //     ...relatedData,
        // });
    }
}

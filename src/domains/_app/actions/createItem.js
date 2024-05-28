import axios from "axios";
import {
    parseFormRelations,
    parseFormRelationsEdit,
    parseFormRelationsPromise,
} from "@/src/domains/_app/utils/formParsers.js";

// BETA 💛
export default async function createItem({ formState, form, propsData }) {
    console.log("createItem invoked 🧠: ", { formState, form, propsData });
    let relatedData;
    if (form.relations) {
        // 🟢 invece di chiamare API per avere relations potrei passare direttamente id da component - invece di name
        // é inutile API qui perché id di relations sono unici e non modificabili
        relatedData = parseFormRelations(form.relations, formState);
        // relatedData = await parseFormRelationsPromise(
        //     form.relations,
        //     formState
        // );
        console.log("🧠 relatedData: ", relatedData); // {name: string, id: string}[]
    }

    if (propsData) {
        // 🔴🔴🔴🔴🔴🔴 MODIFY 🔴🔴🔴🔴🔴🔴 // All relations get deleted on edit
        /* parse relations for db */
        let relationsObj = {};
        relatedData &&
            (relationsObj = parseFormRelationsEdit(relatedData, propsData)); // 🟡 ! TESTARE !

        return axios.put(form.APImodify, {
            ...formState,
            ...relationsObj,
        });
        // return axios.put(`/api/${topicLabel}/modify`, {
        //     ...formState,
        //     ...relationsObj,
        // });
    } else {
        // 🟢 NEW //
        /* parse data for db */

        // QUESTO NON FA LO STESSO DI parseFormRelations() ????

        // Object.entries(relatedData).map(([key, arr], i) => {
        //     // if (key === "nationalities") {
        //     //     relatedData[key] = formState.nationalities;
        //     // } else {

        //     if (key !== "nationalities") {
        //         let parsedArr = relatedData[key].map((el) => ({
        //             name: el.name,
        //             id: el.id,
        //         }));
        //         relatedData[key] = parsedArr;
        //     }
        //     // }
        // });

        return axios.post(form.APInew, {
            ...formState,
            ...relatedData,
        });
        // return axios.post(`/api/${topicLabel}/new`, {
        //     ...formState,
        //     ...relatedData,
        // });
    }
}

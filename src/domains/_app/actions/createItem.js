import axios from "axios";
import {
    parseFormRelations,
    parseFormRelationsEdit,
    parseFormRelationsPromise,
} from "@/src/domains/_app/utils/formParsers.js";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

// BETA 💛
export default async function createItem({
    formState,
    formSettings,
    propsData,
}) {
    console.log("createItem invoked 🧠: ", {
        formState,
        formSettings,
        propsData,
    });
    let relatedData;
    if (formSettings.relations) {
        // 🟢 invece di chiamare API per avere relations potrei passare direttamente id da component - invece di name
        // é inutile API qui perché id di relations sono unici e non modificabili
        relatedData = parseFormRelations(formSettings.relations, formState); // reduce all form selected relations to arrays of ids
        // relatedData = await parseFormRelationsPromise(
        //     formSettings.relations,
        //     formState
        // );
        console.log("🧠 relatedData: ", relatedData); // {name: string, id: string}[]
    }

    if (propsData) {
        // 🟡🟡🟡 MODIFY 🟡🟡🟡 // All relations get deleted on edit
        /* parse relations for db */
        let relationsObj = {};
        relatedData &&
            (relationsObj = parseFormRelationsEdit(relatedData, propsData)); // 🟡 ! TESTARE !
        console.log("🧠 relationsObj: ", relationsObj);

        return axiosAuthInstance.put(formSettings.APImodify, {
            ...formState,
            ...relationsObj,
        });
        // return axiosAuthInstance.put(`/api/${topicLabel}/modify`, {
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

        return axiosAuthInstance.post(formSettings.APInew, {
            ...formState,
            ...relatedData,
        });
        // return axiosAuthInstance.post(`/api/${topicLabel}/new`, {
        //     ...formState,
        //     ...relatedData,
        // });
    }
}

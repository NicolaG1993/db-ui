// import { useEffect, useState } from "react";
// import standardStyles from "@/src/domains/all/components/Filters/DropdownMenusByLevel/DropdownMenusByLevel.module.css";
// import renderDropdownLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownLevel";
// import { useAppSelector } from "@/src/application/redux/lib/hooks";
// import { shallowEqual, useDispatch } from "react-redux";
// import {
//     handleSideNavError,
//     hydrateSideNavDropdowns,
//     selectFormSideNavError,
//     selectFormSideNavFilteredData,
//     selectFormSideNavRenderReady,
//     selectFormSideNavSelected,
//     selectFormStoreUI,
// } from "@/src/application/redux/slices/formSlice";
// import LevelRender from "./components/LevelRender";
// // import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";

// /*
// TODO:
// ✅ controllare cosa fa updatePrevSelected
// ✅ fix selected tags not detected
// ✅ creare files per ogni component e utils
// ✅ fix tag hints not working
// ✅ fix props loops - we have to implement a store for this and refactor some more, not sure
// ⬜ testare con oggetti dummy (ogni oggetto: movie, actor, record, tag, ...)
// ⬜ Fix G.Michaels infos + fix bug if still there (when adding a tag and saving they all got deleted)
// ⬜ pulire codice
// */

// export default function InputItemsDropdown({
//     data,
//     topic,
//     onClick,
//     isLoaded,
//     currentSelection,
//     menuStructure,
//     dropdownsState,
//     handleDropdowns,
//     customStyles,
// }) {
//     //////////////////////////////
//     // REDUX STORE -STATE-
//     //////////////////////////////
//     // console.log("*🌸 Rendering *DropdownMenusByLevel* ");

//     // TODO:
//     // menuStructure contiene solo names
//     // abbinargli gli ids corrispondenti (da tags che riceviamo da API on render)
//     // renderizzarli nel gruppo corretto
//     // handle add
//     // handle remove
//     // handle tags hints

//     const [error, setError] = useState();

//     useEffect(() => {
//         let error;
//         if (!menuStructure) {
//             error = "Error: menuStructure is missing";
//         } else if (typeof menuStructure !== "object") {
//             error = "Error: menuStructure is not an object";
//         } else if (currentSelection && !Array.isArray(currentSelection)) {
//             error = "Error: currentSelection is not an array";
//         }

//         if (error) {
//             setError(error);
//         } else {
//             setError();
//         }
//     }, []);

//     if (error) {
//         return <ErrorMessage error={error} customStyles={customStyles} />;
//         // return <ErrorUI error={error} styles={null} />;
//     }

//     if (!isLoaded) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div id={styles.DropdownMenus}>
//             <LevelRender
//                 menuStructure={menuStructure}
//                 index={1}
//                 onClick={onClick}
//                 currentSelection={currentSelection}
//                 dropdownsState={dropdownsState}
//                 handleDropdowns={handleDropdowns}
//                 customStyles={customStyles}
//             />
//         </div>
//     );
// }
// // SPIKE: Improve UI after search 🧠

// // OLD NOTES: BEFORE REFACTORING
// // // FARE CUSTOM COMPONENTS DI QUESTO 🧠👍
// // // È GIA PRONTO!

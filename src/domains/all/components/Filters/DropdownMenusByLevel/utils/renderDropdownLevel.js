// import loopObject from "@/src/domains/_app/utils/loopObject";
// import DropdownMenusLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/components/DropdownMenusLevel";
// import DropdownMenusList from "@/src/domains/all/components/Filters/DropdownMenusByLevel/components/DropdownMenusList";

// const renderDropdownLevel = ({
//     index,
//     styles,
//     nextMenuStructure,
//     // dropdownsState,
//     // selected,
//     // handleMenus, // queste due fn vanno rimosse da props in qualche modo
//     //  handleFilters, // queste due fn vanno rimosse da props in qualche modo
// }) => {
//     // console.log("🏈 renderDropdownLevel rendering: ", {
//     //     nextMenuStructure,
//     //     index,
//     //     styles,
//     // });
//     return loopObject(nextMenuStructure).map(([key, values], i) => {
//         // console.log("⭐ loopObject(nextMenuStructure) el: ", {
//         //     key,
//         //     values,
//         // });

//         if (values) {
//             if (Array.isArray(values)) {
//                 return (
//                     <DropdownMenusList
//                         key={key}
//                         groupKey={key}
//                         values={values}
//                         index={index} // buggy 🔴 not anympre?

//                         // dropdownsState={dropdownsState}
//                         // handleMenus={handleMenus}
//                         // selected={selected}
//                         // handleFilters={handleFilters}
//                         // menuStructure={nextMenuStructure}
//                     />
//                 );
//             } else if (typeof values === "object") {
//                 return (
//                     <DropdownMenusLevel
//                         key={key}
//                         groupKey={key}
//                         values={values}
//                         index={index} // buggy 🔴 not anympre??
//                         // dropdownsState={dropdownsState}
//                         // selected={selected}
//                         //  handleFilters={handleFilters}
//                         // handleMenus={handleMenus}
//                         // menuStructure={nextMenuStructure}
//                     />
//                 );
//             }
//         }
//     });
// };

// export default renderDropdownLevel;

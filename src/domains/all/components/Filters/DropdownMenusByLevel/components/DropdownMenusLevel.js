import renderDropdownLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownLevel";
import loopObject from "@/src/domains/_app/utils/loopObject";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    selectFormSideDropdownsState,
    selectFormSideNavFilteredData,
    selectFormSideNavSelected,
    updateSideNavDropdownsState,
} from "@/src/application/redux/slices/formSlice";
import createNewMenus from "../utils/createNewMenus";

export default function DropdownMenusLevel({
    groupKey,
    values,
    index,
    styles,
    //  menuStructure,
    // dropdownsState,
    // filters,
    //  handleFilters,
    //  handleMenus,
}) {
    const dispatch = useDispatch();
    // const selected = useSelector(selectFormSideNavSelected, shallowEqual);
    const dropdownsState = useSelector(
        selectFormSideDropdownsState,
        shallowEqual
    );
    const menuStructure = useSelector(
        selectFormSideNavFilteredData,
        shallowEqual
    ); // 🧠 not sure if its correct - test!

    const handleMenus = ({ dropdownsState, index, groupKey }) => {
        // this process may differ for other components, that's why we handle this part here and not in action
        // change if we see it doesn't change 🧠👇
        const newState = createNewMenus({ dropdownsState, index, groupKey });
        dispatch(
            updateSideNavDropdownsState({
                newState,
            })
        );
    };

    ///////////////

    // FIX - refactor
    // devo prendere styles anche da file o va bene cosí?
    // mi serve proprio "menuStructure" fino a qua?

    // 🔴🔴🔴 FIX! WIP 🔴🔴🔴
    // 🔴🔴🔴 Unica soluzione iniziare ad usare store e actions 🔴🔴🔴
    let objectEntries = loopObject(values); // buggy

    const DropdownMenusLevelChilds = () =>
        renderDropdownLevel({
            nextMenuStructure: menuStructure[groupKey],
            index: index + 1,
            styles,
            // dropdownsState,
            // selected,
            // handleFilters,
            // handleMenus, // 🧠 questa fn fa un giro assurdo come prop, non ideale 🧠
        });

    // console.log("🔴🔴🔴 DropdownMenusLevel: ", {
    //     groupKey,
    //     values,
    //     index,
    //     styles,
    //     menuStructure,
    //     objectEntries,
    //     dropdownsState,
    // });

    const logger = (obj) => console.log("🤖!!!LOGGER!!!🤖 ", obj);

    // useEffect(() => {
    //     console.log("index changed! ", {
    //         groupKey,
    //         values,
    //         index,
    //         styles,
    //         menuStructure,
    //         objectEntries,
    //         dropdownsState,
    //     });
    // }, [index]);

    // console.log("⭐ DropdownMenusLevel rendering: ", {
    //     values,
    //     index,
    //     nextMenuStructure: menuStructure[groupKey],
    //     menuStructure,
    // });

    return (
        <div
            className={styles.levelWrap}
            key={"index: " + index + " key: " + groupKey}
        >
            <div
                className={styles.level}
                onClick={() => {
                    // logger({
                    //     groupKey,
                    //     values,
                    //     index,
                    //     styles,
                    //     menuStructure,
                    //     objectEntries,
                    //     dropdownsState,
                    // });
                    handleMenus({ dropdownsState, index, groupKey }); // FIX : error when i click 2 times on a group 🔴🔴🔴
                }}
            >
                <span>• {groupKey}</span>
                <span>{objectEntries.length}</span>
            </div>
            {dropdownsState[index][groupKey] && (
                <div className={styles.levelDropdown}>
                    <DropdownMenusLevelChilds />
                </div>
            )}
        </div>
    );
}

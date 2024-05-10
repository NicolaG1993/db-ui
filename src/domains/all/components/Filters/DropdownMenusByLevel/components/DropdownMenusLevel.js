import renderDropdownLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownLevel";
import loopObject from "@/src/domains/_app/utils/loopObject";
import { useEffect } from "react";

export default function DropdownMenusLevel({
    groupKey,
    values,
    index,
    styles,
    menuStructure,
    dropdownsState,
    filters,
    handleFilters,
    handleMenus,
}) {
    // FIX - refactor
    // devo prendere styles anche da file o va bene cosí?
    // mi serve proprio "menuStructure" fino a qua?

    // 🔴🔴🔴 FIX! WIP 🔴🔴🔴
    // 🔴🔴🔴 Unica soluzione iniziare ad usare store e actions 🔴🔴🔴
    let objectEntries = loopObject(values); // buggy
    const DropdownMenusLevelChilds = () =>
        renderDropdownLevel({
            nextMenuStructure: menuStructure[groupKey],
            index: index++,
            styles,
            dropdownsState,
            filters,
            handleFilters,
            handleMenus, // 🧠 questa fn fa un giro assurdo come prop, non ideale 🧠
        });

    console.log("🔴🔴🔴 DropdownMenusLevel: ", {
        groupKey,
        values,
        index,
        styles,
        menuStructure,
        objectEntries,
        dropdownsState,
    });

    const logger = (obj) => console.log("🤖!!!LOGGER!!!🤖 ", obj);

    useEffect(() => {
        console.log("index changed! ", {
            groupKey,
            values,
            index,
            styles,
            menuStructure,
            objectEntries,
            dropdownsState,
        });
    }, [index]);

    return (
        <div
            className={styles.levelWrap}
            key={"index: " + index + " key: " + groupKey}
        >
            <div
                className={styles.level}
                onClick={() => {
                    logger({
                        groupKey,
                        values,
                        index,
                        styles,
                        menuStructure,
                        objectEntries,
                        dropdownsState,
                    });
                    handleMenus({
                        ...dropdownsState,
                        [index]: {
                            ...dropdownsState[index],
                            [groupKey]: !dropdownsState[index][groupKey],
                        },
                    }); // FIX : error when i click 2 times on a group 🔴🔴🔴
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

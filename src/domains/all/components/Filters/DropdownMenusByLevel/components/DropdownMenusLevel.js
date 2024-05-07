import renderDropdownLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownLevel";
import loopObject from "@/src/domains/_app/utils/loopObject";

export default function DropdownMenusLevel({
    groupKey,
    values,
    index,
    styles,
    menuStructure,
    dropdownMenus,
    filters,
    handleFilters,
    handleMenus,
}) {
    // FIX - refactor
    // devo prendere styles anche da file o va bene cosí?
    // mi serve proprio "menuStructure" fino a qua?

    // 🔴🔴🔴 FIX! WIP 🔴🔴🔴
    let objectEntries = loopObject(values); // buggy
    const DropdownMenusLevelChilds = () =>
        renderDropdownLevel({
            nextMenuStructure: menuStructure[groupKey],
            index: index++,
            styles,
            dropdownMenus,
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
        dropdownMenus,
    });

    return (
        <div
            className={styles.levelWrap}
            key={"index: " + index + " key: " + groupKey}
        >
            <div
                className={styles.level}
                onClick={
                    () =>
                        handleMenus({
                            ...dropdownMenus,
                            [index]: {
                                ...dropdownMenus[index],
                                [groupKey]: !dropdownMenus[index][groupKey],
                            },
                        }) // FIX : error when i click 2 times on a group
                }
            >
                <span>• {groupKey}</span>
                <span>{objectEntries.length}</span>
            </div>
            {dropdownMenus[index][groupKey] && (
                <div className={styles.levelDropdown}>
                    <DropdownMenusLevelChilds />
                </div>
            )}
        </div>
    );
}

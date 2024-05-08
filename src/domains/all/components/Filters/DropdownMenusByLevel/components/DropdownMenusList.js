import renderDropdownElements from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownElements";

export default function DropdownMenusList({
    groupKey,
    values,
    index,
    styles,
    menuStructure,
    dropdownsState,
    filters,
    handleMenus,
    handleFilters,
}) {
    // FIX - refactor
    // devo prendere styles anche da file o va bene cosí?
    // mi serve proprio "menuStructure" fino a qua?

    console.log("DropdownMenusList: ", {
        groupKey,
        values,
        index,
        styles,
        menuStructure,
        dropdownsState,
        filters,
    });
    return (
        <div
            className={styles.levelWrap}
            key={"index: " + index + " key: " + groupKey}
        >
            <div
                className={styles.level}
                onClick={() =>
                    handleMenus({
                        ...dropdownsState,
                        [index]: {
                            ...dropdownsState[index],
                            [groupKey]: !dropdownsState[index][groupKey],
                        },
                    })
                }
            >
                <span>• {groupKey}</span>
                <span>{values.length}</span>
            </div>

            {dropdownsState[index][groupKey] &&
                renderDropdownElements({
                    array: values,
                    groupKey,
                    styles,
                    filters,
                    handleFilters,
                })}
        </div>
    );
}

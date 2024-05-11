import { selectFormSideNavSelected } from "@/src/application/redux/slices/formSlice";
import renderDropdownElements from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownElements";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function DropdownMenusList({
    groupKey,
    values,
    index,
    styles,
    menuStructure,
    dropdownsState,
    handleMenus,
}) {
    // FIX - refactor
    // devo prendere styles anche da file o va bene cosí?
    // mi serve proprio "menuStructure" fino a qua?

    const dispatch = useDispatch();
    const selected = useSelector(selectFormSideNavSelected, shallowEqual);

    console.log("DropdownMenusList: ", {
        groupKey,
        values,
        index,
        styles,
        menuStructure,
        dropdownsState,
        selected,
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
                    selected,
                })}
        </div>
    );
}

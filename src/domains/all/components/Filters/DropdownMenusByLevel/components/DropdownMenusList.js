import {
    selectFormSideDropdownsState,
    selectFormSideNavSelected,
    updateSideNavDropdownsState,
} from "@/src/application/redux/slices/formSlice";
import renderDropdownElements from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownElements";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import createNewMenus from "../utils/createNewMenus";

export default function DropdownMenusList({ groupKey, values, index, styles }) {
    // FIX - refactor

    const dispatch = useDispatch();
    const selected = useSelector(selectFormSideNavSelected, shallowEqual);
    const dropdownsState = useSelector(
        selectFormSideDropdownsState,
        shallowEqual
    );

    // console.log("DropdownMenusList: ", {
    //     groupKey,
    //     values,
    //     index,
    //     styles,
    //     dropdownsState,
    //     selected,
    // });

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

    console.log("DropdownMenusList: ", {
        index,
        groupKey,
        dropdownsState,
        values,
        selected,
    });

    return (
        <div
            className={styles.levelWrap}
            key={"index: " + index + " key: " + groupKey}
        >
            <div
                className={styles.level}
                onClick={() => handleMenus({ dropdownsState, index, groupKey })}
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

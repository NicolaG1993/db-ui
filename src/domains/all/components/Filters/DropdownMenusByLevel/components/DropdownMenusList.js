import {
    selectFormSideDropdownsState,
    selectFormSideNavSelected,
    updateSideNavDropdownsState,
} from "@/src/application/redux/slices/formSlice";
import renderDropdownElements from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownElements";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import createNewMenus from "../utils/createNewMenus";

export default function DropdownMenusList({ groupKey, values, index, styles }) {
    const dispatch = useDispatch();
    const currentSelection = useSelector(
        selectFormSideNavSelected,
        shallowEqual
    );
    const dropdownsState = useSelector(
        selectFormSideDropdownsState,
        shallowEqual
    );

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
                    data: values,
                    groupKey,
                    styles,
                    currentSelection,
                })}
        </div>
    );
}

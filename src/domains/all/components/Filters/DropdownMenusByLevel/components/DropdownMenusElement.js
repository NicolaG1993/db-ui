import { updateSideNavSelected } from "@/src/application/redux/slices/formSlice";
import { useDispatch } from "react-redux";

export default function DropdownMenusElement({
    it,
    // handleFilters,
    styles,
    isSelected,
}) {
    console.log(" ✌️ DropdownMenusElement: ", { it, isSelected });
    const dispatch = useDispatch();
    return (
        <div>
            <span
                className={isSelected ? styles.selectedEl : styles.unselectedEl}
                // onClick={() => handleFilters(it, selected ? "remove" : "add")}
                onClick={() =>
                    dispatch(
                        updateSideNavSelected({
                            value: it,
                            userAction: isSelected ? "remove" : "add",
                            log: "DropdownMenusElement",
                        })
                    )
                }
            >
                {it.name}
            </span>
        </div>
    );
}

import { updateSideNavSelected } from "@/src/application/redux/slices/formSlice";
import Element from "../components/Element";

const renderElements = ({ data, currentFilters, updateFilters, styles }) =>
    data.map((it) => {
        // use Element component

        return currentFilters && currentFilters.find((x) => it.id === x.id) ? (
            <Element
                key={"InputSelector element (isSelected) • value: " + it.id}
                it={it}
                styles={styles}
                isSelected={true}
            />
        ) : (
            <Element
                key={"InputSelector element (!isSelected) • value: " + it.id}
                it={it}
                styles={styles}
                isSelected={false}
            />
        );

        //////
        /*
        return currentFilters && currentFilters.find((x) => it.id === x.id) ? (
            <div key={"value: " + it.id}>
                <span
                    className={styles.selectedEl}
                    // onClick={() => updateFilters(it, "remove")}
                    onClick={() =>
                        dispatch(
                            updateSideNavSelected({
                                value: it,
                                userAction: remove,
                                // userAction: isSelected ? "remove" : "add",
                                log: "DropdownMenusElement",
                            })
                        )
                    }
                >
                    {it.name}
                </span>
            </div>
        ) : (
            <div key={"value: " + it.id}>
                <span
                    className={styles.unselectedEl}
                    // onClick={() => updateFilters(it, "add")}
                    onClick={() =>
                        dispatch(
                            updateSideNavSelected({
                                value: it,
                                userAction: "add",
                                log: "DropdownMenusElement",
                            })
                        )
                    }
                >
                    {it.name}
                </span>
            </div>
        );
        */
    });

export default renderElements;

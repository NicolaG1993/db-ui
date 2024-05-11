import DropdownMenusElement from "@/src/domains/all/components/Filters/DropdownMenusByLevel/components/DropdownMenusElement";

const renderDropdownElements = ({ array, key, styles, selected }) => {
    console.log("renderDropdownElements ACTIVATED 🧨", {
        array,
        key,
        styles,
        selected,
    });
    return (
        <div className={styles.levelDropdown}>
            {array.map((it) => {
                return selected && selected.find((x) => it.id === x.id) ? (
                    <DropdownMenusElement
                        key={
                            "Dropdown element (isSelected) • value: " +
                            it.id +
                            " key: " +
                            key
                        }
                        it={it}
                        styles={styles}
                        isSelected={true}
                    />
                ) : (
                    <DropdownMenusElement
                        key={
                            "Dropdown element (!isSelected) • value: " +
                            it.id +
                            " key: " +
                            key
                        }
                        it={it}
                        styles={styles}
                        isSelected={false}
                    />
                );
            })}
        </div>
    );
};

export default renderDropdownElements;

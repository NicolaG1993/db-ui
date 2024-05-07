import DropdownMenusElement from "@/src/domains/all/components/Filters/DropdownMenusByLevel/components/DropdownMenusElement";

const renderDropdownElements = ({
    array,
    key,
    styles,
    filters,
    handleFilters,
}) => {
    console.log("renderDropdownElements ACTIVATED 🧨", {
        array,
        key,
        styles,
        filters,
        handleFilters,
    });

    return (
        <div className={styles.levelDropdown}>
            {array.map((it) => {
                return filters && filters.find((x) => it.id === x.id) ? (
                    <DropdownMenusElement
                        key={
                            "Dropdown element (selected) • value: " +
                            it.id +
                            " key: " +
                            key
                        }
                        it={it}
                        handleFilters={handleFilters}
                        styles={styles}
                        selected={true}
                    />
                ) : (
                    <DropdownMenusElement
                        key={
                            "Dropdown element (not selected) • value: " +
                            it.id +
                            " key: " +
                            key
                        }
                        it={it}
                        handleFilters={handleFilters}
                        styles={styles}
                        selected={false}
                    />
                );
            })}
        </div>
    );
};

export default renderDropdownElements;

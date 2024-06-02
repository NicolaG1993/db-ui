import DropdownMenusElement from "@/src/domains/all/components/Filters/DropdownMenusByLevel/components/DropdownMenusElement";

const renderDropdownElements = ({ data, key, currentSelection, styles }) => (
    <div className={styles.levelDropdown}>
        {data.map((it) => {
            return currentSelection &&
                currentSelection.find((x) => it.id === x.id) ? (
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

export default renderDropdownElements;

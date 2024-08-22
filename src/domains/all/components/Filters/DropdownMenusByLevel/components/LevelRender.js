export default function LevelRender({
    menuStructure,
    index,
    onClick,
    currentSelection,
    dropdownsState,
    handleDropdowns,
}) {
    return (
        <>
            {Object.entries(menuStructure).map(([key, values], i) => {
                if (values) {
                    if (Array.isArray(values)) {
                        return (
                            <DropdownMenusList
                                key={key}
                                groupKey={key}
                                values={values}
                                index={index} // buggy 🔴 not anympre?
                                onClick={onClick}
                                currentSelection={currentSelection}
                                dropdownsState={dropdownsState}
                                handleDropdowns={handleDropdowns}
                                customStyles={customStyles}
                            />
                        );
                    } else if (typeof values === "object") {
                        return (
                            <DropdownMenusLevel
                                key={key}
                                groupKey={key}
                                values={values}
                                index={index} // buggy 🔴 not anympre??
                                onClick={onClick}
                                currentSelection={currentSelection}
                                dropdownsState={dropdownsState}
                                menuStructure={menuStructure}
                                customStyles={customStyles}
                            />
                        );
                    }
                }
            })}
        </>
    );
}

import loopObject from "@/src/domains/_app/utils/loopObject";

const renderLevel = ({ values, key, index, dropdownsState }) => {
    console.log("🔥 renderLevel: ", {
        values,
        key,
        index,
        dropdownsState,
    });
    if (values) {
        if (Array.isArray(values)) {
            return (
                <div
                    className={styles.levelWrap}
                    key={"index: " + index + " key: " + key}
                >
                    <div
                        className={styles.level}
                        onClick={() =>
                            setDropdownMenus({
                                ...dropdownsState,
                                [index]: {
                                    ...dropdownsState[index],
                                    [key]: !dropdownsState[index][key],
                                },
                            })
                        }
                    >
                        <span>• {key}</span>
                        <span>{values.length}</span>
                    </div>

                    {dropdownsState[index][key] && renderValues(values, key)}
                </div>
            );
        } else if (typeof values === "object") {
            let objectEntries = loopObject(values);
            let Res = () => checkEntries(objectEntries, Number(index) + 1);

            return (
                <div
                    className={styles.levelWrap}
                    key={"index: " + index + " key: " + key}
                >
                    <div
                        className={styles.level}
                        onClick={() =>
                            setDropdownMenus({
                                ...dropdownsState,
                                [index]: {
                                    ...dropdownsState[index],
                                    [key]: !dropdownsState[index][key],
                                },
                            })
                        }
                    >
                        <span>• {key}</span>
                        <span>{objectEntries.length}</span>
                    </div>
                    {dropdownsState[index][key] && (
                        <div className={styles.levelDropdown}>
                            <Res />
                        </div>
                    )}
                </div>
            );
        }
    }
};

export { renderLevel };

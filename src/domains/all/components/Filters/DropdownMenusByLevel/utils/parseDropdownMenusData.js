import loopObject from "@/src/domains/_app/utils/loopObject";

const renderLevel = ({ values, key, index, dropdownMenus }) => {
    console.log("🔥 renderLevel: ", {
        values,
        key,
        index,
        dropdownMenus,
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
                                ...dropdownMenus,
                                [index]: {
                                    ...dropdownMenus[index],
                                    [key]: !dropdownMenus[index][key],
                                },
                            })
                        }
                    >
                        <span>• {key}</span>
                        <span>{values.length}</span>
                    </div>

                    {dropdownMenus[index][key] && renderValues(values, key)}
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
                                ...dropdownMenus,
                                [index]: {
                                    ...dropdownMenus[index],
                                    [key]: !dropdownMenus[index][key],
                                },
                            })
                        }
                    >
                        <span>• {key}</span>
                        <span>{objectEntries.length}</span>
                    </div>
                    {dropdownMenus[index][key] && (
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

/* DELETE
const checkEntries = ({ array, index }) => {
    console.log("checkEntries: ", { array, index });
    // return array.map(([key, values], i) =>
    //     renderCategory({ values, key, index, dropdownMenus })
    // );
    return array.map(([key, values], i) => {
        renderCategory({ values, key, index, dropdownMenus });
    });
};
*/

import loopObject from "@/src/domains/_app/utils/loopObject";

//////////////

const renderCategory = ({ values, key, index, dropdownMenus }) => {
    console.log("🔥 renderCategory: ", {
        values,
        key,
        index,
        dropdownMenus,
    });
    if (values) {
        if (Array.isArray(values)) {
            return (
                <div
                    className={styles.categoryWrap}
                    key={"index: " + index + " key: " + key}
                >
                    <div
                        className={styles.category}
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
                    className={styles.categoryWrap}
                    key={"index: " + index + " key: " + key}
                >
                    <div
                        className={styles.category}
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
                        <div className={styles.categoryDropdown}>
                            <Res />
                        </div>
                    )}
                </div>
            );
        }
    }
};

export { renderCategory };

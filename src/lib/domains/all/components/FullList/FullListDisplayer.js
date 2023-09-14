import Card from "../../../_app/components/Card/Card";
import PageNav from "../Filters/PageNav/PageNav";
import styles from "./FullListDisplayer.module.css";
import { parseOrderOptions } from "@/utils/custom/customParsers";

export default function FullListDiplayer({
    table,
    tableName,
    displayData,
    goToPage,
    step,
    selectedPage,
    order,
    handleSelect,
}) {
    const sliceData = (arr) =>
        arr.slice(selectedPage * step - step, selectedPage * step);

    return (
        <div className={styles.display}>
            <div className={styles.displayHeading}>
                <div>
                    <h4>{tableName}</h4>
                    <span>{displayData ? displayData.length : 0} results</span>
                </div>

                <PageNav
                    displayData={displayData}
                    goToPage={goToPage}
                    step={step}
                    selectedPage={selectedPage}
                />

                <select
                    name="order"
                    id="Order"
                    onChange={(e) => handleSelect(e)}
                    value={order}
                >
                    {parseOrderOptions(table.orders)}
                </select>
            </div>

            <div className={styles.fullListGrid}>
                {displayData ? (
                    sliceData(displayData).map((el, i) => (
                        <Card
                            key={`FullListContent ${el[table.nameType]} ${i}`}
                            table={table}
                            obj={el}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <div>
                <PageNav
                    displayData={displayData}
                    goToPage={goToPage}
                    step={step}
                    selectedPage={selectedPage}
                />
            </div>
        </div>
    );
}

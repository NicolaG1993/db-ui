import PageNav from "../Filters/PageNav/PageNav";
import FullListContent from "./FullListContent";
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
                <FullListContent
                    data={
                        displayData &&
                        displayData.slice(
                            selectedPage * step - step,
                            selectedPage * step
                        )
                    }
                    table={table}
                />
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

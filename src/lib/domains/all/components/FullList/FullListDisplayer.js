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
    totalCount,
    handleSelect,
}) {
    return (
        <div className={styles.display}>
            <div className={styles.displayHeading}>
                <div>
                    <h4>{tableName}</h4>
                    <span>{totalCount ? totalCount : 0} results</span>
                </div>

                <PageNav
                    totalCount={totalCount}
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
                {displayData &&
                    displayData.map((el, i) => (
                        <Card
                            key={`FullListContent ${el[table.nameType]} ${i}`}
                            table={table}
                            obj={el}
                        />
                    ))}
            </div>

            <div>
                <PageNav
                    totalCount={totalCount}
                    goToPage={goToPage}
                    step={step}
                    selectedPage={selectedPage}
                />
            </div>
        </div>
    );
}

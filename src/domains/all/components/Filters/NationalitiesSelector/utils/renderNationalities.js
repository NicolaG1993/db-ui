import Element from "@/src/domains/all/components/Filters/NationalitiesSelector/components/Element";

const renderNationalities = ({
    data,
    currentSelection,
    updateFilters,
    styles,
}) =>
    data.map((it) => {
        return currentSelection && currentSelection.find((x) => it === x) ? (
            <Element
                key={
                    "NationalitiesSelector element (isSelected) • value: " + it
                }
                it={it}
                styles={styles}
                isSelected={true}
            />
        ) : (
            <Element
                key={
                    "NationalitiesSelector element (!isSelected) • value: " + it
                }
                it={it}
                styles={styles}
                isSelected={false}
            />
        );
    });

export default renderNationalities;

export default function DropdownMenusElement({
    it,
    handleFilters,
    styles,
    selected,
}) {
    return (
        <div>
            <span
                className={selected ? styles.selectedEl : styles.unselectedEl}
                onClick={() => handleFilters(it, selected ? "remove" : "add")}
            >
                {it.name}
            </span>
        </div>
    );
}

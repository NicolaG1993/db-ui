import { useState, useEffect, useRef } from "react";
import styles from "@/src/domains/_app/components/Inputs/CustomDropdown/CustomDropdown.module.css";
import allThemes from "@/src/application/settings/allThemes";

export default function CustomDropdown({
    options,
    selectedValue,
    onSelect,
    OptionComponent,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selectedValue);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (value) => {
        setSelectedOption(value);
        onSelect(value);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles["custom-dropdown"]} ref={dropdownRef}>
            <div
                className={styles["custom-select"]}
                onClick={handleToggleDropdown}
                tabIndex="0"
            >
                <span className={styles["selected-option"]}>
                    {selectedOption}
                </span>
                <div
                    className={`${styles["options-container"]} ${
                        isOpen ? styles["open"] : ""
                    }`}
                >
                    {options.map((option) => (
                        <OptionComponent
                            key={option.tag}
                            el={option}
                            handleOptionSelect={(value) =>
                                handleOptionSelect(value)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

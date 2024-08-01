import { useState, useEffect, useRef } from "react";
import styles from "@/src/domains/_app/components/Inputs/CustomDropdown/CustomDropdown.module.css";

/*
    Fix styling - we should pass components (ex. themes select)
*/

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

    console.log("selectedOption: ", { selectedValue, selectedOption });

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
                        // <div
                        //     key={option.value}
                        //     className={`option ${
                        //         option.value === selectedOption
                        //             ? "selected"
                        //             : ""
                        //     }`}
                        //     onClick={() => handleOptionSelect(option.value)}
                        // >
                        //     {option.label}
                        // </div>
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

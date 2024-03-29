//React
import { forwardRef } from "react";

//Types
import Character from "../../types/chracter";

//Icons
import { RxCross2 } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";

//Style
import styles from "./index.module.css";
import useWindowDimensions from "../../Hooks/useWindowDimensions";

interface selectedElementProps {
    selectedCharacters: Character[];
    handleAddRemoveCharacter: (char: Character, action?: "Remove") => void;
    setDropdown: () => void;
    dropdown: boolean;
}

const SelectedElement = forwardRef<HTMLDivElement, selectedElementProps>(
    (
        { selectedCharacters, handleAddRemoveCharacter, setDropdown, dropdown },
        ref,
    ) => {

        const { width } = useWindowDimensions();
        console.log(width)

        const getSlicedChracters = (where: "SearchBox" | "Dropdown") => {
            switch (where) {
                case "SearchBox":
                    if (width > 640) {
                        return selectedCharacters.slice(0, 2);
                    } else {
                        return selectedCharacters.slice(0, 1);
                    }
                case "Dropdown":
                    if (width > 640) {
                        return selectedCharacters.slice(2);
                    } else {
                        return selectedCharacters.slice(1);
                    }
                default:
                    return selectedCharacters
            }
        }

        return (
            <>
                {getSlicedChracters("SearchBox").map((char, index) => (
                    <div className={styles.selected_element} key={index}>
                        <div className={styles.char_name}>{char.name}</div>
                        <span
                            onClick={() => handleAddRemoveCharacter(char, "Remove")}
                            className={styles.remove_item}
                        >
                            <RxCross2 color="white" />
                        </span>
                    </div>
                ))}
                {selectedCharacters.length > (width < 640 ? 1 : 2) && (
                    <div className={styles.selected_wrapper}>
                        <div className={styles.selected_element}>
                            <div onClick={() => setDropdown()} className={styles.char_name}>
                                <span>+{selectedCharacters.length - (width < 640 ? 1 : 2)}</span>
                                <span className={styles.dropdown_down_icon}>
                                    <FaAngleDown />
                                </span>
                            </div>
                        </div>
                        {dropdown && (
                            <div ref={ref} className={styles.dropdown_list} >
                                {getSlicedChracters("Dropdown").map((char) => (
                                    <div
                                        className={styles.selected_element_dropdown}
                                        key={char.id}
                                        tabIndex={-1}
                                    >
                                        <div className={styles.char_name}>{char.name}</div>
                                        <span
                                            onClick={() => handleAddRemoveCharacter(char, "Remove")}
                                            className={styles.remove_item}
                                        >
                                            <RxCross2 color="white" />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </>
        );
    },
);

export default SelectedElement;

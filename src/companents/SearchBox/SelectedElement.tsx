//React
import { forwardRef } from "react";

//Types
import Character from "../../types/chracter";

//Icons
import { RxCross2 } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";

//Style
import styles from "./index.module.css";

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
        return (
            <>
                {selectedCharacters.slice(0, 2).map((char, index) => (
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
                {selectedCharacters.length > 2 && (
                    <div className={styles.selected_wrapper}>
                        <div className={styles.selected_element}>
                            <div onClick={() => setDropdown()} className={styles.char_name}>
                                <span>+{selectedCharacters.length - 2}</span>
                                <span className={styles.dropdown_down_icon}>
                                    <FaAngleDown />
                                </span>
                            </div>
                        </div>
                        {dropdown && (
                            <div ref={ref} className={styles.dropdown_list} tabIndex={0}>
                                {selectedCharacters.slice(2).map((char) => (
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

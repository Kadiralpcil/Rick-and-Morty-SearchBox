//React
import React, { forwardRef } from "react";

//Types
import Character from "../types/chracter";

//Icons
import { RxCross2 } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";

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
                    <div className="selected_element" key={index}>
                        <div className="char_name">{char.name}</div>
                        <span
                            onClick={() => handleAddRemoveCharacter(char, "Remove")}
                            className="remove_item"
                        >
                            <RxCross2 color="white" />
                        </span>
                    </div>
                ))}
                {selectedCharacters.length > 2 && (
                    <div className="selected_wrapper">
                        <div className="selected_element">
                            <div onClick={() => setDropdown()} className="char_name">
                                <span>+{selectedCharacters.length - 2}</span>
                                <span className="dropdown_down_icon">
                                    <FaAngleDown />
                                </span>
                            </div>
                        </div>
                        {dropdown && (
                            <div ref={ref} className="dropdown_list" tabIndex={0}>
                                {selectedCharacters.slice(2).map((char) => (
                                    <div
                                        className=" selected_element_dropdown"
                                        key={char.id}
                                        tabIndex={-1}
                                    >
                                        <div className="char_name">{char.name}</div>
                                        <span
                                            onClick={() => handleAddRemoveCharacter(char, "Remove")}
                                            className="remove_item"
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

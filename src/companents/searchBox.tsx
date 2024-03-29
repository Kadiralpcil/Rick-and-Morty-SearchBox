//React
import React, { useRef, useState, useEffect } from "react";

//Types
import Character from "../types/chracter";

//Components
import SelectItem from "./SelectItem"
import SelectedElement from "./SelectedElement";

//Style
import "./Searchbox.css";

// Interface
interface NotFoundProps {
    message: string;
    status: boolean;
}

const Searchbox = () => {

    // States
    const [filteredCharacter, setFilteredCharacter] = useState<Character[]>([]);
    const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
    const [currentName, setCurrentName] = useState<string>("");
    const [dropDown, setDropdown] = useState<boolean>(false);
    const [hoveredElement, setHoveredElement] = useState<Character | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<NotFoundProps>({
        message: "There is no character",
        status: false,
    });

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownListRef = useRef<HTMLDivElement>(null);
    const suggestionContainer = useRef<HTMLDivElement>(null)

    // API Filter
    const filterCharacterByQuery = async (name: string) => {
        setCurrentName(name);
        setLoading(true);
        try {
            const response = await fetch(
                `https://rickandmortyapi.com/api/character/?name=${name}`,
            );
            if (!response.ok) throw new Error("Network response was not ok");
            const jsonData = await response.json();
            setFilteredCharacter(jsonData.results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            setNotFound({ ...notFound, status: true });
            setFilteredCharacter([]);
        }
    };

    // Functions
    const handleAddRemoveCharacter = (
        character: Character,
        action?: "Remove",
    ) => {
        if (action) {
            setSelectedCharacters((prevArr) =>
                prevArr.filter((char) => char.id !== character.id),
            );
        } else {
            const exists = selectedCharacters.some(
                (char) => char.id === character.id,
            );
            setSelectedCharacters((prevArr) =>
                exists
                    ? prevArr.filter((char) => char.id !== character.id)
                    : [...prevArr, character],
            );
        }
        setCurrentName("");
        inputRef.current && inputRef.current.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                if (filteredCharacter.length > 0) {
                    const lastIndex = filteredCharacter.length - 1;
                    const currentIndex = filteredCharacter.findIndex(
                        (char) => char.id === hoveredElement?.id
                    );
                    const newIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
                    setHoveredElement(filteredCharacter[newIndex]);

                    if (newIndex === filteredCharacter.length - 1) {
                        if (suggestionContainer.current) {
                            suggestionContainer.current.children[filteredCharacter.length - 1].scrollIntoView({ behavior: "smooth" });

                        }
                    } else {
                        if (suggestionContainer.current) {
                            suggestionContainer.current.children[newIndex].scrollIntoView({ behavior: "smooth" });
                        }
                    }


                }
                break;
            case "ArrowDown":
                event.preventDefault();
                if (filteredCharacter.length > 0) {
                    const lastIndex = filteredCharacter.length - 1;
                    const currentIndex = filteredCharacter.findIndex(
                        (char) => char.id === hoveredElement?.id
                    );
                    const newIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
                    setHoveredElement(filteredCharacter[newIndex]);

                    if (newIndex === 0) {
                        if (suggestionContainer.current) {
                            suggestionContainer.current.children[0].scrollIntoView({ behavior: "smooth" });

                        }
                    }

                    if (newIndex > 4) {
                        if (suggestionContainer.current) {
                            suggestionContainer.current.children[newIndex - 5].scrollIntoView({ behavior: "smooth" });
                        }
                    }


                }
                break;
            case "Backspace":
                if (currentName === "") {
                    handleAddRemoveCharacter(selectedCharacters[selectedCharacters.length - 1], 'Remove')
                }
                break;
            case "Enter":
                event.preventDefault();
                if (currentName !== "" && filteredCharacter.length > 0) {
                    const selectedChar = filteredCharacter.find(
                        (char) => char.id === hoveredElement?.id
                    );
                    if (selectedChar) {
                        handleAddRemoveCharacter(selectedChar);
                        setCurrentName("");
                    }
                }
                break;
            default:
                break;
        }
    };

    //Effects
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownListRef.current &&
                !dropdownListRef.current.contains(event.target as Node)
            ) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="searchbox_wrapper">
            <div className="selected_element_input_wrapper">
                <SelectedElement
                    selectedCharacters={selectedCharacters}
                    handleAddRemoveCharacter={(char: Character, action?: "Remove") => handleAddRemoveCharacter(char, action)}
                    setDropdown={() => setDropdown(!dropDown)}
                    dropdown={dropDown}
                    ref={dropdownListRef}
                />
                <input
                    ref={inputRef}
                    onChange={(e) => filterCharacterByQuery(e.target.value)}
                    className="input"
                    placeholder="Search character..."
                    value={currentName}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div ref={suggestionContainer} hidden={currentName === ""} className="suggestions_container">
                {loading ? (
                    <div className="notify_messege">
                        <span className="loading_text">loading..</span>
                        <img className="loading" src={require('./../assets/loading.gif')}
                            alt="loading.."
                        />
                    </div>
                ) : notFound.status && filteredCharacter.length === 0 ? (
                    <div className="notify_messege">{notFound.message}</div>
                ) : (
                    filteredCharacter.map((character, index) => (
                        <SelectItem
                            key={index}
                            currentName={currentName}
                            character={character}
                            index={index}
                            handleAddRemoveCharacter={(character: Character) =>
                                handleAddRemoveCharacter(character)
                            }
                            isSelected={selectedCharacters.find(selectedChar => selectedChar.id === character.id) ? true : false}
                            hoveredElement={hoveredElement}
                        />
                    ))
                )}
            </div>
        </div >
    );
};

export default Searchbox;

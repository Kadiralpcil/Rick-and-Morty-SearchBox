//React
import { useMemo } from "react";

//Types
import Character from "../types/chracter";

//CSS
import "./searchbox.css";

interface SelectItemProps {
    currentName: string;
    character: Character;
    index: number;
    isSelected: boolean;
    handleAddRemoveCharacter: (character: Character) => void;
    hoveredElement?: Character;
}

export default function SelectItem({
    character,
    index,
    currentName,
    isSelected,
    handleAddRemoveCharacter,
    hoveredElement,
}: SelectItemProps) {

    //Memoization
    const className = useMemo(() => {
        return hoveredElement?.id === character.id
            ? "select_element active"
            : "select_element";
    }, [character.id, hoveredElement?.id]);

    //Functions
    const renderCell = (name: string) => {

        const parts = name.split(new RegExp(`(${currentName})`, "gi"));

        return (
            <div tabIndex={-1}>
                {parts.map((part, i) =>
                    part.toLowerCase() === currentName.toLowerCase() ? (
                        <span key={i}>
                            <b>{part}</b>
                        </span>
                    ) : (
                        <span key={i}>{part}</span>
                    ),
                )}
            </div>
        );
    };

    return (
        <label
            tabIndex={0}
            htmlFor={character.id.toString()}
            className={className}
            key={character.id}
        >
            <input
                checked={isSelected}
                tabIndex={-1}
                id={character.id.toString()}
                onChange={() => handleAddRemoveCharacter(character)}
                type="checkbox"
            />
            <img className="char_img" src={character.image} alt={character.name} />
            <div tabIndex={-1} className="name_and_episode">
                <span>{renderCell(character.name)}</span>
                <span>{character.episode.length} Episodes</span>
            </div>
        </label>
    );
}

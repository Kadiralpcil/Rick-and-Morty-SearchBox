//Types
import Character from "../../types/chracter";

//Style
import styles from "./index.module.css";

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
    //Functions
    const renderCell = (name: string) => {

        const parts = name.split(new RegExp(`(${currentName})`, "gi"));

        return (
            <div>
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
            className={`${styles.select_element} ${hoveredElement?.id === character.id ? styles.active : ""}`}
            key={character.id}
        >
            <input
                checked={isSelected}
                tabIndex={-1}
                id={character.id.toString()}
                onChange={() => handleAddRemoveCharacter(character)}
                type="checkbox"
            />
            <img className={styles.char_img} src={character.image} alt={character.name} />
            <div tabIndex={-1} className={styles.name_and_episode}>
                <span>{renderCell(character.name)}</span>
                <span>{character.episode.length} Episodes</span>
            </div>
        </label>
    );
}

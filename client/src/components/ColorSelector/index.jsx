import { useEffect, useRef } from "react";
import updateNote from "../../utils/updateNote";
import "./style.css";

// [backgroundColor, color]
const colorsList = [
  ["teal-50", "teal-1000"],
  ["teal-100", "teal-1000"],
  ["teal-200", "teal-1000"],
  ["teal-300", "teal-1000"],
  ["teal-400", "teal-50"],
  ["teal-500", "teal-50"],
  ["teal-600", "teal-50"],
  ["teal-700", "teal-50"],
  ["teal-800", "teal-50"],
  ["teal-900", "teal-50"],
  ["teal-950", "teal-50"],
  ["teal-1000", "teal-50"],
  ["grey-700", "teal-50"],
  ["grey-800", "teal-50"],
  ["grey-900", "teal-50"],
];

const ColorSelector = ({
  setNoteContent,
  noteContent,
  handleColorSelectorToggle,
}) => {
  const handleColorSelection = async (bgColor, fontColor, e) => {
    handleColorSelectorToggle(e);
    const updatedNoteContent = {
      ...noteContent,
      backgroundColor: `var(--${bgColor})`,
      color: `var(--${fontColor})`,
    };

    setNoteContent(updatedNoteContent);
    const response = await updateNote(updatedNoteContent);
    if (response.status !== "success") {
      alert("Color change won't persist. Please try again later.");
    }
  };

  return (
    <div className="color-selector">
      {colorsList.map(([bgColor, fontColor]) => (
        <div
          className="color-selector-option"
          style={{
            backgroundColor: `var(--${bgColor})`,
          }}
          onClick={(e) => handleColorSelection(bgColor, fontColor, e)}
        ></div>
      ))}
    </div>
  );
};

export default ColorSelector;

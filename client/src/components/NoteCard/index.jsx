import { useState, useContext } from "react";
import { IoIosColorPalette, IoIosTrash } from "react-icons/io";

import EditNoteCard from "../EditNoteCard";
import ColorSelector from "../ColorSelector";
import updateNote from "../../utils/updateNote";
import deleteNote from "../../utils/deleteNote";

import ToastContext from "../../context/toast-context";

import "./style.css";

const NoteCard = ({ note, removeNote }) => {
  const [editable, setEditable] = useState(false);
  const [colorSelectorActive, setColorSelectorActive] = useState(false);
  const [noteContent, setNoteContent] = useState(note);

  const { handleResponse } = useContext(ToastContext);

  const toggleEditable = () => {
    setEditable((currState) => !currState);
    setColorSelectorActive(false);
  };

  const handleClose = async () => {
    toggleEditable();
    const data = await updateNote(noteContent);
    handleResponse(data);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const data = await deleteNote(noteContent);
    removeNote(note.id);
    handleResponse(data);
  };

  const handleColorSelectorToggle = (e) => {
    e.stopPropagation();
    setColorSelectorActive((currStatus) => !currStatus);
  };

  const dividerStyle = {
    backgroundColor: noteContent.color || "var(--teal-50)",
  };

  return (
    <>
      <div
        className={editable ? "notecard-disabled" : "notecard"}
        onClick={toggleEditable}
        style={{
          backgroundColor: noteContent.backgroundColor,
          color: noteContent.color,
        }}
      >
        <div className="notecard-heading">{noteContent.heading}</div>
        <div className="notecard-divider" style={dividerStyle}></div>
        <br />
        <div className="notecard-body">{noteContent.body}</div>
        <div className="notecard-options-divider" style={dividerStyle}></div>
        <div className="notecard-options">
          <div className="notecard-delete" onClick={handleDelete}>
            <IoIosTrash />
          </div>
          <div
            className="notecard-bg-color"
            onClick={handleColorSelectorToggle}
          >
            <IoIosColorPalette />
          </div>
        </div>
        {colorSelectorActive ? (
          <ColorSelector
            setNoteContent={setNoteContent}
            noteContent={noteContent}
            handleColorSelectorToggle={handleColorSelectorToggle}
          />
        ) : null}
      </div>
      {editable ? (
        <EditNoteCard
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
};

export default NoteCard;

import { useState } from "react";
import { IoIosColorPalette, IoIosTrash } from "react-icons/io";

import EditNoteCard from "../EditNoteCard";
import updateNote from "../../utils/updateNote";
import deleteNote from "../../utils/deleteNote";

import "./style.css";

const NoteCard = ({ note, removeNote }) => {
  const [editable, setEditable] = useState(false);
  const [noteContent, setNoteContent] = useState(note);

  const toggleEditable = () => {
    setEditable((currState) => !currState);
  };

  const handleClose = async () => {
    toggleEditable();
    const data = await updateNote(noteContent);
  };

  const handleDelete = async () => {
    toggleEditable();
    const data = await deleteNote(noteContent);
    if (data.status === "success") {
      removeNote(note._id);
    }
  };

  return (
    <>
      <div
        className={editable ? "notecard-disabled" : "notecard"}
        onClick={toggleEditable}
      >
        <div className="notecard-heading">{noteContent.heading}</div>
        <div className="notecard-divider"></div>
        <br />
        <div className="notecard-body">{noteContent.body}</div>
        <div className="notecard-options-divider"></div>
        <div className="notecard-options">
          <div className="notecard-delete" onClick={handleDelete}>
            <IoIosTrash />
          </div>
          <div className="notecard-bg-color">
            <IoIosColorPalette />
          </div>
        </div>
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

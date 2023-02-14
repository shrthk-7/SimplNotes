import { useState } from "react";
import EditNoteCard from "../EditNoteCard";
import updateNote from "../../utils/updateNote";

import "./style.css";

const NoteCard = ({ note }) => {
  const [editable, setEditable] = useState(false);
  const [noteContent, setNoteContent] = useState(note);

  const toggleEditable = () => {
    setEditable((currState) => !currState);
  };

  const handleClose = async () => {
    toggleEditable();
    const data = await updateNote(noteContent);
    console.log(data);
  };

  return (
    <>
      <div
        className={editable ? "notecard-disabled" : "notecard"}
        onClick={() => toggleEditable()}
      >
        <div className="notecard-heading">{noteContent.heading}</div>
        <div className="notecard-divider"></div>
        <br />
        <div className="notecard-body">{noteContent.body}</div>
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

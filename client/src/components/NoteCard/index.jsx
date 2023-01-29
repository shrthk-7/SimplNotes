import { useState } from "react";
import EditNoteCard from "../EditNoteCard";
import "./style.css";

const NoteCard = ({ note }) => {
  const [editable, setEditable] = useState(false);
  const [noteContent, setNoteContent] = useState(note);

  const toggleEditable = () => {
    setEditable((currState) => !currState);
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
          handleClose={toggleEditable}
        />
      ) : null}
    </>
  );
};

export default NoteCard;

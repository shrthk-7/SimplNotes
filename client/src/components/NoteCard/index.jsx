import { useState } from "react";
import EditNoteCard from "../EditNoteCard";
import "./style.css";

const NoteCard = ({ note }) => {
  const [editable, setEditable] = useState(false);
  const toggleEditable = () => {
    setEditable((currState) => !currState);
  };

  return (
    <>
      <div className="notecard" onClick={() => toggleEditable()}>
        <div className="notecard-heading">{note.heading}</div>
        <div className="notecard-divider"></div>
        <br />
        <div className="notecard-body">{note.body}</div>
      </div>
      {editable ? <EditNoteCard note={note} /> : null}
    </>
  );
};

export default NoteCard;

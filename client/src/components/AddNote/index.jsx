import { useState } from "react";
import EditNoteCard from "../EditNoteCard";
import sendObject from "../../utils/sendObject";
import "./style.css";

const AddNote = ({ setAddNote }) => {
  const [noteContent, setNoteContent] = useState({
    heading: "Heading",
    body: "Body",
  });

  const handleClose = async () => {
    setAddNote(false);
    const data = await sendObject(noteContent);
  };

  return (
    <EditNoteCard
      noteContent={noteContent}
      setNoteContent={setNoteContent}
      handleClose={handleClose}
    />
  );
};

export default AddNote;

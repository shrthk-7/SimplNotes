import { useState } from "react";
import EditNoteCard from "../EditNoteCard";
import createNote from "../../utils/createNote";

import "./style.css";

const AddNote = ({ setAddNote, setBackendData }) => {
  const [noteContent, setNoteContent] = useState({
    heading: "Heading",
    body: "Body",
  });

  const handleClose = async () => {
    setAddNote(false);
    const data = await createNote(noteContent);
    if (data.status === "success") {
      setBackendData((currBackendData) => {
        return [data.note, ...currBackendData];
      });
    }
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

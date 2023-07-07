import { useState, useContext } from "react";
import EditNoteCard from "../EditNoteCard";
import createNote from "../../utils/createNote";
import ToastContext from "../../context/toast-context";

import "./style.css";

const AddNote = ({ setAddNote, setBackendData }) => {
  const [noteContent, setNoteContent] = useState({
    heading: "Heading",
    body: "Body",
  });
  const { handleResponse } = useContext(ToastContext);

  const handleClose = async () => {
    setAddNote(false);
    const data = await createNote(noteContent);
    if (data.status === "success") {
      setBackendData((currBackendData) => {
        return [data.note, ...currBackendData];
      });
    }
    handleResponse(data);
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

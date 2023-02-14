import { useEffect, useState } from "react";
import "./style.css";

import NoteCard from "../../components/NoteCard";
import AddNoteButton from "../../components/AddNoteButton";
import AddNote from "../../components/AddNote";

import fetchNotes from "../../utils/fetchNotes";

const Notes = () => {
  const [backendData, setBackendData] = useState([]);
  const [addNote, setAddNote] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNotes();
      if (data.status === "success") setBackendData(data.notes);
    };
    fetchData();
  }, []);

  return (
    <div className="main" key={backendData}>
      <h1 className="main-heading">NOTES</h1>
      <div className="notes-container">
        {backendData.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
      {addNote ? (
        <AddNote setAddNote={setAddNote} setBackendData={setBackendData} />
      ) : (
        <AddNoteButton setAddNote={setAddNote} />
      )}
    </div>
  );
};

export default Notes;

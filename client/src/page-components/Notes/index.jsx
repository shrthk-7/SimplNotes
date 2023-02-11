import { useEffect, useState } from "react";
import "./style.css";

import NoteCard from "../../components/NoteCard";
import AddNoteButton from "../../components/AddNoteButton";
import AddNote from "../../components/AddNote";

const Notes = () => {
  const [backendData, setBackendData] = useState([]);
  const [addNote, setAddNote] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const data = await res.json();
      setBackendData(data.notes);
    }
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

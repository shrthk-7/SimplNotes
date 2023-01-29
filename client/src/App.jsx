import React, { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
import AddNoteButton from "./components/AddNoteButton";
import AddNote from "./components/AddNote";

import "./App.css";

const App = () => {
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
    <div className="main">
      <h1 className="main-heading">Notes</h1>
      <div className="notes-container">
        {backendData.map((note, index) => {
          return <NoteCard key={index} note={note} />;
        })}
      </div>
      {addNote ? (
        <AddNote setAddNote={setAddNote} />
      ) : (
        <AddNoteButton setAddNote={setAddNote} />
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
import "./App.css";

const App = () => {
  const [backendData, setBackendData] = useState([]);

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
    </div>
  );
};

export default App;

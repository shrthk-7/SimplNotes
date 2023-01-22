import React, { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";

const App = () => {
  const [backendData, setBackendData] = useState(["test", "test2"]);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setBackendData(data.notes))
      .catch((err) => console.log(err));
  });
  return (
    <div className="max-w-100">
      <h1 className="text-center text-5xl font-bold text-gray-500 py-10">
        {"Masonry"}
      </h1>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-3 w-[80%] mx-auto my-10 pb-28">
        {backendData.map((note, index) => {
          return <NoteCard key={index} note={note} />;
        })}
      </div>
    </div>
  );
};

export default App;

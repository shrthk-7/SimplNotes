import "./style.css";

const AddNoteButton = ({ setAddNote }) => {
  return (
    <div className="add-note" onClick={() => setAddNote(true)}>
      <span>+</span>
    </div>
  );
};

export default AddNoteButton;

import "./style.css";

const EditNoteCard = ({ note, toggleEditable }) => {
  return (
    <div
      className="editable-notecard-backdrop"
      onClick={() => toggleEditable()}
    >
      <div className="editable-notecard">
        <div className="editable-notecard-heading">{note.heading}</div>
        <br />
        <div className="editable-notecard-body">{note.body}</div>
      </div>
    </div>
  );
};

export default EditNoteCard;

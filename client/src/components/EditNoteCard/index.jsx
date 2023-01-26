import "./style.css";

const EditNoteCard = ({ note }) => {
  return (
    <div className="editable-notecard">
      <div className="editable-notecard-heading">{note.heading}</div>
      <br />
      <div className="editable-notecard-body">{note.body}</div>
    </div>
  );
};

export default EditNoteCard;

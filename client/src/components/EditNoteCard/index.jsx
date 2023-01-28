import handleEdit from "./handleEdit";

// stopPropagation stops bubbling of events
import "./style.css";

const EditNoteCard = ({ note, toggleEditable }) => {
  return (
    <div
      className="editable-notecard-backdrop"
      onClick={() => toggleEditable()}
      spellCheck={false}
    >
      <div className="editable-notecard" onClick={(e) => e.stopPropagation()}>
        <div
          className="editable-notecard-heading"
          contentEditable
          onKeyDown={(e) => {
            note.heading = handleEdit(e, note.heading);
          }}
        >
          {note.heading}
        </div>
        <br />
        <div
          className="editable-notecard-body"
          contentEditable
          onKeyDown={(e) => {
            note.body = handleEdit(e, note.body);
          }}
        >
          {note.body}
        </div>
      </div>
    </div>
  );
};

export default EditNoteCard;

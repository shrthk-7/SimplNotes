//  @NOTES
// stopPropagation stops bubbling of events
// createPortal changes whos child an element is

import ReactDOM from "react-dom";
import "./style.css";

const EditNoteCardBody = ({ noteContent, handleClose, handleChange }) => {
  return (
    <div
      className="editable-notecard-backdrop"
      onClick={() => handleClose()}
      spellCheck={false}
    >
      <div
        className="editable-notecard"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: noteContent.backgroundColor,
          color: noteContent.color,
        }}
      >
        <textarea
          className="editable-notecard-heading"
          value={noteContent.heading}
          onChange={(e) => handleChange(e, "heading")}
          required={true}
        ></textarea>
        <br />
        <textarea
          className="editable-notecard-body"
          value={noteContent.body}
          onChange={(e) => handleChange(e, "body")}
          rows={20}
          required={true}
        ></textarea>
      </div>
    </div>
  );
};

const EditNoteCard = ({ noteContent, setNoteContent, handleClose }) => {
  const handleChange = (e, category) => {
    if (category === "heading") {
      setNoteContent({ ...noteContent, heading: e.target.value });
    } else if (category === "body") {
      setNoteContent({ ...noteContent, body: e.target.value });
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <EditNoteCardBody
          noteContent={noteContent}
          handleChange={handleChange}
          handleClose={handleClose}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default EditNoteCard;

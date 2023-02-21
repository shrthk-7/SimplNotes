import { AiOutlineFileAdd } from "react-icons/ai";
import "./style.css";

const AddNoteButton = ({ setAddNote }) => {
  return (
    <div className="add-note" onClick={() => setAddNote(true)}>
      <AiOutlineFileAdd />
    </div>
  );
};

export default AddNoteButton;

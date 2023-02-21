import { AiOutlinePoweroff } from "react-icons/ai";
import "./styles.css";
const LogoutBtn = ({ logout }) => {
  return (
    <div className="logout-btn" onClick={logout}>
      <AiOutlinePoweroff />
    </div>
  );
};

export default LogoutBtn;

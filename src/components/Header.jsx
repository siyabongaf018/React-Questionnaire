import "./style.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="logo">
        <NavLink to={{ pathname: `/` }}>
          <h2 style={{color:"#213547"}}><span style={{color:"Green", fontSize:"30px"}}>💭Q</span>uestionnaire</h2>
        </NavLink>
      </div>

      <div className="sidebar">
        <ul>
          <NavLink to={{ pathname: `/dashBoard` }}>
            <li>Dashboard</li>
          </NavLink>

          <NavLink to={{ pathname: `/QuestionnairesForUser` }}>
            <li>Questionnaire</li>
          </NavLink>
          <NavLink to={{ pathname: `/create` }}>
            <li>Create</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Header;

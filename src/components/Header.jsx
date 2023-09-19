import "./style.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="logo">
        <NavLink to={{ pathname: `/` }}>
          <h3>Logo</h3>
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

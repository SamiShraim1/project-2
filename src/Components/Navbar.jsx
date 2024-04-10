import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./../../context/User";
import { useNavigate } from "react-router-dom";
import Profile from './../pages/profile/Profile';

export default function Navbar() {
  const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  
  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Logout();
    }
  };
  const Logout = () => {
    localStorage.removeItem("userToken");
    setUserName("");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-sami">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {userName.length ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Cart">
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    {<Link  className="btn btn-primary" to={'/Profile'}>{userName}</Link>}
                  </li>
                  
                  <li className="nav-item">
                    <button className="btn btn-secondary" onClick={confirmLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link bg-warning py-2 px-4 rounded-5 text-dark fw-bold text-decoration-none"
                      to="/SignUp"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link bg-warning py-2 px-4 rounded-5 text-dark fw-bold text-decoration-none"
                      to="/Login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

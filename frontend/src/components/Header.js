import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/image/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";

const Header = (props) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.account);

  const dispatch = useDispatch();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    setIsLoggedOut(true);
  };

  useEffect(() => {
    if (
      isLoggedOut &&
      user &&
      !user.auth &&
      window.location.pathname !== "/login"
    ) {
      navigate("/");
      toast.success("Log out success!");
      setIsLoggedOut(false);
    }
  }, [user, navigate, isLoggedOut]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap Logo"
            />
            <span>E-Commerce</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    {" "}
                    Manage Users
                  </NavLink>
                  <NavLink to="/MovieDetail" className="nav-link">
                    {" "}
                    Movie Detail
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    {" "}
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && !user.email && !user.auth && (
                    <NavLink to="/register" className="nav-link">
                      {" "}
                      Register
                    </NavLink>
                  )}
                  {user && user.email && (
                    <span className="nav-link"> Wellcome {user.email}</span>
                  )}
                  <NavDropdown title="Settings">
                    {user && user.auth === true ? (
                      <NavDropdown.Item onClick={() => handleLogout()}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;

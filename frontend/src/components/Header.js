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
            <span>GOOD MOVIE </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Trang chủ
                  </NavLink>
                  {/* <NavLink to="/users" className="nav-link">
                    {" "}
                    Quản lý người dùng
                  </NavLink> */}
                  <NavLink to="/MovieDetail" className="nav-link">
                    {" "}
                    Phim
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    {" "}
                    Giới thiệu
                  </NavLink>
                </Nav>
                <Nav>
                  {user && !user.email && !user.auth && (
                    <NavLink to="/register" className="nav-link">
                      {" "}
                      Đăng ký tài khoản
                    </NavLink>
                  )}
                  {user && user.email && (
                    <span className="nav-link"> Xin chào {user.email}</span>
                  )}
                  <NavDropdown title="Cài đặt">
                    {user && user.auth === true ? (
                      <NavDropdown.Item onClick={() => handleLogout()}>
                        Đăng xuất
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Đăng nhập
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

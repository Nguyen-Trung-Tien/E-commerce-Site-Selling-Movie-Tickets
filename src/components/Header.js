import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/image/logo192.png';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { use } from 'react';

const Header = (porps) => {

    const { logout, user } = useContext(UserContext);

    const location = useLocation();

    const [hideHeader, setHideHeader] = useState(false);

    // useEffect(() => {
    //     if (window.location.pathname === '/login') {
    //         setHideHeader(true);
    //     }
    // }, [])
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logout success!");
    }

    return (<>
        <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logoApp}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt='React Bootstrap Logo' />
                    <span>E-Commerce</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/')
                        &&
                        < >
                            <Nav className="me-auto" >
                                <NavLink to="/" className="nav-link">Home</NavLink>
                                <NavLink to="/users" className="nav-link" > Manage Users</NavLink>

                            </Nav>
                            <Nav>
                                {user && user.email && < span className="nav-link"  > Wellcome {user.email}</span>}
                                <NavDropdown title="Settings" >
                                    {user && user.auth === true
                                        ? <NavDropdown.Item onClick={() => handleLogout()} >Logout</NavDropdown.Item>
                                        : <NavLink to="/login" className="dropdown-item">Login</NavLink>
                                    }

                                </NavDropdown>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    </>);
}
export default Header;
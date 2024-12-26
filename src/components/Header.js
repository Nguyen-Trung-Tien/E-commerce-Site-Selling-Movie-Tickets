import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/image/logo192.png';
import { useLocation, NavLink } from 'react-router-dom';
const Header = (porps) => {

    const location = useLocation();

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
                    <Nav className="me-auto" >
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/users" className="nav-link"   > Manage Users</NavLink>
                        <NavDropdown title="Settings    " id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    </>);
}
export default Header;
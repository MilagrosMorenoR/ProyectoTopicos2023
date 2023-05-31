import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo1 from '../../src/img/logo1.png';


function Menu() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/');
  };
  
    return (
        <>
        <Container fluid="md" >
        <Navbar  expand="lg" bg="dark" variant="dark" >
          <Container fluid>
            
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
            <Navbar.Brand as={Link} to="/index"><img src={logo1} style={{height:'50px', display:'block',margin:'auto', width:'50px'}}/></Navbar.Brand>
              <Nav.Link as={Link} to="/createClient">Create Client</Nav.Link>
              <Nav.Link as={Link} to="/createEmployee">Create Employee</Nav.Link>
              <Nav.Link as={Link} to="/createRepair">Create Repair</Nav.Link>
              <Nav.Link as={Link} to="/createDevice">Create Device</Nav.Link>
              <Nav.Link as={Link} to="/getClients">View Clients</Nav.Link>
              <Nav.Link as={Link} to="/getEmployees">View Employees</Nav.Link>
              <Nav.Link as={Link} to="/getRepairs">View Repair</Nav.Link>
              <Nav.Link as={Link} to="/getDevices">View Device</Nav.Link>
              <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </Container>
        <br />
        </>
    );
}

export default Menu;

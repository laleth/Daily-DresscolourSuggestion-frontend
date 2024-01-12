import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { API } from '../Global';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';

function NavbarReact() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`${API}/profile/user-details`, {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setUsername(response.data.user.username);
        }
      } catch (error) {
        console.error('Error getting user details:', error.message);
      }
    };

    getUserDetails();
  }, []);

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.delete(`${API}/profile/delete-profile`, {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        openNotification('success', 'Deleted Successful', 'Profile Deleted successfully.');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error deleting profile:', error.message);
    }
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'beige', color: 'rgb(191, 133, 61)' }}>
      <Container fluid>
        <Navbar.Brand href="#" style={{ color: 'rgb(191, 133, 61)' }}>
          Welcome {username}!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home" style={{ color: 'rgb(191, 133, 61)' }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: 'rgb(191, 133, 61)' }}>
              About
            </Nav.Link>
            <NavDropdown
              title="Profile"
              id="navbarScrollingDropdown"
              style={{ color: 'rgb(191, 133, 61)' }}
            >
              <NavDropdown.Item as={Link} to="/add" style={{ color: 'rgb(191, 133, 61)' }}>
                Add/Update Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/view" style={{ color: 'rgb(191, 133, 61)' }}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={handleDeleteProfile}
                style={{ color: 'rgb(191, 133, 61)' }}
              >
                Delete Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/delete-account" style={{ color: 'rgb(191, 133, 61)' }}>
                Delete Account
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" style={{ color: 'rgb(191, 133, 61)' }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarReact;
